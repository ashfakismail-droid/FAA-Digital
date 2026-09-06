/* =============================================================
   PRESTIGE MOTORS — Contact page logic
   ============================================================= */
(function () {
  "use strict";
  const A = window.Prestige;
  A.qs("#contactForm").addEventListener("submit", e => {
    e.preventDefault();
    const rec = {
      id: Date.now(), name: A.qs("#cName").value, email: A.qs("#cEmail").value,
      dept: A.qs("#cDept").value, phone: A.qs("#cPhone").value, msg: A.qs("#cMsg").value,
      date: new Date().toISOString()
    };
    A.store.addInquiry(rec);
    A.modal.open(`
      <div style="text-align:center">
        <div style="font-size:3rem">✉️</div>
        <h2 style="margin:10px 0">Message Sent</h2>
        <p class="muted">Thank you, ${rec.name}. Our ${rec.dept} team will be in touch shortly.</p>
        <button class="btn btn--gold" onclick="Prestige.modal.close()">Close</button>
      </div>`);
    e.target.reset();
  });
})();
