/* Admin reservations: search, filter, status update, view */
(function () {
  'use strict';

  let table;

  function statusBadge(s) {
    const map = {
      confirmed: 'badge-green', pending: 'badge-gold',
      'checked-in': 'badge-blue', 'checked-out': 'badge-gray', cancelled: 'badge-red'
    };
    return `<span class="badge ${map[s] || 'badge-gray'}">${s}</span>`;
  }
  function payBadge(p) {
    return p === 'Paid' ? '<span class="badge badge-green">Paid</span>' : '<span class="badge badge-gold">Unpaid</span>';
  }

  function renderRow(r) {
    const room = AuroraStore.getById('rooms', r.roomId);
    return `<tr>
      <td class="cell-strong">${r.id}</td>
      <td>${r.guest}<div class="text-mute" style="font-size:12px;">${r.email}</div></td>
      <td>${room ? room.name : '—'}</td>
      <td>${AuroraUI.formatDate(r.checkIn)}<br><span class="text-mute" style="font-size:12px;">→ ${AuroraUI.formatDate(r.checkOut)}</span></td>
      <td>${statusBadge(r.status)}</td>
      <td>${payBadge(r.payment)}</td>
      <td>
        <div class="row-actions">
          <button class="icon-action" data-view="${r.id}" title="View">👁</button>
          <button class="icon-action danger" data-del="${r.id}" title="Delete">🗑</button>
        </div>
      </td>
    </tr>`;
  }

  function load() {
    table.setData(AuroraStore.getCollection('reservations'));
  }

  function openView(id) {
    const r = AuroraStore.getById('reservations', id);
    if (!r) return;
    const room = AuroraStore.getById('rooms', r.roomId);
    const body = document.getElementById('res-modal-body');
    body.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:14px;">
        <div class="flex-between"><span class="text-dim">Booking ID</span><b>${r.id}</b></div>
        <div class="flex-between"><span class="text-dim">Guest</span><b>${r.guest}</b></div>
        <div class="flex-between"><span class="text-dim">Email</span><span>${r.email}</span></div>
        <div class="flex-between"><span class="text-dim">Phone</span><span>${r.phone}</span></div>
        <div class="flex-between"><span class="text-dim">Room</span><b>${room ? room.name : '—'}</b></div>
        <div class="flex-between"><span class="text-dim">Check-in</span><span>${AuroraUI.formatDate(r.checkIn)}</span></div>
        <div class="flex-between"><span class="text-dim">Check-out</span><span>${AuroraUI.formatDate(r.checkOut)}</span></div>
        <div class="flex-between"><span class="text-dim">Guests</span><span>${r.adults} adults, ${r.children} children</span></div>
        <div class="flex-between"><span class="text-dim">Status</span>${statusBadge(r.status)}</div>
        <div class="flex-between"><span class="text-dim">Payment</span>${payBadge(r.payment)}</div>
        <div class="flex-between"><span class="text-dim">Total</span><b class="text-gold">${AuroraUI.money(r.total)}</b></div>
        ${r.requests ? `<div><span class="text-dim">Requests:</span><p class="text-dim" style="margin-top:6px;">${r.requests}</p></div>` : ''}
        <div class="form-group" style="margin-top:8px;">
          <label>Update Status</label>
          <select id="res-status-select">
            <option ${r.status === 'pending' ? 'selected' : ''}>pending</option>
            <option ${r.status === 'confirmed' ? 'selected' : ''}>confirmed</option>
            <option ${r.status === 'checked-in' ? 'selected' : ''}>checked-in</option>
            <option ${r.status === 'checked-out' ? 'selected' : ''}>checked-out</option>
            <option ${r.status === 'cancelled' ? 'selected' : ''}>cancelled</option>
          </select>
        </div>
        <button class="btn btn-gold btn-block" id="res-save-status">Save Status</button>
      </div>`;
    document.getElementById('res-save-status').addEventListener('click', () => {
      AuroraStore.update('reservations', id, { status: document.getElementById('res-status-select').value });
      AuroraUI.toast('Updated', 'Reservation status changed.', 'success');
      AuroraUI.closeModal('res-modal');
      load();
    });
    AuroraUI.openModal('res-modal');
  }

  function initToolbar() {
    document.getElementById('res-filter').addEventListener('change', (e) => {
      const v = e.target.value;
      const all = AuroraStore.getCollection('reservations');
      table.setData(v === 'all' ? all : all.filter((r) => r.status === v));
    });
  }

  function bindRowActions() {
    document.querySelectorAll('[data-view]').forEach((b) =>
      b.addEventListener('click', () => openView(b.getAttribute('data-view')))
    );
    document.querySelectorAll('[data-del]').forEach((b) =>
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-del');
        AuroraAdmin.confirmDelete('Delete this reservation?', () => {
          AuroraStore.remove('reservations', id);
          AuroraUI.toast('Deleted', 'Reservation removed.', 'success');
          load();
        });
      })
    );
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!AuroraAdmin.guard()) return;
    AuroraUI.initTheme();
    AuroraUI.bindModals();
    AuroraAdmin.injectSidebar();
    AuroraAdmin.injectTopbar('Reservations');

    table = AuroraAdmin.createTable({
      tbodyId: 'res-tbody',
      searchId: 'res-search',
      paginationId: 'res-pagination',
      pageSize: 7,
      colspan: 7,
      searchKeys: ['id', 'guest', 'email', 'status'],
      sortMap: {
        id: (a, b) => a.id.localeCompare(b.id),
        guest: (a, b) => a.guest.localeCompare(b.guest),
        checkIn: (a, b) => new Date(a.checkIn) - new Date(b.checkIn),
        status: (a, b) => a.status.localeCompare(b.status)
      },
      renderRow,
      onRender: bindRowActions
    });

    initToolbar();
    load();
  });
})();
