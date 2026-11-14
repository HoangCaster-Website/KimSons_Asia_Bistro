import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const port = process.argv[2] || "9333";
const baseUrl = "http://localhost:4173/index.html#startseite";
const outputDir = path.dirname(fileURLToPath(import.meta.url));
const pending = new Map();
const eventWaiters = new Map();
let sequence = 0;

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

let target;
for (let attempt = 0; attempt < 30; attempt += 1) {
  try {
    const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json());
    target = targets.find((entry) => entry.type === "page");
    if (target) break;
  } catch {}
  await delay(200);
}
if (!target) throw new Error("Keine Chrome-DevTools-Seite gefunden.");

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

socket.addEventListener("message", (event) => {
  const message = JSON.parse(String(event.data));
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  }
  if (message.method && eventWaiters.has(message.method)) {
    eventWaiters.get(message.method).splice(0).forEach((resolve) => resolve(message.params));
  }
});

const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});
const waitForEvent = (method) => new Promise((resolve) => {
  if (!eventWaiters.has(method)) eventWaiters.set(method, []);
  eventWaiters.get(method).push(resolve);
});

const saveScreenshot = async (filename) => {
  const result = await send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false });
  fs.writeFileSync(path.join(outputDir, filename), Buffer.from(result.data, "base64"));
};

const capture = async ({ width, height, deviceScaleFactor, mobile, menuFilename, orderFilename }) => {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor,
    mobile,
    screenWidth: width,
    screenHeight: height
  });
  await send("Emulation.setTouchEmulationEnabled", { enabled: mobile, maxTouchPoints: mobile ? 5 : 1 });
  await send("Storage.clearDataForOrigin", { origin: "http://localhost:8000", storageTypes: "local_storage" });
  const loaded = waitForEvent("Page.loadEventFired");
  const navigationUrl = `${baseUrl.replace("#", `?capture=${Date.now()}#`)}`;
  await send("Page.navigate", { url: navigationUrl });
  await Promise.race([loaded, delay(5000)]);
  await delay(2600);
  await saveScreenshot(`hero-${width}x${height}.png`);
  for (const [id, prefix] of [["spezialitaeten", "dishes"], ["ueber-uns", "about"], ["reservierung", "reservation"], ["kontakt", "visit"]]) {
    await send("Runtime.evaluate", { expression: `document.getElementById('${id}').scrollIntoView({behavior:'instant'});` });
    await delay(id === "kontakt" ? 1800 : 700);
    await saveScreenshot(`${prefix}-${width}x${height}.png`);
  }
  await send("Runtime.evaluate", {
    expression: `
      [...document.querySelectorAll('.filter-button')].find((button) => button.dataset.category === 'vorspeisen')?.click();
    `
  });
  await delay(350);
  await send("Runtime.evaluate", {
    expression: `
      document.getElementById('speisekarte')?.scrollIntoView({ block: 'start', behavior: 'instant' });
    `
  });
  await delay(500);
  await saveScreenshot(menuFilename);
  await send("Runtime.evaluate", {
    expression: `
      document.querySelector('.menu-add')?.click();
      document.querySelector('${mobile ? ".mobile-order" : ".order-fab"}')?.click();
    `
  });
  await delay(550);
  await saveScreenshot(orderFilename);
  await send("Runtime.evaluate", {
    expression: `
      document.querySelector('.order-drawer [data-order-close]')?.click();
      const search = document.getElementById('menu-search');
      search.value = '42';
      search.dispatchEvent(new Event('input'));
    `
  });
  await delay(250);
  await send("Runtime.evaluate", {
    expression: `
      const buttons = document.querySelectorAll('.menu-variant .menu-add');
      buttons[0]?.click(); buttons[0]?.click(); buttons[1]?.click();
      document.querySelector('.menu-catalog').scrollIntoView({behavior:'instant'});
    `
  });
  await delay(300);
  await saveScreenshot(`menu-quantities-${width}x${height}.png`);
  const check = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      const brokenImages = [...document.images].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
      const mapIframe = document.querySelector('.visit-map-frame iframe');
      const mapRect = mapIframe ? mapIframe.getBoundingClientRect() : null;
      return {
        viewport: winWidth + 'x' + window.innerHeight,
        scrollWidth: docWidth,
        hasHorizontalOverflow: docWidth > winWidth,
        brokenImages,
        hasMapIframe: Boolean(mapIframe && mapRect.width > 200 && mapRect.height > 200)
      };
    })()`
  });
  console.log(JSON.stringify(check.result.value));
};

await send("Page.enable");
await capture({ width: 1440, height: 900, deviceScaleFactor: 1, mobile: false, menuFilename: "desktop-1440x900.png", orderFilename: "desktop-order-1440x900.png" });
await capture({ width: 390, height: 844, deviceScaleFactor: 2, mobile: true, menuFilename: "mobile-390x844.png", orderFilename: "mobile-order-390x844.png" });
socket.close();
