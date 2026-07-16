/* =============================================================
   PRESTIGE MOTORS — Wishlist page logic
   ============================================================= */
(function () {
  "use strict";
  const A = window.Prestige;
  const vehicles = A.store.getVehicles();
  const ids = A.store.getWishlist();
  const grid = A.qs("#wishGrid");
  const empty = A.qs("#wishEmpty");

  if (!ids.length) { empty.classList.remove("hidden"); return; }
  empty.classList.add("hidden");

  ids.map(id => vehicles.find(v => v.id === id)).filter(Boolean).forEach(v => {
    const card = A.vehicleCard(v);
    grid.appendChild(card);
  });
  A.reveal();
})();
