/* =============================================================
   PRESTIGE MOTORS — Finance page logic
   ============================================================= */
(function () {
  "use strict";
  const A = window.Prestige;
  const vehicles = A.store.getVehicles();

  const sel = A.qs("#vehicleSelect");
  vehicles.slice().sort((a, b) => a.price - b.price).forEach(v => {
    const o = A.el("option", { value: v.id }); o.textContent = `${v.brand} ${v.model} (${A.fmt.gbp(v.price)})`; sel.appendChild(o);
  });

  const priceR = A.qs("#priceRange"), depR = A.qs("#depRange"), termR = A.qs("#termRange"), aprR = A.qs("#aprRange");
  const balloon = A.qs("#balloon"), product = A.qs("#product");
  const priceV = A.qs("#priceVal"), depV = A.qs("#depVal"), termV = A.qs("#termVal"), aprV = A.qs("#aprVal");
  const monthlyBig = A.qs("#monthlyBig"), productLabel = A.qs("#productLabel");
  const rPrice = A.qs("#rPrice"), rDep = A.qs("#rDep"), rAmt = A.qs("#rAmt"), rTerm = A.qs("#rTerm"), rInt = A.qs("#rInt"), rTotal = A.qs("#rTotal");

  sel.addEventListener("change", () => {
    const v = vehicles.find(x => x.id == sel.value);
    if (v) { priceR.value = v.price; calc(); }
  });

  function calc() {
    const price = +priceR.value;
    const deposit = Math.round(price * (+depR.value / 100));
    const months = +termR.value;
    const apr = +aprR.value;
    const balloonAmt = Math.max(0, +balloon.value || 0);
    const principal = price - deposit - balloonAmt;
    const r = apr / 100 / 12;
    let monthly;
    if (r === 0) monthly = principal / months;
    else monthly = principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
    monthly = Math.round(monthly);
    const totalInterest = Math.round(monthly * months - principal);
    const totalPayable = deposit + monthly * months + balloonAmt;

    priceV.textContent = A.fmt.gbp(price);
    depV.textContent = `${A.fmt.gbp(deposit)} (${depR.value}%)`;
    termV.textContent = months + " mo";
    aprV.textContent = apr.toFixed(1) + "%";

    monthlyBig.textContent = A.fmt.gbp(monthly);
    productLabel.textContent = product.value === "pcp" ? "per month (PCP)" : "per month (HP)";
    rPrice.textContent = A.fmt.gbp(price);
    rDep.textContent = A.fmt.gbp(deposit);
    rAmt.textContent = A.fmt.gbp(principal);
    rTerm.textContent = months + " mo";
    rInt.textContent = A.fmt.gbp(totalInterest);
    rTotal.textContent = A.fmt.gbp(totalPayable);
  }

  [priceR, depR, termR, aprR, balloon, product].forEach(e => e.addEventListener("input", calc));
  calc();
})();
