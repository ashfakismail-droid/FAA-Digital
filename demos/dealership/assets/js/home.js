/* =============================================================
   PRESTIGE MOTORS — Home page logic
   ============================================================= */
(function () {
  "use strict";
  const A = window.Prestige;
  const vehicles = A.store.getVehicles();
  const offers = A.store.getOffers();
  const blog = A.store.getBlog();

  /* ---------- Hero slider (uses vehicle imagery as full-bleed slides) ---------- */
  const heroImgs = vehicles.slice(0, 5).map(v => v.gallery[0]);
  const slidesEl = A.qs("#heroSlides");
  const dotsEl = A.qs("#heroDots");
  heroImgs.forEach((src, i) => {
    const s = A.el("div", { class: "hero__slide" + (i === 0 ? " active" : "") });
    s.style.backgroundImage = `linear-gradient(rgba(8,9,11,.25),rgba(8,9,11,.25)), url('${src}')`;
    slidesEl.appendChild(s);
    const d = A.el("button", { class: i === 0 ? "active" : "", "aria-label": "Slide " + (i + 1) });
    d.addEventListener("click", () => go(i));
    dotsEl.appendChild(d);
  });
  let hi = 0;
  function go(n) {
    const slides = A.qsa(".hero__slide", slidesEl);
    const dots = A.qsa("button", dotsEl);
    slides[hi].classList.remove("active"); dots[hi].classList.remove("active");
    hi = (n + slides.length) % slides.length;
    slides[hi].classList.add("active"); dots[hi].classList.add("active");
  }
  setInterval(() => go(hi + 1), 5500);

  /* ---------- Count up ---------- */
  A.qsa("[data-count]").forEach(el => {
    const target = +el.dataset.count; let cur = 0;
    const step = Math.max(1, Math.round(target / 40));
    const t = setInterval(() => { cur += step; if (cur >= target) { cur = target; clearInterval(t); } el.textContent = cur; }, 30);
  });

  /* ---------- Brand marquee ---------- */
  const brands = [...new Set(vehicles.map(v => v.brand))].sort();
  A.qs("#brandMarquee").innerHTML = brands.map(b =>
    `<img src="assets/img/brands/${A.fmt.slug(b)}.svg" alt="${b}" title="${b}" onerror="this.style.display='none'">`
  ).join("");

  /* ---------- Featured vehicles ---------- */
  const featured = vehicles.filter(v => v.featured).slice(0, 3);
  const fg = A.qs("#featuredGrid");
  featured.forEach(v => fg.appendChild(A.vehicleCard(v)));

  /* ---------- Latest arrivals ---------- */
  const arrivals = vehicles.slice().sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 4);
  const ag = A.qs("#arrivalsGrid");
  arrivals.forEach(v => ag.appendChild(A.vehicleCard(v)));

  /* ---------- Offers ---------- */
  const og = A.qs("#offersGrid");
  offers.slice(0, 3).forEach(o => {
    const c = A.el("div", { class: "card reveal" });
    c.style.padding = "28px";
    c.innerHTML = `
      <div class="flex between" style="align-items:center">
        <span class="badge badge--gold">${o.type}</span>
        <span class="gold" style="font-family:var(--font-serif);font-size:1.8rem;font-weight:700">${o.discount}</span>
      </div>
      <h3 style="margin-top:14px">${o.title}</h3>
      <p class="muted">${o.subtitle}</p>
      <p class="muted" style="font-size:.9rem">${o.description}</p>
      <a class="btn btn--sm btn--outline" href="offers.html">View offer</a>`;
    og.appendChild(c);
  });

  /* ---------- Services ---------- */
  const services = [
    { i: "🛡", t: "Bespoke Insurance", d: "Specialist cover for high-value vehicles with agreed valuation." },
    { i: "🔧", t: "Factory-Trained Service", d: "Manufacturer-certified technicians and genuine parts." },
    { i: "🚚", t: "Nationwide Delivery", d: "Door-to-door handover, detailed and fuelled, anywhere in the UK." },
    { i: "💎", t: "Concierge", d: "A dedicated specialist for every stage of your ownership journey." }
  ];
  const sg = A.qs("#servicesGrid");
  services.forEach(s => {
    const c = A.el("div", { class: "card reveal" });
    c.style.padding = "28px"; c.style.background = "rgba(255,255,255,.04)"; c.style.borderColor = "rgba(255,255,255,.12)";
    c.innerHTML = `<div style="font-size:2rem;margin-bottom:12px">${s.i}</div><h3 style="color:#fff;font-size:1.2rem">${s.t}</h3><p style="color:rgba(255,255,255,.7);font-size:.92rem;margin:0">${s.d}</p>`;
    sg.appendChild(c);
  });

  /* ---------- Testimonials ---------- */
  const testimonials = [
    { q: "The most seamless luxury car purchase I've experienced. Knowledgeable, unhurried, and genuinely client-focused.", n: "James W.", r: "Porsche 911 owner" },
    { q: "Their trade-in valuation was fair and the finance team had me approved the same afternoon. Impeccable.", n: "Amara K.", r: "Range Rover client" },
    { q: "A showroom that feels like a gallery. The aftercare has been faultless for three years running.", n: "Robert L.", r: "Mercedes-Benz S-Class" }
  ];
  const tg = A.qs("#testimonialsGrid");
  testimonials.forEach(t => {
    const c = A.el("div", { class: "card reveal" });
    c.style.padding = "28px";
    c.innerHTML = `
      <p class="quote">“${t.q}”</p>
      <div class="quote__author">
        <div class="quote__avatar">${t.n[0]}</div>
        <div><strong>${t.n}</strong><div class="muted" style="font-size:.85rem">${t.r}</div></div>
      </div>`;
    tg.appendChild(c);
  });

  /* ---------- Instagram ---------- */
  const ig = A.qs("#igGrid");
  vehicles.slice(0, 12).forEach(v => {
    const a = A.el("a", { href: "vehicle.html?slug=" + v.slug, title: v.brand + " " + v.model });
    a.innerHTML = `<img src="${v.gallery[1]}" alt="${v.brand} ${v.model}" loading="lazy">`;
    ig.appendChild(a);
  });

  /* ---------- Blog ---------- */
  const bg = A.qs("#blogGrid");
  blog.slice(0, 3).forEach(p => {
    const c = A.el("article", { class: "card reveal" });
    c.innerHTML = `
      <a href="blog.html?slug=${p.slug}"><img src="${p.image}" alt="${p.title}" style="aspect-ratio:16/9;object-fit:cover" loading="lazy"></a>
      <div style="padding:20px">
        <span class="badge badge--gold">${p.category}</span>
        <h3 style="font-size:1.15rem;margin:12px 0 6px"><a href="blog.html?slug=${p.slug}">${p.title}</a></h3>
        <p class="muted" style="font-size:.9rem">${p.excerpt}</p>
        <a class="btn btn--sm btn--outline" href="blog.html?slug=${p.slug}">Read more</a>
      </div>`;
    bg.appendChild(c);
  });

  /* ---------- Locations ---------- */
  const locations = [
    { c: "London Mayfair", a: "1 Mayfair Place, W1J 8AJ", p: "+44 20 7946 0991" },
    { c: "Manchester", a: "22 King Street, M2 4WQ", p: "+44 161 123 4567" },
    { c: "Birmingham", a: "8 Colmore Row, B3 2QB", p: "+44 121 987 6543" }
  ];
  const lg = A.qs("#locationsGrid");
  locations.forEach(l => {
    const c = A.el("div", { class: "card reveal" });
    c.style.padding = "28px";
    c.innerHTML = `
      <h3 style="color:#fff">${l.c}</h3>
      <p style="color:rgba(255,255,255,.7)">${l.a}</p>
      <p style="color:var(--c-gold);margin:0">${l.p}</p>
      <a class="btn btn--sm btn--ghost" style="margin-top:14px" href="locations.html">Details</a>`;
    lg.appendChild(c);
  });

  /* ---------- Newsletter ---------- */
  const nf = A.qs("#newsletterForm");
  if (nf) nf.addEventListener("submit", e => { e.preventDefault(); nf.reset(); A.toast("Thank you for subscribing!", "success"); });

  A.reveal();
})();
