(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};
  const categories = window.MENU_CATEGORIES || [];
  const items = window.MENU_ITEMS || [];
  const sushiCategories = new Set(categories.filter((category) => category.group === "sushi").map((category) => category.id));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowEndDevice = typeof navigator !== "undefined" && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const richMotion = !reducedMotion && !lowEndDevice;
  const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

  const highlightRestaurantName = (text) => {
    const match = /\bKim Son['’]?s\b/i.exec(text);
    if (!match) return text;

    const name = document.createElement("span");
    name.className = "restaurant-name";
    name.textContent = match[0];
    const content = document.createDocumentFragment();
    content.append(text.slice(0, match.index), name, text.slice(match.index + match[0].length));
    return content;
  };

  const applyConfig = () => {
    document.querySelectorAll("[data-menu-total]").forEach((element) => {
      element.textContent = items.length;
    });
    const images = config.images || {};
    document.querySelectorAll("[data-config-image]").forEach((image) => {
      const source = images[image.dataset.configImage];
      if (source) image.src = source;
    });
    document.querySelectorAll("[data-config-bg]").forEach((element) => {
      const source = images[element.dataset.configBg];
      if (source) element.style.backgroundImage = `url("${source}")`;
    });
    document.querySelectorAll("[data-directions-link]").forEach((link) => {
      if (config.links?.directions) link.href = config.links.directions;
    });
    document.querySelectorAll("[data-map-embed]").forEach((iframe) => {
      if (config.links?.mapEmbed) iframe.src = config.links.mapEmbed;
    });
    document.querySelectorAll("[data-instagram-link]").forEach((link) => {
      if (config.links?.instagram) link.href = config.links.instagram;
    });
  };

  const initMobileMenu = () => {
    const toggle = document.querySelector(".menu-toggle");
    const panel = document.querySelector(".mobile-menu");
    if (!toggle || !panel) return;

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
      panel.setAttribute("aria-hidden", String(!open));
      panel.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      if (open) panel.querySelector("a")?.focus();
      else toggle.focus({ preventScroll: true });
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    panel.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setOpen(false);
    });
  };

  const initMobileActionbar = () => {
    const bar = document.querySelector(".mobile-actionbar");
    const viewport = window.visualViewport;
    if (!bar || !viewport) return;

    const mobile = window.matchMedia("(max-width: 600px)");
    const update = () => {
      const visibleBottom = viewport.offsetTop + viewport.height;
      const gap = mobile.matches && viewport.scale === 1
        ? Math.max(0, window.innerHeight - visibleBottom)
        : 0;
      bar.style.setProperty("--mobile-actionbar-viewport-gap", `${Math.ceil(gap)}px`);
    };

    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    update();
  };

  const initActiveNavigation = () => {
    const links = [...document.querySelectorAll(".desktop-nav a")];
    const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
    let scheduled = false;
    const update = () => {
      const readingLine = (document.querySelector(".site-header")?.offsetHeight || 80) + 100;
      const visible = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= readingLine && rect.bottom > readingLine;
      });
      links.forEach((link) => {
        const active = link.getAttribute("href") === `#${visible?.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      scheduled = false;
    };
    const requestUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    update();
  };

  const initLoader = () => {
    const loader = document.querySelector(".page-loader");
    if (!loader) return;
    if (reducedMotion) {
      loader.remove();
      return;
    }
    const started = performance.now();
    const hide = () => {
      const remaining = Math.max(0, 850 - (performance.now() - started));
      window.setTimeout(() => loader.classList.add("is-hidden"), remaining);
    };
    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide, { once: true });
    window.setTimeout(hide, 2500);
  };

  const initMotionSystem = () => {
    document.documentElement.classList.add("motion-ready");
    if (lowEndDevice) document.documentElement.classList.add("motion-lite");

    const onVisibilityChange = () => {
      document.body.classList.toggle("motion-paused", document.visibilityState === "hidden");
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    onVisibilityChange();
  };

  const initScrollMotion = () => {
    const header = document.querySelector("[data-header]");
    const progress = document.querySelector(".scroll-progress span");
    const heroImage = document.querySelector(".hero-photo img");
    const chapterNumbers = [...document.querySelectorAll(".section-index")];
    const parallaxMedia = [...document.querySelectorAll("[data-parallax] img")];
    const menuSection = document.querySelector(".menu-section");
    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = pageHeight > 0 ? scrollTop / pageHeight : 0;
      header?.classList.toggle("is-scrolled", scrollTop > 28);
      progress?.style.setProperty("transform", `scaleX(${scrollRatio})`);

      if (richMotion && heroImage && scrollTop < window.innerHeight * 1.2) {
        heroImage.style.setProperty("--hero-image-y", `${-3 + scrollTop * 0.025}%`);
      }
      if (richMotion) {
        chapterNumbers.forEach((number) => {
          const rect = number.parentElement.getBoundingClientRect();
          const amount = Math.max(-38, Math.min(38, (window.innerHeight / 2 - rect.top) * .045));
          number.style.setProperty("--chapter-shift", `${amount}px`);
        });
        parallaxMedia.forEach((image) => {
          const rect = image.parentElement.getBoundingClientRect();
          const amount = Math.max(-28, Math.min(28, (window.innerHeight / 2 - rect.top - rect.height / 2) * .065));
          image.style.setProperty("--media-shift", `${amount}px`);
        });
      }
      if (menuSection) {
        const rect = menuSection.getBoundingClientRect();
        const total = rect.height + window.innerHeight;
        const value = Math.max(.04, Math.min(1, (window.innerHeight - rect.top) / total));
        menuSection.style.setProperty("--menu-progress", value);
      }
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    update();
  };

  const initRevealMotion = () => {
    const selectorGroups = [
      [".visit-info", "left"], [".visit-hours", "left"], [".visit-map-card", "right"],
      [".about-copy", "left"], [".about-media", "clip"],
      [".feature-list li", "right"], [".section-heading > *", ""],
      [".food-card", ""], [".menu-intro > *", ""], [".menu-toolbar", ""],
      [".menu-category", ""]
    ];

    selectorGroups.forEach(([selector, direction]) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        element.classList.add("motion-item");
        if (direction) element.dataset.reveal = direction;
        element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 80}ms`);
      });
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".motion-item").forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: "0px 0px -55px" });

    const observeNew = (root = document) => {
      root.querySelectorAll?.(".motion-item:not(.is-visible)").forEach((element) => observer.observe(element));
    };
    observeNew();

    const menuList = document.getElementById("menu-list");
    if (menuList) {
      new MutationObserver(() => {
        menuList.querySelectorAll(".menu-category").forEach((category, index) => {
          category.classList.add("motion-item");
          category.style.setProperty("--reveal-delay", `${Math.min(index, 2) * 70}ms`);
        });
        observeNew(menuList);
      }).observe(menuList, { childList: true });
    }
  };

  const initCardInteractions = () => {
    document.querySelectorAll(".food-card").forEach((card, index) => {
      if (!card.querySelector(".food-card-number")) {
        const number = document.createElement("span");
        number.className = "food-card-number";
        number.textContent = String(index + 1).padStart(2, "0");
        number.setAttribute("aria-hidden", "true");
        card.appendChild(number);
      }
      if (!richMotion || !window.matchMedia("(pointer: fine)").matches) return;
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
        card.style.setProperty("--tilt-y", `${(x - 0.5) * 8}deg`);
        card.style.setProperty("--glare-x", `${x * 100}%`);
        card.style.setProperty("--glare-y", `${y * 100}%`);
        card.style.setProperty("--glare-opacity", ".8");
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--glare-opacity", "0");
      });
    });
  };

  const initPointerOrb = () => {
    const orb = document.querySelector(".pointer-orb");
    if (!orb || !richMotion || !window.matchMedia("(pointer: fine)").matches) return;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let frame;

    const render = () => {
      currentX += (targetX - currentX) * .16;
      currentY += (targetY - currentY) * .16;
      orb.style.transform = `translate3d(${currentX - orb.offsetWidth / 2}px,${currentY - orb.offsetHeight / 2}px,0)`;
      frame = window.requestAnimationFrame(render);
    };
    const move = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      orb.classList.add("is-visible");
    };
    const interactiveSelector = "a, button, input, .food-card";
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", (event) => orb.classList.toggle("is-active", Boolean(event.target.closest?.(interactiveSelector))));
    document.addEventListener("pointerleave", () => orb.classList.remove("is-visible"));
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        window.cancelAnimationFrame(frame);
        frame = null;
      } else if (!frame) render();
    });
    render();
  };

  const normalize = (value) => value
    .toLocaleLowerCase("de-DE")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss");

  const orderCart = new Map();
  let addOrderItem = () => {};
  let removeOrderItem = () => {};

  const syncDishControls = () => {
    document.querySelectorAll(".dish-control").forEach((control) => {
      const quantity = orderCart.get(control.dataset.key)?.quantity || 0;
      control.classList.toggle("has-quantity", quantity > 0);
      const minus = control.querySelector(".dish-minus");
      const count = control.querySelector(".dish-quantity");
      minus.hidden = quantity === 0;
      count.hidden = quantity === 0;
      count.textContent = quantity;
      control.closest(".menu-item")?.classList.toggle("is-selected", [...control.closest(".menu-item").querySelectorAll(".dish-control")].some((entry) => orderCart.has(entry.dataset.key)));
    });
  };

  const createAddButton = (entry) => {
    const accessibleName = `${entry.code ? `Nr. ${entry.code} · ` : ""}${entry.name}`;
    const control = document.createElement("div");
    control.className = "dish-control";
    control.dataset.key = entry.key;
    control.setAttribute("role", "group");
    control.setAttribute("aria-label", `Anzahl: ${accessibleName}`);
    const minus = document.createElement("button");
    minus.type = "button";
    minus.className = "dish-minus";
    minus.textContent = "−";
    minus.hidden = !orderCart.has(entry.key);
    minus.setAttribute("aria-label", `${accessibleName} einmal weniger`);
    const quantity = document.createElement("span");
    quantity.className = "dish-quantity";
    quantity.textContent = orderCart.get(entry.key)?.quantity || 0;
    quantity.hidden = !orderCart.has(entry.key);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "menu-add";
    button.setAttribute("aria-label", `${accessibleName} zur Bestellung hinzufügen`);
    button.title = "Zur Bestellung hinzufügen";
    button.innerHTML = '<span aria-hidden="true">+</span>';
    button.addEventListener("click", () => {
      addOrderItem(entry);
      button.classList.remove("is-added");
      window.requestAnimationFrame(() => button.classList.add("is-added"));
    });
    minus.addEventListener("click", () => {
      removeOrderItem(entry.key);
      if (!orderCart.has(entry.key)) {
        if (button.isConnected) button.focus({ preventScroll: true });
        else {
          const replacement = [...document.querySelectorAll(".dish-control")].find((node) => node.dataset.key === entry.key);
          (replacement?.querySelector(".menu-add") || document.getElementById("menu-selection-filter"))?.focus({ preventScroll: true });
        }
      }
    });
    control.classList.toggle("has-quantity", orderCart.has(entry.key));
    control.append(minus, quantity, button);
    return control;
  };

  const createMenuItem = (item) => {
    const article = document.createElement("article");
    article.className = `menu-item${item.code ? "" : " menu-item--without-code"}${item.image ? " menu-item--with-image" : ""}`;
    if (item.image) {
      const figure = document.createElement("figure");
      figure.className = "menu-item-photo";
      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.imageNote || item.name;
      image.width = 320;
      image.height = 320;
      image.loading = "lazy";
      image.decoding = "async";
      figure.appendChild(image);
      if (item.imageNote) {
        const caption = document.createElement("figcaption");
        caption.textContent = item.imageNote;
        figure.appendChild(caption);
      }
      article.appendChild(figure);
    }

    const content = document.createElement("div");
    content.className = "menu-item-content";
    const titleRow = document.createElement("div");
    titleRow.className = "menu-item-title-row";
    const title = document.createElement("h4");
    title.className = "menu-item-name";
    if (item.code) {
      const code = document.createElement("span");
      code.className = "menu-code menu-code--inline";
      code.textContent = `${item.code}.`;
      title.append(code, " ");
    }
    title.append(highlightRestaurantName(item.name));
    titleRow.appendChild(title);
    if (/scharf/i.test(item.description || "")) {
      const spicyTag = document.createElement("span");
      spicyTag.className = "menu-tag menu-tag--spicy";
      spicyTag.setAttribute("aria-hidden", "true");
      spicyTag.textContent = "Scharf";
      titleRow.appendChild(spicyTag);
    } else if (item.category === "vegetarisch" || /tofu|vegetarisch/i.test(item.name)) {
      const vegTag = document.createElement("span");
      vegTag.className = "menu-tag menu-tag--veg";
      vegTag.setAttribute("aria-hidden", "true");
      vegTag.textContent = "Veggie";
      titleRow.appendChild(vegTag);
    }
    content.appendChild(titleRow);
    if (item.description) {
      const description = document.createElement("p");
      description.className = "menu-item-description";
      description.textContent = item.description;
      content.appendChild(description);
    }

    article.appendChild(content);
    if (Number.isFinite(item.price)) {
      const action = document.createElement("div");
      action.className = "menu-item-action";
      const price = document.createElement("strong");
      price.className = "menu-price";
      price.textContent = euro.format(item.price);
      const key = `${item.id || item.code || item.name}`;
      action.append(price, createAddButton({ key, code: item.code, name: item.name, price: item.price }));
      article.appendChild(action);
    }

    if (item.variants?.length) {
      const variants = document.createElement("div");
      variants.className = "menu-variants";
      item.variants.forEach((variant) => {
        const row = document.createElement("div");
        row.className = "menu-variant";
        const label = document.createElement("span");
        label.textContent = variant.label;
        const price = document.createElement("strong");
        price.textContent = euro.format(variant.price);
        const cleanLabel = variant.label.replace(/^[a-z]\.?\s*/i, "");
        const key = `${item.id || item.code || item.name}::${variant.label}`;
        row.append(label, price, createAddButton({
          key,
          code: item.code,
          name: `${item.name} – ${cleanLabel}`,
          price: variant.price
        }));
        variants.appendChild(row);
      });
      article.appendChild(variants);
    }
    return article;
  };

  const initOrdering = () => {
    const overlay = document.getElementById("order-drawer");
    const drawer = overlay?.querySelector(".order-drawer");
    const lines = overlay?.querySelector("[data-order-lines]");
    const empty = overlay?.querySelector("[data-order-empty]");
    const content = overlay?.querySelector("[data-order-content]");
    const form = document.getElementById("order-form");
    const status = overlay?.querySelector("[data-order-status]");
    const hint = overlay?.querySelector("[data-order-hint]");
    if (!overlay || !drawer || !lines || !empty || !content || !form) return;

    const storageKey = "kimsons-whatsapp-order";
    let previousFocus = null;

    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      saved.forEach((entry) => {
        if (entry?.key && entry?.name && Number.isFinite(entry.price) && Number.isInteger(entry.quantity) && entry.quantity > 0) {
          orderCart.set(entry.key, entry);
        }
      });
    } catch (_) {
      // The order still works when storage is unavailable or contains invalid data.
    }

    const persist = () => {
      try {
        localStorage.setItem(storageKey, JSON.stringify([...orderCart.values()]));
      } catch (_) {
        // Private browsing can reject storage; no action is required.
      }
    };

    const totalQuantity = () => [...orderCart.values()].reduce((sum, entry) => sum + entry.quantity, 0);
    const totalPrice = () => [...orderCart.values()].reduce((sum, entry) => sum + entry.price * entry.quantity, 0);

    const changeQuantity = (key, amount) => {
      const entry = orderCart.get(key);
      if (!entry) return;
      entry.quantity += amount;
      if (entry.quantity <= 0) orderCart.delete(key);
      render();
    };

    const render = () => {
      const focusedLine = document.activeElement?.closest?.(".order-line");
      const focusedKey = focusedLine?.dataset.key;
      const focusedAction = document.activeElement?.dataset.orderAction;
      lines.replaceChildren();
      orderCart.forEach((entry) => {
        const item = document.createElement("li");
        item.className = "order-line";
        item.dataset.key = entry.key;

        const details = document.createElement("div");
        const name = document.createElement("strong");
        name.append(highlightRestaurantName(`${entry.code ? `Nr. ${entry.code} · ` : ""}${entry.name}`));
        const linePrice = document.createElement("span");
        linePrice.textContent = euro.format(entry.price * entry.quantity);
        details.append(name, linePrice);

        const stepper = document.createElement("div");
        stepper.className = "quantity-stepper";
        const minus = document.createElement("button");
        minus.type = "button";
        minus.dataset.orderAction = "decrease";
        minus.textContent = entry.quantity === 1 ? "×" : "−";
        minus.setAttribute("aria-label", entry.quantity === 1 ? `${entry.name} entfernen` : `${entry.name} einmal weniger`);
        minus.addEventListener("click", () => changeQuantity(entry.key, -1));
        const quantity = document.createElement("span");
        quantity.textContent = entry.quantity;
        quantity.setAttribute("aria-label", `Anzahl ${entry.quantity}`);
        const plus = document.createElement("button");
        plus.type = "button";
        plus.dataset.orderAction = "increase";
        plus.textContent = "+";
        plus.setAttribute("aria-label", `${entry.name} einmal mehr`);
        plus.addEventListener("click", () => changeQuantity(entry.key, 1));
        stepper.append(minus, quantity, plus);
        item.append(details, stepper);
        lines.appendChild(item);
      });

      const quantity = totalQuantity();
      const total = totalPrice();
      document.querySelectorAll("[data-order-count]").forEach((node) => { node.textContent = quantity; });
      document.querySelectorAll("[data-order-total]").forEach((node) => { node.textContent = euro.format(total); });
      document.querySelectorAll("[data-order-open]").forEach((button) => button.classList.toggle("has-items", quantity > 0));
      document.querySelectorAll("[data-selection-count]").forEach((node) => { node.textContent = quantity; });
      empty.hidden = quantity > 0;
      content.hidden = quantity === 0;
      syncDishControls();
      persist();
      document.dispatchEvent(new CustomEvent("order:change"));
      if (focusedKey && focusedAction) {
        const replacement = [...lines.children].find((line) => line.dataset.key === focusedKey);
        const target = replacement?.querySelector(`[data-order-action="${focusedAction}"]`) || lines.querySelector("button") || drawer.querySelector("[data-order-close]");
        target?.focus({ preventScroll: true });
      }
    };

    removeOrderItem = (key) => changeQuantity(key, -1);

    addOrderItem = (entry) => {
      const current = orderCart.get(entry.key);
      if (current) current.quantity += 1;
      else orderCart.set(entry.key, { ...entry, quantity: 1 });
      if (status) status.replaceChildren(highlightRestaurantName(`${entry.name} wurde hinzugefügt.`));
      const feedback = document.getElementById("menu-feedback");
      if (feedback) feedback.textContent = `${entry.name}: ${orderCart.get(entry.key).quantity} in Ihrer Auswahl.`;
      render();
    };

    const setOpen = (open) => {
      if (open) previousFocus = document.activeElement;
      overlay.classList.toggle("is-open", open);
      overlay.setAttribute("aria-hidden", String(!open));
      document.body.classList.toggle("order-open", open);
      document.querySelectorAll(".site-header, main, .order-fab, .site-footer, .mobile-actionbar").forEach((element) => {
        element.inert = open;
      });
      if (open) window.setTimeout(() => drawer.focus(), reducedMotion ? 0 : 220);
      else if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
    };

    document.querySelectorAll("[data-order-open]").forEach((button) => button.addEventListener("click", () => setOpen(true)));
    overlay.querySelectorAll("[data-order-close]").forEach((button) => button.addEventListener("click", () => setOpen(false)));
    overlay.querySelector("[data-order-browse]")?.addEventListener("click", () => {
      setOpen(false);
      document.getElementById("speisekarte")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    });

    document.addEventListener("keydown", (event) => {
      if (!overlay.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [...drawer.querySelectorAll('button:not([disabled]), input, select, textarea, a[href]')]
        .filter((element) => !element.closest("[hidden]"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    const whatsappNumber = String(config.restaurant?.whatsapp || "").replace(/\D/g, "");
    if (whatsappNumber && hint) {
      hint.replaceChildren(highlightRestaurantName("WhatsApp öffnet die fertige Nachricht direkt an Kim Son's Asia Bistro."));
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!orderCart.size) {
        if (status) status.textContent = "Bitte wählen Sie zuerst ein Gericht aus.";
        return;
      }
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const pickup = String(data.get("pickup") || "Schnellstmöglich");
      const note = String(data.get("note") || "").trim();
      const orderLines = [...orderCart.values()].map((entry) => {
        const code = entry.code ? `Nr. ${entry.code} · ` : "";
        return `• ${entry.quantity}× ${code}${entry.name} — ${euro.format(entry.price * entry.quantity)}`;
      });
      const message = [
        "Hallo Kim Son's Asia Bistro,",
        "",
        "ich möchte folgende Bestellung zur Abholung aufgeben:",
        ...orderLines,
        "",
        `Gesamt: ${euro.format(totalPrice())}`,
        name ? `Name: ${name}` : "",
        `Abholung: ${pickup}`,
        note ? `Hinweis: ${note}` : "",
        "",
        "Bitte bestätigen Sie die Bestellung und die Abholzeit. Vielen Dank!"
      ].filter((line, index, all) => line !== "" || all[index - 1] !== "").join("\n");
      const target = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "https://wa.me/";
      const url = `${target}?text=${encodeURIComponent(message)}`;
      const opened = window.open(url, "_blank", "noopener,noreferrer");
      if (!opened) window.location.href = url;
      if (status) status.textContent = "Die Bestellung wurde für WhatsApp vorbereitet.";
    });

    render();
  };

  const initMenu = () => {
    const filterRoot = document.getElementById("menu-filters");
    const list = document.getElementById("menu-list");
    const search = document.getElementById("menu-search");
    const count = document.getElementById("menu-result-count");
    const clear = document.getElementById("clear-menu-filter");
    const empty = document.getElementById("menu-empty");
    const categorySelect = document.getElementById("menu-category-select");
    const searchClear = document.getElementById("menu-search-clear");
    const selectionFilter = document.getElementById("menu-selection-filter");
    if (!filterRoot || !list || !search || !empty) return;

    let activeCategory = "all";
    let query = "";
    let selectedOnly = false;
    const allCategories = [{ id: "all", label: "Alle Gerichte" }, { id: "sushi", label: "Sushi & Sashimi" }, ...categories];
    const shortLabels = {
      "reis-nudeln": "Reis & Nudeln", fleisch: "Huhn, Rind & Ente",
      "paniertes-huhn": "Paniertes Huhn", vegetarisch: "Vegetarisch",
      vietnamesisch: "Vietnamesisch", udon: "Udon Nudeln", ramen: "Ramen"
    };

    const updateFilterState = () => {
      filterRoot.querySelectorAll("button").forEach((button) => {
        const selected = button.dataset.category === activeCategory;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      if (categorySelect) categorySelect.value = activeCategory;
      if (searchClear) searchClear.hidden = !search.value;
      selectionFilter?.setAttribute("aria-pressed", String(selectedOnly));
    };

    const selectCategory = (id) => {
      activeCategory = id;
      selectedOnly = false;
      query = "";
      search.value = "";
      updateFilterState();
      renderNow();
      const catalog = document.querySelector(".menu-catalog");
      const headerHeight = document.querySelector(".site-header")?.offsetHeight || 80;
      const top = catalog.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
      if (Math.abs(window.scrollY - top) > 150) window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    };

    allCategories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `filter-button${category.id === "all" ? " is-active" : ""}`;
      button.dataset.category = category.id;
      const label = shortLabels[category.id] || category.label;
      const total = category.id === "all" ? items.length : items.filter((item) => category.id === "sushi" ? sushiCategories.has(item.category) : item.category === category.id).length;
      const text = document.createElement("span");
      text.textContent = label;
      const badge = document.createElement("span");
      badge.className = "filter-count";
      badge.textContent = total;
      badge.setAttribute("aria-hidden", "true");
      button.append(text, badge);
      button.setAttribute("aria-pressed", String(category.id === "all"));
      button.addEventListener("click", () => selectCategory(category.id));
      filterRoot.appendChild(button);
      if (categorySelect) {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = `${label} (${total})`;
        categorySelect.appendChild(option);
      }
    });

    const matches = (item) => {
      const inCategory = activeCategory === "all" || (activeCategory === "sushi" ? sushiCategories.has(item.category) : item.category === activeCategory);
      const inSelection = !selectedOnly || [...orderCart.keys()].some((key) => key === (item.id || item.code) || key.startsWith(`${item.id || item.code}::`));
      const variants = item.variants?.map((variant) => variant.label).join(" ") || "";
      const categoryLabel = categories.find((category) => category.id === item.category)?.label || "";
      const groupLabel = sushiCategories.has(item.category) ? "Sushi" : "";
      const haystack = normalize(`${item.code} ${item.name} ${item.description} ${variants} ${categoryLabel} ${groupLabel}`);
      const exactCode = query && items.some((entry) => normalize(entry.code || "") === query);
      const found = !query || (exactCode ? normalize(item.code || "") === query : haystack.includes(query));
      return inCategory && inSelection && found;
    };

    const renderNow = () => {
      const found = items.filter(matches);
      const fragment = document.createDocumentFragment();
      categories.forEach((category) => {
        const categoryItems = found.filter((item) => item.category === category.id);
        if (!categoryItems.length) return;
        const section = document.createElement("section");
        section.className = "menu-category";
        section.dataset.category = category.id;
        const head = document.createElement("div");
        head.className = "menu-category-head";
        const heading = document.createElement("h3");
        heading.textContent = category.label;
        head.appendChild(heading);
        const categoryMeta = document.createElement("div");
        categoryMeta.className = "menu-category-meta";
        if (category.note) {
          const note = document.createElement("p");
          note.textContent = category.note;
          categoryMeta.appendChild(note);
        }
        const categoryCount = document.createElement("span");
        categoryCount.className = "menu-category-count";
        categoryCount.textContent = `${categoryItems.length} ${categoryItems.length === 1 ? "Gericht" : "Gerichte"}`;
        categoryMeta.appendChild(categoryCount);
        head.appendChild(categoryMeta);
        const itemRoot = document.createElement("div");
        itemRoot.className = "menu-items";
        categoryItems.forEach((item) => itemRoot.appendChild(createMenuItem(item)));
        section.append(head, itemRoot);
        fragment.appendChild(section);
      });
      list.replaceChildren(fragment);
      syncDishControls();
      empty.hidden = found.length !== 0;
      list.hidden = found.length === 0;
      count.textContent = `${found.length} ${found.length === 1 ? "Gericht" : "Gerichte"}${selectedOnly ? " in Ihrer Auswahl" : query ? ` für „${search.value.trim()}“` : " zur Auswahl"}`;
      clear.hidden = activeCategory === "all" && !query && !selectedOnly;
      empty.querySelector("h3").textContent = selectedOnly ? "Ihre Auswahl ist noch leer" : "Kein Gericht gefunden";
      empty.querySelector("p").textContent = selectedOnly ? "Fügen Sie Ihre Lieblingsgerichte mit + hinzu. Hier sehen Sie alle ausgewählten Speisen." : "Versuchen Sie einen anderen Suchbegriff oder zeigen Sie alle Kategorien an.";
      window.requestAnimationFrame(() => list.classList.remove("is-updating"));
    };

    let renderTimer;
    const render = () => {
      list.classList.add("is-updating");
      window.clearTimeout(renderTimer);
      renderTimer = window.setTimeout(renderNow, reducedMotion ? 0 : 150);
    };

    const reset = () => {
      activeCategory = "all";
      selectedOnly = false;
      query = "";
      search.value = "";
      updateFilterState();
      render();
      search.focus();
    };

    search.addEventListener("input", () => {
      activeCategory = "all";
      selectedOnly = false;
      query = normalize(search.value.trim());
      updateFilterState();
      render();
    });
    categorySelect?.addEventListener("change", () => selectCategory(categorySelect.value));
    document.querySelectorAll("[data-menu-category]").forEach((button) => {
      button.addEventListener("click", () => selectCategory(button.dataset.menuCategory));
    });
    searchClear?.addEventListener("click", reset);
    selectionFilter?.addEventListener("click", () => {
      selectedOnly = !selectedOnly;
      activeCategory = "all";
      query = "";
      search.value = "";
      updateFilterState();
      renderNow();
    });
    document.addEventListener("order:change", () => {
      if (!selectedOnly) return;
      const focused = document.activeElement;
      const control = focused?.closest?.(".dish-control");
      const key = control?.dataset.key;
      const action = focused?.matches?.(".dish-minus") ? ".dish-minus" : ".menu-add";
      renderNow();
      if (key) {
        const replacement = [...document.querySelectorAll(".dish-control")].find((node) => node.dataset.key === key);
        const target = replacement?.querySelector(action);
        (target && !target.hidden ? target : replacement?.querySelector(".menu-add") || selectionFilter)?.focus({ preventScroll: true });
      }
    });
    clear?.addEventListener("click", reset);
    empty.querySelector("button")?.addEventListener("click", reset);
    document.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        search.focus();
        search.select();
      }
    });
    renderNow();
  };

  const initFeaturedOrders = () => {
    const featured = [
      { id: "ramen-chicken" }, { code: "6" },
      { category: "fleisch", query: "42" }, { category: "udon" }
    ];
    document.querySelectorAll(".food-card").forEach((card, index) => {
      const selection = featured[index];
      if (!selection) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "feature-order";
      button.textContent = selection.category ? "Varianten ansehen ↗" : "Zur Bestellung +";
      const dishName = card.querySelector("h3")?.textContent || "Gericht";
      button.setAttribute("aria-label", `${dishName}: ${selection.category ? "Varianten ansehen" : "zur Bestellung hinzufügen"}`);
      button.addEventListener("click", () => {
        if (selection.category) {
          const search = document.getElementById("menu-search");
          if (search) {
            search.value = selection.query || "";
            search.dispatchEvent(new Event("input"));
          }
          if (!selection.query) document.querySelector(`.filter-button[data-category="${selection.category}"]`)?.click();
          document.getElementById("speisekarte")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
        } else {
          const item = items.find((entry) => selection.id ? entry.id === selection.id : entry.code === selection.code);
          if (!item) return;
          addOrderItem({ key: item.id || item.code, code: item.code, name: item.name, price: item.price });
          button.textContent = "Hinzugefügt ✓";
          window.setTimeout(() => { button.textContent = "Zur Bestellung +"; }, 1600);
        }
      });
      card.querySelector(".food-card-body")?.appendChild(button);
    });
  };

  const initReservation = () => {
    const form = document.getElementById("reservation-form");
    const dateInput = document.getElementById("reservation-date");
    const status = document.getElementById("reservation-status");
    if (!form || !dateInput) return;

    const toLocalISODate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const today = new Date();
    const latest = new Date(today);
    latest.setDate(latest.getDate() + 90);
    dateInput.min = toLocalISODate(today);
    dateInput.max = toLocalISODate(latest);

    const validateDate = () => {
      dateInput.setCustomValidity("");
      if (!dateInput.value) return true;
      const selected = new Date(`${dateInput.value}T12:00:00`);
      if (selected.getDay() === 0) {
        dateInput.setCustomValidity("Sonntag ist Ruhetag. Bitte wählen Sie Montag bis Samstag.");
        return false;
      }
      return true;
    };

    dateInput.addEventListener("change", () => {
      if (!validateDate()) dateInput.reportValidity();
      if (status) status.textContent = "";
    });

    form.addEventListener("input", () => {
      if (status) status.textContent = "";
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateDate() || !form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const dateValue = String(data.get("date") || "");
      const time = String(data.get("time") || "");
      const guests = Number(data.get("guests"));
      const occasion = String(data.get("occasion") || "").trim();
      const note = String(data.get("note") || "").trim();
      const date = new Intl.DateTimeFormat("de-DE", {
        weekday: "long", day: "2-digit", month: "2-digit", year: "numeric"
      }).format(new Date(`${dateValue}T12:00:00`));
      const guestLabel = guests === 1 ? "1 Person" : `${guests} Personen`;
      const message = [
        "Hallo Kim Son's Asia Bistro,",
        "",
        "ich möchte gerne einen Tisch reservieren:",
        `• Datum: ${date}`,
        `• Uhrzeit: ${time} Uhr`,
        `• Personen: ${guestLabel}`,
        `• Name: ${name}`,
        `• Telefon: ${phone}`,
        occasion ? `• Anlass: ${occasion}` : "",
        note ? `• Wünsche/Hinweise: ${note}` : "",
        "",
        "Bitte bestätigen Sie mir kurz, ob der Tisch verfügbar ist. Vielen Dank!"
      ].filter(Boolean).join("\n");
      const whatsappNumber = String(config.restaurant?.whatsapp || "").replace(/\D/g, "");
      const target = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "https://wa.me/";
      const url = `${target}?text=${encodeURIComponent(message)}`;
      const opened = window.open(url, "_blank", "noopener,noreferrer");
      if (!opened) window.location.href = url;
      if (status) status.textContent = "Ihre Reservierungsanfrage wurde für WhatsApp vorbereitet.";
    });
  };

  initMotionSystem();
  applyConfig();
  initMobileMenu();
  initMobileActionbar();
  initOrdering();
  initMenu();
  initFeaturedOrders();
  initReservation();
  initCardInteractions();
  initActiveNavigation();
  initRevealMotion();
  initScrollMotion();
})();
