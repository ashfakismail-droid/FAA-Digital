/* =============================================================
   PRESTIGE MOTORS — Locations page logic
   ============================================================= */
(function () {
  "use strict";
  const A = window.Prestige;
  const locs = [
    { c: "London Mayfair", a: "1 Mayfair Place, London W1J 8AJ", p: "+44 20 7946 0991", h: "Mon–Sat 09:00–19:00 · Sun 11:00–17:00", m: "flagship" },
    { c: "Manchester", a: "22 King Street, Manchester M2 4WQ", p: "+44 161 123 4567", h: "Mon–Sat 09:00–18:00 · Sun 12:00–16:00", m: "north" },
    { c: "Birmingham", a: "8 Colmore Row, Birmingham B3 2QB", p: "+44 121 987 6543", h: "Mon–Sat 09:00–18:00 · Sun 12:00–16:00", m: "midlands" }
  ];
  const grid = A.qs("#locGrid");
  locs.forEach(l => {
    const c = A.el("div", { class: "card reveal" });
    c.style.padding = "28px";
    c.innerHTML = `
      <span class="badge badge--gold">${l.m}</span>
      <h3 style="margin:12px 0 6px">${l.c}</h3>
      <p class="muted" style="margin:0">${l.a}</p>
      <p style="color:var(--c-gold);margin:10px 0 4px">${l.p}</p>
      <p class="muted" style="font-size:.88rem">${l.h}</p>
      <a class="btn btn--sm btn--outline" style="margin-top:12px" href="contact.html">Contact</a>`;
    grid.appendChild(c);
  });
  A.reveal();
})();
