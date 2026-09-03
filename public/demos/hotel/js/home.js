/* Home page dynamic content */
(function () {
  'use strict';

  const AMENITIES = [
    { ico: '🏊', title: 'Infinity Pool', desc: 'An edge-less pool blending into the ocean horizon.' },
    { ico: '🌿', title: 'Serenity Spa', desc: 'Holistic treatments inspired by the sea and botanicals.' },
    { ico: '🍽️', title: 'Fine Dining', desc: 'Michelin-led restaurant with seasonal tasting menus.' },
    { ico: '🏖️', title: 'Private Beach', desc: 'Exclusive access to a pristine, quiet shoreline.' },
    { ico: '💪', title: 'Fitness Studio', desc: 'State-of-the-art equipment and personal training.' },
    { ico: '🥂', title: 'Horizon Bar', desc: 'Craft cocktails with panoramic sunset views.' },
    { ico: '🚐', title: 'Airport Transfer', desc: 'Luxury chauffeur service on request.' },
    { ico: '🧑‍💼', title: '24/7 Concierge', desc: 'Whatever you need, whenever you need it.' }
  ];

  const FAQS = [
    { q: 'What are the check-in and check-out times?', a: 'Check-in begins at 3:00 PM and check-out is at 12:00 PM. Early and late options are available on request.' },
    { q: 'Is breakfast included in the room rate?', a: 'Selected room categories include daily breakfast. You can confirm inclusion during booking.' },
    { q: 'Do you offer airport transportation?', a: 'Yes, our concierge can arrange private luxury transfers to and from the airport.' },
    { q: 'Are pets allowed at the resort?', a: 'Well-behaved pets are welcome in designated rooms with a small cleaning fee. Please notify us in advance.' },
    { q: 'Can I host an event or wedding?', a: 'Absolutely. We offer elegant venues and a dedicated events team for weddings and celebrations.' }
  ];

  function renderRooms() {
    const el = document.getElementById('rooms-preview');
    if (!el) return;
    const rooms = AuroraStore.getCollection('rooms').filter((r) => r.featured).slice(0, 3);
    el.innerHTML = rooms
      .map(
        (r) => `
      <article class="card reveal">
        <div class="card-img"><img src="${r.image}" alt="${r.name}" onerror="this.src='images/placeholder.jpg'"></div>
        <div class="card-body">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 class="card-title">${r.name}</h3>
            <span class="badge badge-gold">${r.type}</span>
          </div>
          <p class="card-text">${r.description}</p>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px;">
            <span class="text-gold" style="font-weight:700;">${AuroraUI.money(r.price)}<small style="color:var(--text-mute); font-weight:400;"> / night</small></span>
            <a href="rooms.html" class="btn btn-outline btn-sm">Details</a>
          </div>
        </div>
      </article>`
      )
      .join('');
  }

  function renderAmenities() {
    const el = document.getElementById('amenities-grid');
    if (!el) return;
    el.innerHTML = AMENITIES.map(
      (a) => `
      <div class="amenity reveal">
        <div class="ico">${a.ico}</div>
        <h4>${a.title}</h4>
        <p>${a.desc}</p>
      </div>`
    ).join('');
  }

  function renderGallery() {
    const el = document.getElementById('gallery-preview');
    if (!el) return;
    const items = AuroraStore.getCollection('gallery').slice(0, 6);
    el.innerHTML = items
      .map(
        (g) => `
      <div class="m-item" data-lightbox data-src="${g.src}" data-title="${g.title}">
        <img src="${g.src}" alt="${g.title}" onerror="this.src='images/placeholder.jpg'">
        <div class="overlay"><h4>${g.title}</h4></div>
      </div>`
      )
      .join('');
  }

  function renderReviews() {
    const el = document.getElementById('reviews-preview');
    if (!el) return;
    const reviews = AuroraStore.getCollection('reviews').filter((r) => r.status === 'approved').slice(0, 3);
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

  function renderFaq() {
    const el = document.getElementById('faq-list');
    if (!el) return;
    el.innerHTML = FAQS.map(
      (f) => `
      <div class="faq-item">
        <div class="faq-q">${f.q}<span class="plus">+</span></div>
        <div class="faq-a"><p style="padding-top:14px;">${f.a}</p></div>
      </div>`
    ).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderRooms();
    renderAmenities();
    renderGallery();
    renderReviews();
    renderFaq();
    AuroraUI.initReveal();
    AuroraUI.initLightbox();
    AuroraUI.initFaq();
  });
})();
