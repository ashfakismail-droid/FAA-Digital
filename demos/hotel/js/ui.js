/* ============================================================
   Aurora Grand Resort — Shared UI Utilities
   Toast notifications, modal windows, theme toggle, reveal
   animations, and small DOM helpers. Used by public + admin.
   ============================================================ */
(function (global) {
  'use strict';

  /* ---------- Toast ---------- */
  function toast(title, msg, type) {
    let wrap = document.querySelector('.toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'toast-wrap';
      document.body.appendChild(wrap);
    }
    const el = document.createElement('div');
    el.className = 'toast' + (type ? ' ' + type : '');
    el.innerHTML = `<div class="t-title">${title}</div>${msg ? `<div class="t-msg">${msg}</div>` : ''}`;
    wrap.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity .3s, transform .3s';
      el.style.opacity = '0';
      el.style.transform = 'translateX(120%)';
      setTimeout(() => el.remove(), 320);
    }, 3200);
  }

  /* ---------- Modal ---------- */
  function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('open');
    document.body.style.overflow = '';
  }
  function bindModals() {
    document.querySelectorAll('[data-close-modal]').forEach((b) =>
      b.addEventListener('click', () => closeModal(b.getAttribute('data-close-modal')))
    );
    document.querySelectorAll('.modal-overlay').forEach((ov) => {
      ov.addEventListener('click', (e) => {
        if (e.target === ov) ov.classList.remove('open');
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach((m) => m.classList.remove('open'));
    });
  }

  /* ---------- Theme ---------- */
  function applyTheme(theme) {
    if (theme === 'light') document.body.classList.add('light');
    else document.body.classList.remove('light');
    localStorage.setItem('aurora_theme', theme);
    document.querySelectorAll('[data-theme-icon]').forEach((i) => {
      i.textContent = theme === 'light' ? '☀' : '☾';
    });
  }
  function initTheme() {
    const saved = localStorage.getItem('aurora_theme') || 'dark';
    applyTheme(saved);
  }
  function toggleTheme() {
    const next = document.body.classList.contains('light') ? 'dark' : 'light';
    applyTheme(next);
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Lightbox ---------- */
  function initLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb || lb.dataset.bound) return; // idempotent: bind controls once
    lb.dataset.bound = '1';
    const img = lb.querySelector('img');
    let items = [];
    let idx = 0;

    function show(i) {
      idx = (i + items.length) % items.length;
      img.src = items[idx].src;
      img.alt = items[idx].title || '';
    }
    document.querySelectorAll('[data-lightbox]').forEach((el) => {
      el.addEventListener('click', () => {
        items = Array.from(document.querySelectorAll('[data-lightbox]')).map((x) => ({
          src: x.getAttribute('data-src') || x.querySelector('img').src,
          title: x.getAttribute('data-title') || ''
        }));
        const cur = el.getAttribute('data-src') || el.querySelector('img').src;
        show(items.findIndex((it) => it.src === cur));
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    lb.querySelector('.lb-close').addEventListener('click', () => { lb.classList.remove('open'); document.body.style.overflow = ''; });
    lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
    lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) { lb.classList.remove('open'); document.body.style.overflow = ''; } });
  }

  /* ---------- FAQ ---------- */
  function initFaq() {
    document.querySelectorAll('.faq-item').forEach((item) => {
      const q = item.querySelector('.faq-q');
      if (q) q.addEventListener('click', () => item.classList.toggle('open'));
    });
  }

  /* ---------- Image fallback ----------
     Any <img> that fails to load is swapped to a branded SVG
     placeholder, so the demo looks intentional without binary assets. */
  const PLACEHOLDER =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
        <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#13233b"/><stop offset="1" stop-color="#0f1b2d"/>
        </linearGradient></defs>
        <rect width="800" height="600" fill="url(#g)"/>
        <circle cx="400" cy="250" r="46" fill="none" stroke="#c9a24b" stroke-width="3"/>
        <text x="400" y="266" font-family="Georgia,serif" font-size="44" fill="#c9a24b" text-anchor="middle">A</text>
        <text x="400" y="360" font-family="Inter,sans-serif" font-size="26" fill="#e8eef6" text-anchor="middle">Aurora Grand Resort</text>
        <text x="400" y="396" font-family="Inter,sans-serif" font-size="15" fill="#9fb0c3" text-anchor="middle">Image Placeholder</text>
      </svg>`
    );

  function initImageFallback() {
    document.addEventListener(
      'error',
      function (e) {
        const t = e.target;
        if (t && t.tagName === 'IMG' && t.src !== PLACEHOLDER) {
          t.src = PLACEHOLDER;
        }
      },
      true
    );
  }

  /* ---------- Currency ----------
     Central price formatter. All prices across the site must go through
     AuroraUI.money() so the currency symbol stays consistent and updatable.
     The selected currency is stored in localStorage and persists on refresh. */
  const CURRENCIES = {
    USD: { symbol: '$', label: 'US Dollar' },
    EUR: { symbol: '€', label: 'Euro' },
    GBP: { symbol: '£', label: 'British Pound' },
    INR: { symbol: '₹', label: 'Indian Rupee' },
    AED: { symbol: 'د.إ', label: 'UAE Dirham' },
    SAR: { symbol: '﷼', label: 'Saudi Riyal' },
    JPY: { symbol: '¥', label: 'Japanese Yen' }
  };
  const CURRENCY_KEY = 'aurora_currency';

  function getCurrency() {
    const c = localStorage.getItem(CURRENCY_KEY);
    return CURRENCIES[c] ? c : 'USD';
  }
  function setCurrency(code) {
    if (CURRENCIES[code]) localStorage.setItem(CURRENCY_KEY, code);
  }
  function money(n) {
    const sym = (CURRENCIES[getCurrency()] || CURRENCIES.USD).symbol;
    return sym + Number(n).toLocaleString('en-US');
  }
  function stars(n) {
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function formatDate(d) {
    const dt = new Date(d);
    if (isNaN(dt)) return d;
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  function debounce(fn, ms) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), ms);
    };
  }

  global.AuroraUI = {
    toast, openModal, closeModal, bindModals,
    applyTheme, initTheme, toggleTheme,
    initReveal, initLightbox, initFaq, initImageFallback,
    money, stars, escapeHtml, formatDate, debounce, PLACEHOLDER,
    CURRENCIES, CURRENCY_KEY, getCurrency, setCurrency
  };
})(window);
