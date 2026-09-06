/* =============================================================
   PRESTIGE MOTORS — Inventory page logic
   ============================================================= */
(function () {
  "use strict";
  const A = window.Prestige;
  let vehicles = A.store.getVehicles();
  const PER_PAGE = 12;
  let page = 1;
  let view = "grid";

  const els = {
    brand: A.qs("#fBrand"), body: A.qs("#fBody"), fuel: A.qs("#fFuel"), trans: A.qs("#fTrans"),
    year: A.qs("#fYear"), seats: A.qs("#fSeats"), color: A.qs("#fColor"), avail: A.qs("#fAvail"),
    price: A.qs("#fPrice"), mileage: A.qs("#fMileage"), hp: A.qs("#fHp"),
    search: A.qs("#fSearch"), sort: A.qs("#fSort"), reset: A.qs("#fReset"),
    results: A.qs("#results"), count: A.qs("#resultCount"), pag: A.qs("#pagination"),
    empty: A.qs("#emptyState"), toggle: A.qs("#viewToggle")
  };

  /* populate selects */
  function fill(sel, values, label) {
    values.forEach(v => { const o = A.el("option", { value: v }); o.textContent = label ? label(v) : v; sel.appendChild(o); });
  }
  fill(els.brand, [...new Set(vehicles.map(v => v.brand))].sort());
  fill(els.body, [...new Set(vehicles.map(v => v.bodyType))].sort());
  fill(els.fuel, [...new Set(vehicles.map(v => v.fuel))].sort());
  fill(els.trans, [...new Set(vehicles.map(v => v.transmission))].sort());
  fill(els.year, [...new Set(vehicles.map(v => v.year))].sort((a, b) => b - a));
  fill(els.seats, [...new Set(vehicles.map(v => v.seats))].sort((a, b) => a - b));
  fill(els.color, [...new Set(vehicles.map(v => v.exteriorColor))].sort());
  fill(els.avail, [...new Set(vehicles.map(v => v.availability))].sort());

  /* URL params */
  const params = new URLSearchParams(location.search);
  if (params.get("brand")) els.brand.value = params.get("brand");
  if (params.get("sort")) els.sort.value = params.get("sort");
  if (params.get("q")) els.search.value = params.get("q");

  function applyFilters() {
    const q = els.search.value.trim().toLowerCase();
    let list = vehicles.filter(v => {
      if (els.brand.value && v.brand !== els.brand.value) return false;
      if (els.body.value && v.bodyType !== els.body.value) return false;
      if (els.fuel.value && v.fuel !== els.fuel.value) return false;
      if (els.trans.value && v.transmission !== els.trans.value) return false;
      if (els.year.value && String(v.year) !== els.year.value) return false;
      if (els.seats.value && String(v.seats) !== els.seats.value) return false;
      if (els.color.value && v.exteriorColor !== els.color.value) return false;
      if (els.avail.value && v.availability !== els.avail.value) return false;
      if (els.price.value && v.price > +els.price.value) return false;
      if (els.mileage.value && v.mileage > +els.mileage.value) return false;
      if (els.hp.value && v.horsepower < +els.hp.value) return false;
      if (q) {
        const hay = (v.brand + " " + v.model + " " + v.year + " " + v.bodyType + " " + v.fuel + " " + v.exteriorColor).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    switch (els.sort.value) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "mileage": list.sort((a, b) => a.mileage - b.mileage); break;
      case "year": list.sort((a, b) => b.year - a.year); break;
      case "alpha": list.sort((a, b) => (a.brand + a.model).localeCompare(b.brand + b.model)); break;
      default: list.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }
    return list;
  }

  function render() {
    const list = applyFilters();
    const total = list.length;
    const pages = Math.max(1, Math.ceil(total / PER_PAGE));
    if (page > pages) page = pages;
    const start = (page - 1) * PER_PAGE;
    const slice = list.slice(start, start + PER_PAGE);

    els.count.textContent = `${total} vehicle${total !== 1 ? "s" : ""} found`;
    els.results.className = "grid " + (view === "grid" ? "grid-3" : "grid-1 list-view");
    els.results.innerHTML = "";

    if (!slice.length) { els.empty.classList.remove("hidden"); els.pag.innerHTML = ""; return; }
    els.empty.classList.add("hidden");
    slice.forEach(v => els.results.appendChild(A.vehicleCard(v)));

    // pagination
    els.pag.innerHTML = "";
    const mkBtn = (label, p, opts = {}) => {
      const b = A.el("button", opts.disabled ? { disabled: "" } : {});
      b.innerHTML = label;
      if (opts.active) b.classList.add("active");
      if (!opts.disabled) b.addEventListener("click", () => { page = p; render(); window.scrollTo({ top: 0, behavior: "smooth" }); });
      els.pag.appendChild(b);
    };
    mkBtn("‹", page - 1, { disabled: page === 1 });
    const range = [];
    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || Math.abs(i - page) <= 1) range.push(i);
      else if (range[range.length - 1] !== "…") range.push("…");
    }
    range.forEach(i => { if (i === "…") { const s = A.el("button", { disabled: "" }); s.textContent = "…"; els.pag.appendChild(s); } else mkBtn(String(i), i, { active: i === page }); });
    mkBtn("›", page + 1, { disabled: page === pages });

    A.reveal();
  }

  /* events */
  [els.brand, els.body, els.fuel, els.trans, els.year, els.seats, els.color, els.avail, els.price, els.mileage, els.hp, els.sort]
    .forEach(s => s.addEventListener("change", () => { page = 1; render(); }));
  let st;
  els.search.addEventListener("input", () => { clearTimeout(st); st = setTimeout(() => { page = 1; render(); }, 200); });
  els.reset.addEventListener("click", () => {
    [els.brand, els.body, els.fuel, els.trans, els.year, els.seats, els.color, els.avail, els.price, els.mileage, els.hp].forEach(s => s.value = "");
    els.search.value = ""; els.sort.value = "newest"; page = 1; render();
  });
  A.qs("#clearLink").addEventListener("click", e => { e.preventDefault(); els.reset.click(); });
  els.toggle.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    view = b.dataset.view;
    els.toggle.querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
    render();
  }));

  render();
})();
