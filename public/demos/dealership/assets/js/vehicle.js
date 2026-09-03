/* =============================================================
   PRESTIGE MOTORS — Vehicle detail page logic
   ============================================================= */
(function () {
  "use strict";
  const A = window.Prestige;
  const vehicles = A.store.getVehicles();
  const slug = new URLSearchParams(location.search).get("slug");
  const v = vehicles.find(x => x.slug === slug) || vehicles[0];

  if (!v) { location.href = "404.html"; return; }

  document.title = `${v.brand} ${v.model} ${v.year} — Prestige Motors`;

  /* breadcrumb */
  A.qs("#breadcrumb").innerHTML = `
    <a href="index.html">Home</a><span>/</span>
    <a href="inventory.html">Inventory</a><span>/</span>
    <a href="inventory.html?brand=${encodeURIComponent(v.brand)}">${v.brand}</a><span>/</span>
    <span>${v.model} ${v.year}</span>`;

  /* gallery */
  const mainImg = A.qs("#mainImgEl");
  mainImg.src = v.gallery[0];
  mainImg.alt = `${v.brand} ${v.model}`;
  const thumbs = A.qs("#thumbs");
  v.gallery.forEach((g, i) => {
    const b = A.el("button", { class: i === 0 ? "active" : "" });
    b.innerHTML = `<img src="${g}" alt="${v.brand} ${v.model} view ${i + 1}" loading="lazy">`;
    b.addEventListener("click", () => {
      mainImg.src = g;
      A.qsa("button", thumbs).forEach(x => x.classList.remove("active"));
      b.classList.add("active");
    });
    thumbs.appendChild(b);
  });
  // zoom
  const mainWrap = A.qs("#mainImg");
  mainWrap.addEventListener("click", () => mainWrap.classList.toggle("zoomed"));

  /* summary head */
  A.qs("#summaryHead").innerHTML = `
    <span class="vcard__brand">${v.brand}</span>
    <h1 style="margin:6px 0">${v.model} <span class="muted" style="font-weight:400">${v.year}</span></h1>
    <div class="vcard__specs" style="font-size:.95rem">
      <span>⚙ ${v.transmission}</span><span>⛽ ${v.fuel}</span>
      <span>🏁 ${v.horsepower} HP</span><span>👥 ${v.seats} seats</span>
      <span>🎨 ${v.exteriorColor}</span><span>📍 ${v.bodyType}</span>
    </div>
    <p style="margin-top:14px">${v.description}</p>`;

  /* price */
  A.qs("#priceBig").textContent = A.fmt.gbp(v.price);
  A.qs("#availBadge").textContent = v.availability;
  A.qs("#availBadge").className = "badge " + (v.availability === "In Stock" ? "badge--new" : v.availability === "Reserved" ? "badge--reserved" : "");
  A.qs("#emiLine").textContent = `or from ${A.fmt.gbp(v.emi)}/mo · ${v.mileage.toLocaleString()} miles · VIN ${v.vin}`;

  /* spec table */
  const specs = [
    ["Brand", v.brand], ["Model", v.model], ["Year", v.year], ["Condition", v.condition],
    ["Mileage", v.mileage.toLocaleString() + " mi"], ["Fuel Type", v.fuel],
    ["Transmission", v.transmission], ["Drive Type", v.drive],
    ["Horsepower", v.horsepower + " HP"], ["Engine", v.engine],
    ["Top Speed", v.topSpeed + " mph"], ["0–100 km/h", v.acceleration + " s"],
    ["Body Type", v.bodyType], ["Seats", v.seats],
    ["Exterior Colour", v.exteriorColor], ["Interior Colour", v.interiorColor],
    ["VIN", v.vin], ["Availability", v.availability]
  ];
  A.qs("#specTable").innerHTML = specs.map(s => `<tr><th>${s[0]}</th><td>${s[1]}</td></tr>`).join("");

  /* features */
  A.qs("#featureList").innerHTML = v.features.map(f => `<li>${f}</li>`).join("");

  /* actions */
  const saveBtn = A.qs("#saveBtn");
  const compareBtn = A.qs("#compareBtn");
  function syncBtns() {
    const fav = A.store.inWishlist(v.id);
    saveBtn.textContent = (fav ? "♥ " : "♡ ") + "Save";
    saveBtn.style.color = fav ? "var(--c-danger)" : "";
    const cmp = A.store.inCompare(v.id);
    compareBtn.textContent = "⇄ Compare";
    compareBtn.style.color = cmp ? "var(--c-accent)" : "";
  }
  syncBtns();
  saveBtn.addEventListener("click", () => { A.store.toggleWishlist(v.id); syncBtns(); const nw = A.qs("#navWish"); if (nw) nw.textContent = A.store.getWishlist().length; A.toast("Wishlist updated", "success"); });
  compareBtn.addEventListener("click", () => {
    const res = A.store.toggleCompare(v.id);
    if (!res.ok) { A.toast("You can compare up to 3 vehicles", "error"); return; }
    syncBtns(); const nc = A.qs("#navCmp"); if (nc) nc.textContent = res.list.length;
    A.toast(res.list.includes(v.id) ? "Added to compare" : "Removed from compare", "success");
  });
  A.qs("#shareBtn").addEventListener("click", async () => {
    const url = location.href;
    try { await navigator.share({ title: document.title, url }); } catch (e) {
      navigator.clipboard.writeText(url).then(() => A.toast("Link copied to clipboard", "success"));
    }
  });
  A.qs("#brochureBtn").addEventListener("click", () => {
    const content = `PRESTIGE MOTORS — VEHICLE BROCHURE\n\n${v.brand} ${v.model} (${v.year})\nPrice: ${A.fmt.gbp(v.price)}\nVIN: ${v.vin}\n\nSpecifications:\n${specs.map(s => `- ${s[0]}: ${s[1]}`).join("\n")}\n\nFeatures:\n${v.features.map(f => "- " + f).join("\n")}\n\nDescription:\n${v.description}\n\nEnquiries: concierge@prestigemotors.co.uk`;
    const blob = new Blob([content], { type: "text/plain" });
    const a = A.el("a", { href: URL.createObjectURL(blob), download: `${v.brand}-${v.model}-${v.year}-brochure.txt` });
    document.body.appendChild(a); a.click(); a.remove();
    A.toast("Brochure downloaded", "success");
  });
  A.qs("#bookBtn").href = `test-drive.html?slug=${v.slug}`;
  A.qs("#financeBtn").addEventListener("click", () => {
    A.qs("#financeCalc").scrollIntoView({ behavior: "smooth" });
  });

  /* finance calculator */
  const depR = A.qs("#depRange"), termR = A.qs("#termRange"), aprR = A.qs("#aprRange");
  const depV = A.qs("#depVal"), termV = A.qs("#termVal"), aprV = A.qs("#aprVal");
  const monthlyOut = A.qs("#monthlyOut"), totalOut = A.qs("#totalOut");
  function calc() {
    const deposit = Math.round(v.price * (+depR.value / 100));
    const principal = v.price - deposit;
    const months = +termR.value;
    const apr = +aprR.value;
    const r = apr / 100 / 12;
    let monthly;
    if (r === 0) monthly = principal / months;
    else monthly = principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
    monthly = Math.round(monthly);
    depV.textContent = A.fmt.gbp(deposit) + ` (${depR.value}%)`;
    termV.textContent = months + " mo";
    aprV.textContent = apr.toFixed(1) + "%";
    monthlyOut.textContent = A.fmt.gbp(monthly);
    totalOut.textContent = `Total payable ${A.fmt.gbp(deposit + monthly * months)} over ${months} months`;
  }
  [depR, termR, aprR].forEach(r => r.addEventListener("input", calc));
  calc();

  /* related */
  const related = vehicles.filter(x => x.brand === v.brand && x.id !== v.id).slice(0, 4);
  const fill = related.length ? related : vehicles.filter(x => x.bodyType === v.bodyType && x.id !== v.id).slice(0, 4);
  const rg = A.qs("#relatedGrid");
  fill.forEach(x => rg.appendChild(A.vehicleCard(x)));

  A.reveal();
})();
