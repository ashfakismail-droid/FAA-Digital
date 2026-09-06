/* =============================================================
   PRESTIGE MOTORS — Admin login logic
   ============================================================= */
(function () {
  "use strict";
  const A = window.Prestige;
  // redirect if already logged in
  if (A.store.getAdmin().loggedIn) { location.href = "dashboard.html"; return; }

  A.qs("#loginForm").addEventListener("submit", e => {
    e.preventDefault();
    const u = A.qs("#u").value.trim();
    const p = A.qs("#p").value;
    // demo auth
    if (u === "admin" && p === "prestige") {
      A.store.login(u);
      A.toast("Welcome back", "success");
      location.href = "dashboard.html";
    } else {
      A.toast("Invalid credentials", "error");
    }
  });
})();
