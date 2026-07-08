/* =========================================================
   FAA DIGITAL — MAIN JS
   1. Nav scroll state + mobile toggle
   2. Cursor spotlight (hero signature element)
   3. Scroll reveal (IntersectionObserver)
   4. Animated counters
   5. FAQ accordion
   6. Contact form (front-end only — wire to your backend / form service)
   7. Footer year
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCursorGlow();
  initScrollReveal();
  initCounters();
  initAccordion();
  initContactForm();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ---------- 1. NAV ---------- */
function initNav() {
  const nav = document.getElementById('siteNav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.classList.toggle('is-active', isOpen);
  });

  // Close mobile menu after tapping a link
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- 2. CURSOR SPOTLIGHT ---------- */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  const hero = document.querySelector('.hero');
  if (!glow || !hero || window.matchMedia('(pointer: coarse)').matches) return;

  hero.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
    glow.classList.add('is-active');
  });

  hero.addEventListener('mouseleave', () => {
    glow.classList.remove('is-active');
  });
}

/* ---------- 3. SCROLL REVEAL ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');

  // Give each item in a grid a small stagger index for a subtle cascade
  ['.services-grid', '.portfolio-grid', '.pricing-grid'].forEach((selector) => {
    document.querySelectorAll(`${selector} [data-reveal]`).forEach((el, i) => {
      el.style.setProperty('--i', i);
    });
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

/* ---------- 4. ANIMATED COUNTERS ---------- */
function initCounters() {
  const counters = document.querySelectorAll('.num[data-count]');
  if (!counters.length) return;

  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.round(target * eased);
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ---------- 5. FAQ ACCORDION ---------- */
function initAccordion() {
  const triggers = document.querySelectorAll('.accordion__trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      const panel = item.querySelector('.accordion__panel');
      const isOpen = item.classList.contains('is-open');

      // Close all other panels for a single-open accordion feel
      document.querySelectorAll('.accordion__item.is-open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
          openItem.querySelector('.accordion__panel').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });
}

/* ---------- 6. CONTACT FORM ----------
   To go live, set FORM_ENDPOINT below to your Formspree / Getform / Basin
   endpoint (e.g. "https://formspree.io/f/xxxxxxx"). Until an endpoint is
   set, the form falls back to opening the visitor's email client with the
   message pre-filled, so nothing is ever silently lost. */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form) return;

  const FORM_ENDPOINT = ''; // e.g. 'https://formspree.io/f/your-id'
  const FALLBACK_EMAIL = 'hello@faadigital.com';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      note.textContent = 'Please fill in all required fields before sending.';
      note.style.color = '#c0c0c0';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error('Form endpoint returned an error');
        note.textContent = "Thanks — your message is in. We'll reply within one business day.";
        form.reset();
      } else {
        // Fallback: open a pre-filled email so the enquiry is never lost.
        const subject = encodeURIComponent(`New project enquiry — ${data.name || ''}`);
        const body = encodeURIComponent(
          `Name: ${data.name || ''}\nEmail: ${data.email || ''}\nProject type: ${data.project || ''}\nBudget: ${data.budget || ''}\n\nDetails:\n${data.message || ''}`
        );
        window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
        note.textContent = "Opening your email app to send the enquiry to FAA Digital…";
        form.reset();
      }
    } catch (err) {
      note.textContent = `Something went wrong. Please email us directly at ${FALLBACK_EMAIL}.`;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}
