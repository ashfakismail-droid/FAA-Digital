/* Admin login */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    AuroraUI.initTheme();
    AuroraUI.initImageFallback();
    AuroraUI.bindModals();

    const form = document.getElementById('login-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('[required]').forEach((inp) => {
        const err = inp.parentElement.querySelector('.field-error');
        if (!inp.value.trim()) { ok = false; if (err) err.classList.add('show'); }
        else if (err) err.classList.remove('show');
      });
      if (!ok) return;

      const okLogin = AuroraStore.login(form.username.value.trim(), form.password.value);
      if (okLogin) {
        AuroraUI.toast('Welcome back', 'Redirecting to dashboard…', 'success');
        setTimeout(() => (location.href = 'dashboard.html'), 600);
      } else {
        AuroraUI.toast('Login failed', 'Invalid username or password.', 'error');
      }
    });
  });
})();
