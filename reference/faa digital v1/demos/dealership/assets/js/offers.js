/* =============================================================
   PRESTIGE MOTORS — Offers page logic
   ============================================================= */
(function () {
  "use strict";
  const A = window.Prestige;
  const offers = A.store.getOffers();
  const grid = A.qs("#offersGrid");
  offers.forEach(o => {
    const c = A.el("div", { class: "card reveal" });
    c.style.padding = "30px";
    c.innerHTML = `
      <div class="flex between" style="align-items:center">
        <span class="badge badge--gold">${o.type}</span>
        <span class="gold" style="font-family:var(--font-serif);font-size:2rem;font-weight:700">${o.discount}</span>
      </div>
      <h3 style="margin:16px 0 6px">${o.title}</h3>
      <p class="gold" style="margin:0 0 10px;font-weight:600">${o.subtitle}</p>
      <p class="muted">${o.description}</p>
      <div class="flex between" style="margin-top:14px;align-items:center">
        <span class="muted" style="font-size:.82rem">Ends ${A.fmt.date(o.expires)}</span>
        <a class="btn btn--sm btn--gold" href="inventory.html">Shop Now</a>
      </div>`;
    grid.appendChild(c);
  });
  A.qs("#offersNews").addEventListener("submit", e => { e.preventDefault(); e.target.reset(); A.toast("You're on the list!", "success"); });
  A.reveal();
})();
