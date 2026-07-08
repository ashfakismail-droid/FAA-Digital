document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initMenuTabs();
  initNewsletterForm();
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

function initNav() {
  const nav = document.getElementById('siteNav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.classList.toggle('is-active', isOpen);
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initScrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  document.querySelectorAll('.stagger').forEach((group) => {
    group.querySelectorAll('[data-reveal]').forEach((el, i) => el.style.setProperty('--i', i));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      document.querySelectorAll('.menu-panel').forEach((p) => { p.classList.remove('is-active'); p.hidden = true; });

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(`panel-${tab.dataset.tab}`);
      if (panel) { panel.classList.add('is-active'); panel.hidden = false; }
    });
  });
}

function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  const note = document.getElementById('newsletterNote');
  if (!form) return;

  // To go live, set FORM_ENDPOINT to a Mailchimp/Formspree endpoint.
  const FORM_ENDPOINT = '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      note.textContent = 'Please enter a valid email address.';
      return;
    }

    const email = form.querySelector('#nl-email').value;

    if (FORM_ENDPOINT) {
      try {
        await fetch(FORM_ENDPOINT, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        note.textContent = `Thanks — ${email} is on the list!`;
      } catch {
        note.textContent = 'Something went wrong. Please try again shortly.';
      }
    } else {
      note.textContent = `Thanks — ${email} is on the list!`;
    }
    form.reset();
  });
}
