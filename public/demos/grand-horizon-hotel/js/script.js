const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const loader = document.querySelector('.page-loader');
const header = document.querySelector('.site-header');
const revealItems = document.querySelectorAll('.reveal');
const galleryButtons = document.querySelectorAll('.gallery-card');
const modal = document.querySelector('.gallery-modal');
const modalTitle = document.querySelector('.modal-title');
const modalDesc = document.querySelector('.modal-desc');
const modalClose = document.querySelector('.modal-close');
const form = document.querySelector('.booking-form');
const statusMessage = document.querySelector('.form-status');
const counters = document.querySelectorAll('[data-counter]');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

const updateActiveLink = () => {
  const sections = document.querySelectorAll('main section[id]');
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
      document.querySelectorAll('.nav-links a').forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    }
  });
};

const animateCounters = () => {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter || 0);
    const duration = 1000;
    const startTime = performance.now();

    const step = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const current = Math.floor(progress * target);
      counter.textContent = current;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  });
};

window.addEventListener('scroll', () => {
  const isScrolled = window.scrollY > 600;
  backToTop.classList.toggle('visible', isScrolled);
  header.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveLink();
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('load', () => {
  setTimeout(() => {
    loader?.classList.add('hidden');
    setTimeout(() => loader?.remove(), 400);
  }, 950);
  animateCounters();
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
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

galleryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modalTitle.textContent = button.dataset.title || 'Grand Horizon Experience';
    modalDesc.textContent = button.dataset.desc || 'Luxury details crafted for unforgettable stays.';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  });
});

modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

function closeModal() {
  modal?.classList.remove('active');
  modal?.setAttribute('aria-hidden', 'true');
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name')?.toString().trim() || '';
  const email = formData.get('email')?.toString().trim() || '';
  const phone = formData.get('phone')?.toString().trim() || '';
  const checkin = formData.get('checkin')?.toString() || '';
  const checkout = formData.get('checkout')?.toString() || '';
  const guests = formData.get('guests')?.toString() || '';
  const room = formData.get('room')?.toString() || '';

  if (!name || !email || !phone || !checkin || !checkout || !guests || !room) {
    statusMessage.textContent = 'Please complete all required fields to request your booking.';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    statusMessage.textContent = 'Please enter a valid email address.';
    return;
  }

  if (new Date(checkout) <= new Date(checkin)) {
    statusMessage.textContent = 'Check-out must be after check-in.';
    return;
  }

  statusMessage.textContent = `Thank you, ${name}. Your request has been received and our team will contact you shortly.`;
  form.reset();
});

updateActiveLink();
