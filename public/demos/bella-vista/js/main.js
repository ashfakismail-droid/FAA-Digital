document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initMenuTabs();
  initReservationForm();
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
  const dateInput = document.getElementById('r-date');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];
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

function initReservationForm() {
  const form = document.getElementById('reserveForm');
  const note = document.getElementById('reserveNote');
  if (!form) return;

  // To go live, set FORM_ENDPOINT to a Formspree/Getform endpoint.
  const FORM_ENDPOINT = '';
  const FALLBACK_EMAIL = 'hello@bellavistaristorante.com';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      note.textContent = 'Please fill in all required fields to reserve.';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const original = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Confirming…';

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error('bad response');
        note.textContent = `Thank you, ${data.name}! Your table for ${data.guests} on ${data.date} is being confirmed.`;
        form.reset();
      } else {
        const subject = encodeURIComponent(`Reservation request — ${data.name}`);
        const body = encodeURIComponent(
          `Name: ${data.name}\nPhone: ${data.phone}\nDate: ${data.date}\nTime: ${data.time}\nGuests: ${data.guests}\nOccasion: ${data.occasion || 'N/A'}\nNotes: ${data.notes || 'N/A'}`
        );
        window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
        note.textContent = 'Opening your email app to send this reservation request…';
        form.reset();
      }
    } catch (err) {
      note.textContent = `Something went wrong. Please call us to confirm your table.`;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = original;
    }
  });
}
