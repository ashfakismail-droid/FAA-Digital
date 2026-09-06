/* =============================================================
   PRESTIGE MOTORS — Compare page logic
   ============================================================= */
(function () {
  "use strict";
  const A = window.Prestige;
  const vehicles = A.store.getVehicles();
  const ids = A.store.getCompare();
  const empty = A.qs("#compareEmpty");
  const wrap = A.qs("#compareWrap");
  const table = A.qs("#compareTable");

  if (!ids.length) { empty.classList.remove("hidden"); return; }
  empty.classList.add("hidden"); wrap.classList.remove("hidden");

  const list = ids.map(id => vehicles.find(v => v.id === id)).filter(Boolean);
  const rows = [
    { k: "Image", get: v => `<img src="${v.gallery[0]}" alt="${v.brand} ${v.model}" style="width:160px;border-radius:8px">` },
    { k: "Brand", get: v => v.brand },
    { k: "Model", get: v => v.model },
    { k: "Year", get: v => v.year },
    { k: "Price", get: v => A.fmt.gbp(v.price), diff: true },
    { k: "EMI / mo", get: v => A.fmt.gbp(v.emi), diff: true },
    { k: "Mileage", get: v => v.mileage.toLocaleString() + " mi", diff: true },
    { k: "Fuel", get: v => v.fuel },
    { k: "Transmission", get: v => v.transmission },
    { k: "Drive", get: v => v.drive },
    { k: "Horsepower", get: v => v.horsepower + " HP", diff: true },
    { k: "Engine", get: v => v.engine },
    { k: "Top Speed", get: v => v.topSpeed + " mph", diff: true },
    { k: "0–100", get: v => v.acceleration + " s", diff: true },
    { k: "Body Type", get: v => v.bodyType },
    { k: "Seats", get: v => v.seats, diff: true },
    { k: "Exterior", get: v => v.exteriorColor },
    { k: "Interior", get: v => v.interiorColor },
    { k: "Availability", get: v => v.availability }
  ];

  let html = "<thead><tr><th></th>";
  list.forEach(v => {
    html += `<th><div style="font-family:var(--font-serif);font-size:1.1rem">${v.brand} ${v.model}</div><div class="muted" style="font-weight:400;font-size:.85rem">${v.year}</div><button class="icon-btn danger" data-rm="${v.id}" title="Remove" style="margin-top:8px">✕</button></th>`;
  });
  html += "</tr></thead><tbody>";

  rows.forEach(r => {
    const vals = list.map(r.get);
    const isDiff = r.diff && new Set(vals).size > 1;
    html += `<tr><th>${r.k}</th>`;
    vals.forEach(val => { html += `<td class="${isDiff ? "diff" : ""}">${val}</td>`; });
    html += "</tr>";
  });
  html += "</tbody>";
  table.innerHTML = html;

  table.querySelectorAll("[data-rm]").forEach(b => b.addEventListener("click", () => {
    A.store.toggleCompare(+b.dataset.rm);
    const nc = A.qs("#navCmp"); if (nc) nc.textContent = A.store.getCompare().length;
    location.reload();
  }));
  A.qs("#clearCompare").addEventListener("click", () => {
    ids.forEach(id => A.store.toggleCompare(id));
    location.reload();
  });
})();
