/* =============================================================
   PRESTIGE MOTORS — Trade-In page logic
   ============================================================= */
(function () {
  "use strict";
  const A = window.Prestige;
  const f = {
    make: A.qs("#tMake"), model: A.qs("#tModel"), year: A.qs("#tYear"), mileage: A.qs("#tMileage"),
    cond: A.qs("#tCondition"), fuel: A.qs("#tFuel"), photos: A.qs("#tPhotos"), name: A.qs("#tName"),
    email: A.qs("#tEmail"), phone: A.qs("#tPhone")
  };
  const out = {
    value: A.qs("#estValue"), range: A.qs("#estRange"), base: A.qs("#baseVal"),
    cond: A.qs("#condAdj"), est2: A.qs("#estVal2")
  };

  const COND_MULT = { Excellent: 1.0, Good: 0.88, Fair: 0.74, Poor: 0.58 };
  const FUEL_MULT = { Petrol: 1.0, Diesel: 0.95, Hybrid: 1.05, Electric: 1.08 };

  function estimate() {
    const yr = +f.year.value || new Date().getFullYear();
    const mi = +f.mileage.value || 0;
    const age = Math.max(0, new Date().getFullYear() - yr);
    // base value model
    let base = 42000 * Math.pow(0.86, age);
    base *= FUEL_MULT[f.fuel.value] || 1;
    base *= Math.max(0.35, 1 - mi / 160000);
    base = Math.round(base / 250) * 250;
    const condAdj = Math.round(base * (COND_MULT[f.cond.value] - 1));
    const total = Math.max(0, base + condAdj);
    const low = Math.round(total * 0.94), high = Math.round(total * 1.06);

    out.value.textContent = A.fmt.gbp(total);
    out.range.textContent = `Range ${A.fmt.gbp(low)} – ${A.fmt.gbp(high)}`;
    out.base.textContent = A.fmt.gbp(base);
    out.cond.textContent = (condAdj >= 0 ? "+" : "") + A.fmt.gbp(condAdj);
    out.est2.textContent = A.fmt.gbp(total);
  }

  [f.year, f.mileage, f.cond, f.fuel].forEach(e => e.addEventListener("input", estimate));
  estimate();

  // photo preview
  f.photos.addEventListener("change", () => {
    const prev = A.qs("#photoPreview"); prev.innerHTML = "";
    Array.from(f.photos.files).slice(0, 6).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = A.el("img", { src: e.target.result, alt: "preview" });
        img.style.cssText = "width:80px;height:60px;object-fit:cover;border-radius:8px;border:1px solid var(--line)";
        prev.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });

  A.qs("#tradeForm").addEventListener("submit", e => {
    e.preventDefault();
    const rec = {
      id: Date.now(), make: f.make.value, model: f.model.value, year: +f.year.value,
      mileage: +f.mileage.value, condition: f.cond.value, fuel: f.fuel.value,
      name: f.name.value, email: f.email.value, phone: f.phone.value,
      estimate: out.value.textContent, date: new Date().toISOString()
    };
    A.store.addTradeIn(rec);
    A.modal.open(`
      <div style="text-align:center">
        <div style="font-size:3rem">✅</div>
        <h2 style="margin:10px 0">Valuation Received</h2>
        <p class="muted">Thank you, ${rec.name}. Your ${rec.make} ${rec.model} is estimated at <strong>${rec.estimate}</strong>.</p>
        <p class="muted">A valuation specialist will contact you within one business day to arrange inspection.</p>
        <button class="btn btn--gold" onclick="Prestige.modal.close()">Done</button>
      </div>`);
    e.target.reset();
    A.qs("#photoPreview").innerHTML = "";
    estimate();
  });
})();
