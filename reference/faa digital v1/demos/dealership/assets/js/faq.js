/* =============================================================
   PRESTIGE MOTORS — FAQ page logic
   ============================================================= */
(function () {
  "use strict";
  const A = window.Prestige;
  const faqs = [
    { q: "Do you offer finance on all vehicles?", a: "Yes. We arrange Hire Purchase and Personal Contract Plans across our entire inventory, with rates from 0% APR for qualifying customers. Use our finance calculator for an instant estimate." },
    { q: "Can I part-exchange my current car?", a: "Absolutely. Our trade-in tool provides an indicative valuation in seconds, and we offer an enhanced bonus when you upgrade with us. A final figure follows a physical inspection." },
    { q: "Are your used vehicles inspected?", a: "Every vehicle passes a 150-point inspection covering drivetrain, brakes, electronics, and cosmetics before it reaches our showroom floor." },
    { q: "Do you deliver nationwide?", a: "Yes — we deliver anywhere in mainland UK, fully detailed and fuelled, with a personal handover at your door." },
    { q: "What warranty is included?", a: "New vehicles carry the full manufacturer warranty. Certified pre-owned cars include our 12-month Prestige Warranty, extendable to five years." },
    { q: "Can I book a test drive online?", a: "Yes. Use our test drive page to choose a vehicle, showroom, date, and time slot. Confirmation is instant." },
    { q: "Do you accept international buyers?", a: "We regularly assist overseas clients with export documentation, shipping, and VAT handling. Contact our concierge for details." },
    { q: "How do I sell my car to you without buying?", a: "We purchase quality vehicles outright. Submit a trade-in enquiry and our buyers will arrange a valuation appointment." }
  ];
  const acc = A.qs("#faq");
  faqs.forEach((f, i) => {
    const item = A.el("div", { class: "accordion__item" + (i === 0 ? " open" : "") });
    item.innerHTML = `
      <button class="accordion__q">${f.q}<span class="ico">+</span></button>
      <div class="accordion__a"><p>${f.a}</p></div>`;
    acc.appendChild(item);
    const q = A.qs(".accordion__q", item);
    const a = A.qs(".accordion__a", item);
    if (i === 0) a.style.maxHeight = a.scrollHeight + "px";
    q.addEventListener("click", () => {
      const open = item.classList.contains("open");
      // close all
      A.qsa(".accordion__item").forEach(it => { it.classList.remove("open"); A.qs(".accordion__a", it).style.maxHeight = null; });
      if (!open) { item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
    });
  });
})();
