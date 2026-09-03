/* Admin rooms management: CRUD + search + filter + pagination */
(function () {
  'use strict';

  let table;

  function statusBadge(s) {
    const map = { available: 'badge-green', booked: 'badge-red', maintenance: 'badge-gray' };
    return `<span class="badge ${map[s] || 'badge-gray'}">${s}</span>`;
  }

  function renderRow(r) {
    return `<tr>
      <td class="cell-strong">${r.name}</td>
      <td>${r.type}</td>
      <td class="cell-strong">${AuroraUI.money(r.price)}</td>
      <td>${r.capacity} guests</td>
      <td>${statusBadge(r.status)}</td>
      <td>
        <div class="row-actions">
          <button class="icon-action" data-edit="${r.id}" title="Edit">✎</button>
          <button class="icon-action danger" data-del="${r.id}" title="Delete">🗑</button>
        </div>
      </td>
    </tr>`;
  }

  function load() {
    table.setData(AuroraStore.getCollection('rooms'));
  }

  function openModal(room) {
    const form = document.getElementById('room-form');
    form.reset();
    document.getElementById('room-modal-title').textContent = room ? 'Edit Room' : 'Add Room';
    if (room) {
      form.id.value = room.id;
      form.name.value = room.name;
      form.type.value = room.type;
      form.price.value = room.price;
      form.status.value = room.status;
      form.capacity.value = room.capacity;
      form.size.value = room.size;
      form.beds.value = room.beds;
      form.description.value = room.description;
      form.amenities.value = (room.amenities || []).join(', ');
      form.image.value = room.image;
      form.featured.checked = !!room.featured;
    } else {
      form.id.value = '';
    }
    AuroraUI.openModal('room-modal');
  }

  function initForm() {
    const form = document.getElementById('room-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('[required]').forEach((inp) => {
        const err = inp.parentElement.querySelector('.field-error');
        if (!String(inp.value).trim()) { ok = false; if (err) err.classList.add('show'); }
        else if (err) err.classList.remove('show');
      });
      if (!ok) return;

      const payload = {
        name: form.name.value,
        type: form.type.value,
        price: +form.price.value,
        status: form.status.value,
        capacity: +form.capacity.value,
        size: +form.size.value,
        beds: form.beds.value,
        description: form.description.value,
        amenities: form.amenities.value.split(',').map((s) => s.trim()).filter(Boolean),
        image: form.image.value || AuroraStore.base() + 'images/placeholder.jpg',
        featured: form.featured.checked
      };
      const id = form.id.value;
      if (id) {
        AuroraStore.update('rooms', id, payload);
        AuroraUI.toast('Room updated', payload.name + ' saved.', 'success');
      } else {
        payload.id = AuroraStore.uid('R');
        AuroraStore.insert('rooms', payload);
        AuroraUI.toast('Room added', payload.name + ' created.', 'success');
      }
      AuroraUI.closeModal('room-modal');
      load();
    });
  }

  function initToolbar() {
    document.getElementById('add-room-btn').addEventListener('click', () => openModal(null));
    document.getElementById('room-filter').addEventListener('change', (e) => {
      const v = e.target.value;
      const all = AuroraStore.getCollection('rooms');
      table.setData(v === 'all' ? all : all.filter((r) => r.status === v));
    });
  }

  function bindRowActions() {
    document.querySelectorAll('[data-edit]').forEach((b) =>
      b.addEventListener('click', () => {
        const r = AuroraStore.getById('rooms', b.getAttribute('data-edit'));
        if (r) openModal(r);
      })
    );
    document.querySelectorAll('[data-del]').forEach((b) =>
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-del');
        AuroraAdmin.confirmDelete('Delete this room?', () => {
          AuroraStore.remove('rooms', id);
          AuroraUI.toast('Room deleted', 'The room was removed.', 'success');
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
    AuroraAdmin.injectTopbar('Rooms');

    table = AuroraAdmin.createTable({
      tbodyId: 'rooms-tbody',
      searchId: 'room-search',
      paginationId: 'rooms-pagination',
      countId: null,
      pageSize: 6,
      colspan: 6,
      searchKeys: ['name', 'type', 'status'],
      sortMap: {
        name: (a, b) => a.name.localeCompare(b.name),
        type: (a, b) => a.type.localeCompare(b.type),
        price: (a, b) => a.price - b.price,
        status: (a, b) => a.status.localeCompare(b.status)
      },
      renderRow,
      onRender: bindRowActions
    });

    initForm();
    initToolbar();
    load();
  });
})();
