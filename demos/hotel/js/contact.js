/* Contact page: booking, reviews, attractions, faq, review modal */
(function () {
  'use strict';

  const ATTRACTIONS = [
    { ico: '⛵', title: 'Monterey Marina', desc: 'Scenic harbor with boat tours, 10 min away.' },
    { ico: '🐠', title: 'Aquarium', desc: 'World-famous ocean exhibits, 15 min drive.' },
    { ico: '🌲', title: 'Coastal Trails', desc: 'Cliffside hiking with ocean vistas.' },
    { ico: '🍷', title: 'Wine Country', desc: 'Boutique vineyards within 30 minutes.' }
  ];

  const FAQS = [
    { q: 'What is your cancellation policy?', a: 'Free cancellation up to 48 hours before arrival. Later cancellations incur one night’s charge.' },
    { q: 'Do you accommodate dietary requirements?', a: 'Yes. Our kitchen caters to vegetarian, vegan, gluten-free, and allergy-specific needs — just let us know.' },
    { q: 'Is parking available?', a: 'Complimentary valet parking is available for all registered guests.' },
    { q: 'Can I modify my reservation later?', a: 'Absolutely. Contact our concierge or use the admin panel if you manage bookings.' }
  ];

  function validate(form) {
    let ok = true;
    form.querySelectorAll('[required]').forEach((inp) => {
      const err = inp.parentElement.querySelector('.field-error');
      let valid = inp.value.trim() !== '';
      if (inp.type === 'email') valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inp.value);
      if (!valid) { ok = false; if (err) err.classList.add('show'); }
      else if (err) err.classList.remove('show');
    });
    return ok;
  }

  function initBooking() {
    const sel = document.getElementById('contact-room');
    sel.innerHTML = AuroraStore.getCollection('rooms')
      .map((r) => `<option value="${r.name}">${r.name}</option>`)
      .join('');
    const form = document.getElementById('contact-booking');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate(form)) return;
      const ci = form.checkIn.value, co = form.checkOut.value;
      if (ci && co && new Date(co) <= new Date(ci)) {
        AuroraUI.toast('Invalid dates', 'Check-out must be after check-in.', 'error');
        return;
      }
      const room = AuroraStore.getCollection('rooms').find((r) => r.name === form.roomType.value);
      const nights = Math.max(1, Math.round((new Date(co) - new Date(ci)) / 86400000));
      AuroraStore.insert('reservations', {
        id: AuroraStore.uid('BK'),
        guest: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        roomId: room ? room.id : '',
        checkIn: ci,
        checkOut: co,
        adults: +form.adults.value,
        children: +form.children.value,
        requests: form.requests.value,
        status: 'pending',
        payment: 'Unpaid',
        total: (room ? room.price : 0) * nights
      });
      AuroraUI.toast('Request Sent', 'We will confirm your stay shortly.', 'success');
      form.reset();
    });
  }

  function renderReviews() {
    const el = document.getElementById('contact-reviews');
    const reviews = AuroraStore.getCollection('reviews').filter((r) => r.status === 'approved');
    el.innerHTML = reviews
      .map(
        (r) => `
      <div class="testimonial reveal">
        <div class="stars">${AuroraUI.stars(r.rating)}</div>
        <p>"${r.comment}"</p>
        <div class="who">
          <div class="avatar">${r.name.charAt(0)}</div>
          <div><div class="name">${r.name}</div><div class="room">${r.room}</div></div>
        </div>
      </div>`
      )
      .join('');
  }

  function initReviewModal() {
    document.getElementById('add-review-btn').addEventListener('click', () => AuroraUI.openModal('review-modal'));
    const form = document.getElementById('review-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate(form)) return;
      AuroraStore.insert('reviews', {
        id: AuroraStore.uid('RV'),
        name: form.name.value,
        room: form.room.value,
        rating: +form.rating.value,
        comment: form.comment.value,
        date: new Date().toISOString().slice(0, 10),
        status: 'pending'
      });
      AuroraUI.closeModal('review-modal');
      AuroraUI.toast('Thank You!', 'Your review is pending approval.', 'success');
      form.reset();
    });
  }

  function renderAttractions() {
    document.getElementById('attractions').innerHTML = ATTRACTIONS.map(
      (a) => `
      <div class="amenity reveal">
        <div class="ico">${a.ico}</div>
        <h4>${a.title}</h4>
        <p>${a.desc}</p>
      </div>`
    ).join('');
  }

  function renderFaq() {
    document.getElementById('contact-faq').innerHTML = FAQS.map(
      (f) => `
      <div class="faq-item">
        <div class="faq-q">${f.q}<span class="plus">+</span></div>
        <div class="faq-a"><p style="padding-top:14px;">${f.a}</p></div>
      </div>`
    ).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    initBooking();
    renderReviews();
    initReviewModal();
    renderAttractions();
    renderFaq();
    AuroraUI.initReveal();
    AuroraUI.initFaq();
  });
})();
