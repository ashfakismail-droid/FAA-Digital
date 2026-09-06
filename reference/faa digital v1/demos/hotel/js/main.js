/* ============================================================
   Aurora Grand Resort — Public site shared behaviour
   Header scroll state, mobile nav, theme toggle, common init.
   ============================================================ */
(function () {
  'use strict';

  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const burger = document.querySelector('.hamburger');
    const links = document.querySelector('.nav-links');
    if (burger && links) {
      burger.addEventListener('click', () => links.classList.toggle('open'));
      links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => links.classList.remove('open')));
    }
  }

  function initThemeToggle() {
    document.querySelectorAll('[data-theme-toggle]').forEach((b) =>
      b.addEventListener('click', () => AuroraUI.toggleTheme())
    );
  }

  function initNewsletter() {
    document.querySelectorAll('[data-newsletter]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]');
        if (!email.value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
          AuroraUI.toast('Invalid email', 'Please enter a valid email address.', 'error');
          return;
        }
        AuroraUI.toast('Subscribed!', 'Thank you for joining our newsletter.', 'success');
        form.reset();
      });
    });
  }

  function initBookNowButtons() {
    document.querySelectorAll('[data-book]').forEach((b) =>
      b.addEventListener('click', () => {
        const target = b.getAttribute('data-book');
        if (target) location.href = target;
      })
    );
  }

  function injectComponents() {
    const h = document.querySelector('[data-header]');
    if (h && window.AuroraComponents) h.innerHTML = AuroraComponents.header('');
    const f = document.querySelector('[data-footer]');
    if (f && window.AuroraComponents) f.innerHTML = AuroraComponents.footer('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectComponents();
    AuroraUI.initImageFallback();
    AuroraUI.initTheme();
    AuroraUI.bindModals();
    AuroraUI.initReveal();
    AuroraUI.initLightbox();
    AuroraUI.initFaq();
    initHeader();
    initThemeToggle();
    initNewsletter();
    initBookNowButtons();

    // active nav link based on current file
    const file = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((a) => {
      const href = a.getAttribute('href');
      if (href === file || (file === 'index.html' && href === './')) a.classList.add('active');
    });
  });
})();
