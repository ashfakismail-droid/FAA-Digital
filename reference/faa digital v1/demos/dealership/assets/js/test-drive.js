/* =============================================================
   PRESTIGE MOTORS — Book Test Drive logic
   ============================================================= */
(function () {
  "use strict";
  const A = window.Prestige;
  const vehicles = A.store.getVehicles();
  const sel = A.qs("#tdVehicle");

  vehicles.slice().sort((a, b) => (a.brand + a.model).localeCompare(b.brand + b.model)).forEach(v => {
    const o = A.el("option", { value: v.slug }); o.textContent = `${v.brand} ${v.model} (${v.year})`; sel.appendChild(o);
  });

  // prefill from query
  const q = new URLSearchParams(location.search).get("slug");
  if (q) sel.value = q;

  // min date = today
  const dateEl = A.qs("#tdDate");
  const today = new Date().toISOString().split("T")[0];
  dateEl.min = today;

  A.qs("#tdForm").addEventListener("submit", e => {
    e.preventDefault();
    const v = vehicles.find(x => x.slug === sel.value);
    const rec = {
      id: Date.now(),
      vehicle: v ? `${v.brand} ${v.model} (${v.year})` : sel.value,
      vehicleSlug: sel.value,
      name: A.qs("#tdName").value, email: A.qs("#tdEmail").value, phone: A.qs("#tdPhone").value,
      dealer: A.qs("#tdDealer").value, date: A.qs("#tdDate").value, time: A.qs("#tdTime").value,
      notes: A.qs("#tdNotes").value, status: "Pending", created: new Date().toISOString()
    };
    A.store.addBooking(rec);

    // step animation
    A.qs("#step1").classList.remove("active"); A.qs("#step1").classList.add("done");
    A.qs("#step2").classList.remove("active"); A.qs("#step2").classList.add("done");
    A.qs("#step3").classList.add("active");

    A.modal.open(`
      <div style="text-align:center">
        <div style="font-size:3rem">🚗</div>
        <h2 style="margin:10px 0">Test Drive Confirmed</h2>
        <p class="muted">Thank you, ${rec.name}. Your test drive of the <strong>${rec.vehicle}</strong> is booked for:</p>
        <div class="card" style="background:var(--bg-alt);padding:18px;margin:16px 0">
          <div><strong>${A.fmt.date(rec.date)}</strong> at <strong>${rec.time}</strong></div>
          <div class="muted" style="font-size:.9rem">${rec.dealer} Showroom</div>
        </div>
        <p class="muted">A confirmation has been sent to ${rec.email}. We look forward to welcoming you.</p>
        <div class="flex" style="gap:10px;justify-content:center">
          <button class="btn btn--gold" onclick="Prestige.modal.close()">Done</button>
          <a class="btn btn--outline" href="inventory.html">Browse More</a>
        </div>
      </div>`);
    e.target.reset();
  });
})();
