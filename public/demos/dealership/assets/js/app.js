/* =============================================================
   PRESTIGE MOTORS — Shared Application Core
   Storage, utilities, chrome (nav/footer), toasts, modals
   ============================================================= */
(function () {
  "use strict";

  const APP = {};

  /* ---------------- Storage ---------------- */
  const KEYS = {
    vehicles: "pm_vehicles",
    wishlist: "pm_wishlist",
    compare: "pm_compare",
    bookings: "pm_bookings",
    tradeins: "pm_tradeins",
    inquiries: "pm_inquiries",
    admin: "pm_admin",
    theme: "pm_theme",
    offers: "pm_offers"
  };

  function read(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  APP.store = {
    KEYS,
    get: read,
    set: write,
    /* Vehicles: lazily seed from generated data so admin CRUD persists */
    getVehicles() {
      let v = read(KEYS.vehicles, null);
      if (!v) { v = (window.PRESTIGE_VEHICLES || []).slice(); write(KEYS.vehicles, v); }
      return v;
    },
    saveVehicles(v) { write(KEYS.vehicles, v); },
    getOffers() {
      let o = read(KEYS.offers, null);
      if (!o) { o = (window.PRESTIGE_OFFERS || []).slice(); write(KEYS.offers, o); }
      return o;
    },
    saveOffers(o) { write(KEYS.offers, o); },
    getBlog() {
      let b = read("pm_blog", null);
      if (!b) { b = (window.PRESTIGE_BLOG || []).slice(); write("pm_blog", b); }
      return b;
    },

    getWishlist() { return read(KEYS.wishlist, []); },
    toggleWishlist(id) {
      let w = read(KEYS.wishlist, []);
      if (w.includes(id)) w = w.filter(x => x !== id); else w.push(id);
      write(KEYS.wishlist, w); return w;
    },
    inWishlist(id) { return read(KEYS.wishlist, []).includes(id); },

    getCompare() { return read(KEYS.compare, []); },
    toggleCompare(id) {
      let c = read(KEYS.compare, []);
      if (c.includes(id)) c = c.filter(x => x !== id);
      else { if (c.length >= 3) return { ok: false, list: c }; c.push(id); }
      write(KEYS.compare, c); return { ok: true, list: c };
    },
    inCompare(id) { return read(KEYS.compare, []).includes(id); },

    getBookings() { return read(KEYS.bookings, []); },
    addBooking(b) { const l = read(KEYS.bookings, []); l.push(b); write(KEYS.bookings, l); },
    removeBooking(id) { write(KEYS.bookings, read(KEYS.bookings, []).filter(x => x.id !== id)); },

    getTradeIns() { return read(KEYS.tradeins, []); },
    addTradeIn(t) { const l = read(KEYS.tradeins, []); l.push(t); write(KEYS.tradeins, l); },

    getInquiries() { return read(KEYS.inquiries, []); },
    addInquiry(i) { const l = read(KEYS.inquiries, []); l.push(i); write(KEYS.inquiries, l); },

    getAdmin() { return read(KEYS.admin, { loggedIn: false }); },
    login(user) { write(KEYS.admin, { loggedIn: true, user, at: Date.now() }); },
    logout() { write(KEYS.admin, { loggedIn: false }); },

    getTheme() { return read(KEYS.theme, null); },
    setTheme(t) { write(KEYS.theme, t); }
  };

  /* ---------------- Formatters ---------------- */
  APP.fmt = {
    gbp(n) { return "£" + Math.round(n).toLocaleString("en-GB"); },
    num(n) { return Number(n).toLocaleString("en-GB"); },
    date(iso) { try { return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); } catch (e) { return iso; } },
    slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
  };

  /* ---------------- DOM helpers ---------------- */
  APP.qs = (s, r = document) => r.querySelector(s);
  APP.qsa = (s, r = document) => Array.from(r.querySelectorAll(s));
  APP.el = (tag, attrs = {}, html = "") => {
    const e = document.createElement(tag);
    for (const k in attrs) {
      if (k === "class") e.className = attrs[k];
      else if (k === "dataset") Object.assign(e.dataset, attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    if (html) e.innerHTML = html;
    return e;
  };

  /* ---------------- Toast ---------------- */
  APP.toast = function (msg, type = "info") {
    let wrap = APP.qs(".toast-wrap");
    if (!wrap) { wrap = APP.el("div", { class: "toast-wrap" }); document.body.appendChild(wrap); }
    const t = APP.el("div", { class: "toast " + type }, `<span>${type === "success" ? "✓" : type === "error" ? "✕" : "ℹ"}</span><span>${msg}</span>`);
    wrap.appendChild(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transform = "translateX(120%)"; setTimeout(() => t.remove(), 350); }, 3200);
  };

  /* ---------------- Modal ---------------- */
  APP.modal = {
    open(html) {
      let m = APP.qs("#pm-modal");
      if (!m) {
        m = APP.el("div", { class: "modal", id: "pm-modal" });
        m.innerHTML = `<div class="modal__backdrop" data-close></div><div class="modal__box"><button class="modal__close" data-close>×</button><div class="modal__content"></div></div>`;
        document.body.appendChild(m);
        m.addEventListener("click", e => { if (e.target.hasAttribute("data-close")) APP.modal.close(); });
      }
      APP.qs(".modal__content", m).innerHTML = html;
      m.classList.add("open");
      document.body.style.overflow = "hidden";
      return APP.qs(".modal__content", m);
    },
    close() {
      const m = APP.qs("#pm-modal");
      if (m) { m.classList.remove("open"); document.body.style.overflow = ""; }
    }
  };

  /* ---------------- Reveal on scroll ---------------- */
  APP.reveal = function () {
    const els = APP.qsa(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  };

  /* ---------------- Vehicle card ---------------- */
  APP.vehicleCard = function (v) {
    const fav = APP.store.inWishlist(v.id);
    const cmp = APP.store.inCompare(v.id);
    const card = APP.el("article", { class: "card vcard", "data-id": v.id });
    card.innerHTML = `
      <div class="vcard__media">
        <div class="vcard__badges">
          ${v.condition === "New" ? '<span class="badge badge--new">New</span>' : ""}
          ${v.featured ? '<span class="badge badge--featured">Featured</span>' : ""}
          ${v.offer ? '<span class="badge badge--gold">Offer</span>' : ""}
          <span class="badge">${v.availability}</span>
        </div>
        <button class="vcard__fav ${fav ? "active" : ""}" data-fav="${v.id}" title="Save">${fav ? "♥" : "♡"}</button>
        <a href="vehicle.html?slug=${v.slug}"><img src="${v.gallery[0]}" alt="${v.brand} ${v.model}" loading="lazy"></a>
      </div>
      <div class="vcard__body">
        <span class="vcard__brand">${v.brand}</span>
        <h3 class="vcard__name">${v.model} <span class="muted" style="font-weight:400;font-size:.9rem">${v.year}</span></h3>
        <div class="vcard__specs">
          <span>⚙ ${v.transmission}</span>
          <span>⛽ ${v.fuel}</span>
          <span>🏁 ${v.horsepower} HP</span>
          <span>👥 ${v.seats} seats</span>
        </div>
        <div class="vcard__foot">
          <div>
            <div class="vcard__price">${APP.fmt.gbp(v.price)}</div>
            <div class="vcard__emi">${APP.fmt.gbp(v.emi)}/mo · ${v.mileage.toLocaleString()} mi</div>
          </div>
          <div class="flex" style="gap:8px">
            <button class="icon-btn" data-cmp="${v.id}" title="Compare" style="${cmp ? "border-color:var(--c-gold);color:var(--c-accent)" : ""}">⇄</button>
            <a class="btn btn--sm btn--gold" href="vehicle.html?slug=${v.slug}">View</a>
          </div>
        </div>
      </div>`;
    return card;
  };

  /* ---------------- Chrome (nav + footer) ---------------- */
  const NAV_LIGHT = document.body.dataset.nav === "light";
  APP.initChrome = function () {
    const page = document.body.dataset.page || "";
    const navEl = APP.qs("#site-nav");
    const footEl = APP.qs("#site-footer");
    const wishCount = APP.store.getWishlist().length;
    const cmpCount = APP.store.getCompare().length;

    if (navEl) {
      const links = [
        { href: "index.html", label: "Home", key: "home" },
        { href: "inventory.html", label: "Inventory", key: "inventory" },
        { href: "finance.html", label: "Finance", key: "finance" },
        { href: "trade-in.html", label: "Trade-In", key: "trade-in" },
        { href: "test-drive.html", label: "Test Drive", key: "test-drive" }
      ];
      const more = [
        { href: "about.html", label: "About" },
        { href: "services.html", label: "Services" },
        { href: "locations.html", label: "Locations" },
        { href: "offers.html", label: "Offers" },
        { href: "blog.html", label: "Blog" },
        { href: "compare.html", label: "Compare" },
        { href: "wishlist.html", label: "Wishlist" },
        { href: "contact.html", label: "Contact" },
        { href: "faq.html", label: "FAQ" }
      ];
      const navClass = "nav " + (NAV_LIGHT ? "nav--light" : "nav--solid");
      navEl.className = navClass;
      navEl.innerHTML = `
        <div class="nav__inner">
          <a class="brand" href="index.html"><span class="brand__mark">P</span> Prestige Motors</a>
          <nav class="nav__links" id="navLinks">
            ${links.map(l => `<a href="${l.href}" class="${page === l.key ? "active" : ""}">${l.label}</a>`).join("")}
            <div class="nav__dropdown">
              <a href="#">More</a>
              <div class="nav__menu">
                ${more.map(m => `<a href="${m.href}">${m.label}</a>`).join("")}
              </div>
            </div>
          </nav>
          <div class="nav__actions">
            <button class="theme-toggle" id="themeToggle" title="Toggle theme">◐</button>
            <a class="btn btn--sm btn--outline" href="wishlist.html" style="color:${NAV_LIGHT ? "#fff" : "var(--text)"}">♥ <span id="navWish">${wishCount}</span></a>
            <a class="btn btn--sm btn--gold" href="compare.html">⇄ <span id="navCmp">${cmpCount}</span></a>
            <a class="btn btn--sm btn--ghost" href="admin/login.html">Admin</a>
            <button class="nav__toggle" id="navToggle" aria-label="Menu">☰</button>
          </div>
        </div>`;

      // scroll state
      const onScroll = () => { if (window.scrollY > 40) navEl.classList.add("scrolled"); else navEl.classList.remove("scrolled"); };
      window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

      // mobile toggle
      const tg = APP.qs("#navToggle", navEl);
      const linksWrap = APP.qs("#navLinks", navEl);
      if (tg) tg.addEventListener("click", () => linksWrap.classList.toggle("open"));
      linksWrap.querySelectorAll("a").forEach(a => a.addEventListener("click", () => linksWrap.classList.remove("open")));

      // theme
      const tt = APP.qs("#themeToggle", navEl);
      if (tt) tt.addEventListener("click", () => {
        const cur = document.documentElement.getAttribute("data-theme");
        const next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        APP.store.setTheme(next);
      });
    }

    if (footEl) {
      footEl.className = "footer";
      footEl.innerHTML = `
        <div class="container">
          <div class="footer__grid">
            <div>
              <div class="footer__brand"><span class="brand__mark">P</span> Prestige Motors</div>
              <p style="max-width:320px">The definitive destination for luxury and performance automobiles. Curated inventory, white-glove service, and financing tailored to you.</p>
              <div class="socials">
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="Facebook">f</a>
                <a href="#" aria-label="YouTube">▶</a>
                <a href="#" aria-label="LinkedIn">in</a>
              </div>
            </div>
            <div>
              <h4>Explore</h4>
              <a href="inventory.html">Inventory</a>
              <a href="finance.html">Finance</a>
              <a href="trade-in.html">Trade-In</a>
              <a href="offers.html">Offers</a>
              <a href="compare.html">Compare</a>
            </div>
            <div>
              <h4>Company</h4>
              <a href="about.html">About Us</a>
              <a href="services.html">Services</a>
              <a href="locations.html">Locations</a>
              <a href="blog.html">Blog</a>
              <a href="faq.html">FAQ</a>
            </div>
            <div>
              <h4>Visit & Contact</h4>
              <p style="margin:0 0 6px">1 Mayfair Place, London W1J 8AJ</p>
              <p style="margin:0 0 6px">+44 20 7946 0991</p>
              <p style="margin:0 0 6px">concierge@prestigemotors.co.uk</p>
              <a href="contact.html" class="btn btn--sm btn--gold" style="margin-top:10px">Get in touch</a>
            </div>
          </div>
          <div class="footer__bottom">
            <span>© ${new Date().getFullYear()} Prestige Motors. All rights reserved.</span>
            <span>Privacy · Terms · Cookies · Sitemap</span>
          </div>
        </div>`;
    }

    // global fav/compare delegation
    document.addEventListener("click", e => {
      const fav = e.target.closest("[data-fav]");
      if (fav) {
        const id = +fav.dataset.fav;
        const on = APP.store.toggleWishlist(id);
        fav.classList.toggle("active", on.includes(id));
        fav.textContent = on.includes(id) ? "♥" : "♡";
        const nw = APP.qs("#navWish"); if (nw) nw.textContent = on.length;
        APP.toast(on.includes(id) ? "Saved to wishlist" : "Removed from wishlist", on.includes(id) ? "success" : "info");
        return;
      }
      const cmp = e.target.closest("[data-cmp]");
      if (cmp) {
        const id = +cmp.dataset.cmp;
        const res = APP.store.toggleCompare(id);
        if (!res.ok) { APP.toast("You can compare up to 3 vehicles", "error"); return; }
        cmp.style.borderColor = res.list.includes(id) ? "var(--c-gold)" : "var(--line)";
        cmp.style.color = res.list.includes(id) ? "var(--c-accent)" : "";
        const nc = APP.qs("#navCmp"); if (nc) nc.textContent = res.list.length;
        APP.toast(res.list.includes(id) ? "Added to compare" : "Removed from compare", res.list.includes(id) ? "success" : "info");
      }
    });

    APP.reveal();
  };

  /* ---------------- Theme init ---------------- */
  (function initTheme() {
    const saved = APP.store.getTheme();
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  })();

  /* ---------------- Boot ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    APP.initChrome();
    // refresh nav counts (in case storage changed)
    const nw = APP.qs("#navWish"); if (nw) nw.textContent = APP.store.getWishlist().length;
    const nc = APP.qs("#navCmp"); if (nc) nc.textContent = APP.store.getCompare().length;
  });

  window.Prestige = APP;
})();
