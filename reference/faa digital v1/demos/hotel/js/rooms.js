/* Rooms page: filter, booking modal, validation */
(function () {
  'use strict';

  let currentFilter = 'all';

  function statusBadge(status) {
    const map = { available: 'badge-green', booked: 'badge-red', maintenance: 'badge-gray' };
    return `<span class="badge ${map[status] || 'badge-gray'}">${status}</span>`;
  }

  function render() {
    const grid = document.getElementById('rooms-grid');
    if (!grid) return;
    const rooms = AuroraStore.getCollection('rooms').filter(
      (r) => currentFilter === 'all' || r.type === currentFilter
    );
    grid.innerHTML = rooms
      .map(
        (r) => `
      <article class="card reveal">
        <div class="card-img">
          <img src="${r.image}" alt="${r.name}" onerror="this.src='images/placeholder.jpg'">
          ${r.featured ? '<span class="badge badge-gold" style="position:absolute; top:14px; left:14px;">Featured</span>' : ''}
        </div>
        <div class="card-body">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
            <h3 class="card-title">${r.name}</h3>
            ${statusBadge(r.status)}
          </div>
          <p class="card-text">${r.description}</p>
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin:12px 0;">
            ${r.amenities.map((a) => `<span class="badge badge-gray">${a}</span>`).join('')}
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="text-gold" style="font-weight:700; font-size:18px;">${AuroraUI.money(r.price)}<small style="color:var(--text-mute); font-weight:400;"> / night</small></span>
            <button class="btn btn-gold btn-sm" data-book-room="${r.id}">Book Now</button>
          </div>
        </div>
      </article>`
      )
      .join('');
    bindBookButtons();
    AuroraUI.initReveal();
  }

  function bindBookButtons() {
    document.querySelectorAll('[data-book-room]').forEach((b) =>
      b.addEventListener('click', () => openBooking(b.getAttribute('data-book-room')))
    );
  }

  function openBooking(roomId) {
    const sel = document.getElementById('book-room-type');
    const rooms = AuroraStore.getCollection('rooms');
    sel.innerHTML = rooms
      .map((r) => `<option value="${r.id}" ${r.id === roomId ? 'selected' : ''}>${r.name} — ${AuroraUI.money(r.price)}</option>`)
      .join('');
    AuroraUI.openModal('booking-modal');
  }

  function initFilters() {
    document.querySelectorAll('#room-filters .filter-tab').forEach((tab) =>
      tab.addEventListener('click', () => {
        document.querySelectorAll('#room-filters .filter-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.getAttribute('data-filter');
        render();
      })
    );
  }

  function initForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('[required]').forEach((inp) => {
        const err = inp.parentElement.querySelector('.field-error');
        let valid = inp.value.trim() !== '';
        if (inp.type === 'email') valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inp.value);
        if (!valid) { ok = false; if (err) err.classList.add('show'); }
        else if (err) err.classList.remove('show');
      });
      const ci = form.checkIn.value, co = form.checkOut.value;
      if (ci && co && new Date(co) <= new Date(ci)) {
        ok = false;
        form.checkOut.parentElement.querySelector('.field-error').classList.add('show');
        AuroraUI.toast('Invalid dates', 'Check-out must be after check-in.', 'error');
      }
      if (!ok) return;

      const room = AuroraStore.getById('rooms', form.roomType.value);
      const nights = Math.max(1, Math.round((new Date(co) - new Date(ci)) / 86400000));
      const total = (room ? room.price : 0) * nights;
      const booking = {
        id: AuroraStore.uid('BK'),
        guest: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        roomId: form.roomType.value,
        checkIn: ci,
        checkOut: co,
        adults: +form.adults.value,
        children: +form.children.value,
        requests: form.requests.value,
        status: 'pending',
        payment: 'Unpaid',
        total
      };
      AuroraStore.insert('reservations', booking);
      AuroraUI.closeModal('booking-modal');
      AuroraUI.toast('Reservation Received', `Booking ${booking.id} is pending confirmation.`, 'success');
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    render();
    initFilters();
    initForm();
  });
})();
