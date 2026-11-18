// Browser smoke check: run a dedicated headless Chrome with --remote-debugging-port=9334.
// Serve the repository at http://127.0.0.1:4173, then run node evidence/verify-sushi.mjs.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const output = path.dirname(fileURLToPath(import.meta.url));
let targets;
for (let attempt = 0; attempt < 30; attempt++) {
  try {
    targets = await fetch("http://127.0.0.1:9334/json/list").then((r) => r.json());
    if (targets.some((target) => target.type === "page")) break;
  } catch {}
  await new Promise((resolve) => setTimeout(resolve, 200));
}
assert.ok(targets?.some((target) => target.type === "page"), "Start a dedicated headless Chrome on port 9334 first");
const socket = new WebSocket(targets.find((target) => target.type === "page").webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});
const pending = new Map();
let sequence = 0;
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(String(data));
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  clearTimeout(request.timer);
  if (message.error) request.reject(new Error(message.error.message));
  else request.resolve(message.result);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timed out: ${method}`)); }, 15000);
  pending.set(id, { resolve, reject, timer });
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const select = async (category) => {
  await evaluate(`(() => { const select = document.querySelector('#menu-category-select'); select.value = ${JSON.stringify(category)}; select.dispatchEvent(new Event('change')); })()`);
};
const screenshot = async (filename) => {
  const result = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(output, filename), Buffer.from(result.data, "base64"));
};
const report = { checks: [], viewports: [] };
try {
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: "http://127.0.0.1:4173/index.html#speisekarte" });
  for (let i = 0; i < 40; i++) {
    if (await evaluate("Boolean(document.querySelector('.menu-item'))")) break;
    await sleep(150);
  }
  assert.equal(await evaluate("document.querySelectorAll('.menu-item').length"), 126);
  await evaluate("document.querySelector('[data-menu-category=\"sushi\"]').click()");
  assert.equal(await evaluate("document.querySelectorAll('.menu-item').length"), 48);
  const photos = await evaluate(`(async () => {
    const images = [...document.querySelectorAll('.menu-item-photo img')];
    images.forEach((image) => { image.loading = 'eager'; });
    await Promise.all(images.map((image) => image.decode()));
    return { total: images.length, loaded: images.filter((image) => image.naturalWidth > 0).length, retina: images.every((image) => image.naturalWidth >= image.clientWidth * 3) };
  })()`);
  assert.deepEqual(photos, { total: 48, loaded: 48, retina: true });
  report.checks.push("126 total dishes; Sushi shortcut shows 48 dishes; all 48 photos load at 3x display resolution or better");
  for (const [category, expected] of [["sushi-nigiri", 10], ["sushi-hoso-maki", 10], ["sushi-inside-out", 16], ["sushi-sashimi", 3], ["sushi-menue", 4], ["sushi-beilagen", 2], ["sushi-magic", 3]]) {
    await select(category);
    assert.equal(await evaluate("document.querySelectorAll('.menu-item').length"), expected);
  }
  assert.equal(await evaluate("document.querySelectorAll('.menu-item-photo figcaption').length"), 2);
  report.checks.push("All 7 sushi categories filter correctly; C2 and C3 show sample-photo captions");
  await select("sushi");
  const order = await evaluate(`(() => {
    const card = (code) => [...document.querySelectorAll('.menu-item')].find((item) => item.querySelector('.menu-code').textContent === code);
    card('123').querySelector('.menu-add').click();
    card('123').querySelector('.menu-add').click();
    card('96').querySelector('.menu-add').click();
    card('104').querySelector('.menu-add').click();
    return { dragon: card('123').querySelector('.dish-quantity').textContent, total: document.querySelector('[data-order-total]').textContent.replace(/\\s/g, ''), unagi: card('96').querySelector('.menu-price').textContent.replace(/\\s/g, ''), kanpyo: card('104').querySelector('.menu-price').textContent.replace(/\\s/g, '') };
  })()`);
  assert.deepEqual(order, { dragon: "2", total: "36,30€", unagi: "3,50€", kanpyo: "3,80€" });
  await evaluate("document.querySelector('#menu-selection-filter').click()");
  await sleep(300);
  assert.equal(await evaluate("document.querySelectorAll('.menu-item').length"), 3);
  report.checks.push("Order quantities, selected-items filter, and total €36.30 are correct (2 × Dragon + Unagi + Kanpyo)");
  await evaluate("(() => {const search = document.querySelector('#menu-search'); search.value = 'sushi'; search.dispatchEvent(new Event('input')); })()");
  await sleep(300);
  assert.equal(await evaluate("document.querySelectorAll('.menu-item').length"), 48);
  await evaluate("(() => {const search = document.querySelector('#menu-search'); search.value = '104'; search.dispatchEvent(new Event('input')); })()");
  await sleep(300);
  assert.equal(await evaluate("document.querySelector('.menu-item-name').textContent"), "Kanpyo Maki");
  report.checks.push("Search by Sushi and exact dish number 104 works");
  for (const width of [1440, 390, 320]) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: width === 1440 ? 1000 : 844, deviceScaleFactor: 1, mobile: width < 600 });
    await select("sushi-inside-out");
    await evaluate("document.querySelector('.menu-catalog').scrollIntoView({ behavior: 'instant' })");
    await sleep(400);
    const layout = await evaluate(`({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, overflowingCards: [...document.querySelectorAll('.menu-item')].filter((item) => item.scrollWidth > item.clientWidth).length })`);
    assert.ok(layout.documentWidth <= layout.width, JSON.stringify(layout));
    assert.equal(layout.overflowingCards, 0);
    report.viewports.push(layout);
    await screenshot(`sushi-${width}.png`);
  }
  report.checks.push("No page or card overflow at desktop 1440px, mobile 390px, or narrow mobile 320px");
  report.result = "passed";
  fs.writeFileSync(path.join(output, "sushi-report.json"), JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));
} finally {
  await send("Browser.close").catch(() => {});
  socket.close();
}
