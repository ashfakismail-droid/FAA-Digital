/* Admin users management: CRUD + roles */
(function () {
  'use strict';

  let table;

  function roleBadge(role) {
    const map = {
      'Super Admin': 'badge-gold', Manager: 'badge-blue',
      Reception: 'badge-green', Restaurant: 'badge-purple'
    };
    return `<span class="badge ${map[role] || 'badge-gray'}">${role}</span>`;
  }

  function renderRow(u) {
    return `<tr>
      <td>
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="avatar-sm">${u.name.charAt(0)}</div>
          <span class="cell-strong">${u.name}</span>
        </div>
      </td>
      <td>${roleBadge(u.role)}</td>
      <td>${u.email}</td>
      <td>${u.status === 'active' ? '<span class="badge badge-green">Active</span>' : '<span class="badge badge-gray">Inactive</span>'}</td>
      <td>
        <div class="row-actions">
          <button class="icon-action" data-edit="${u.id}" title="Edit">✎</button>
          <button class="icon-action danger" data-del="${u.id}" title="Delete">🗑</button>
        </div>
      </td>
    </tr>`;
  }

  function load() {
    table.setData(AuroraStore.getCollection('users'));
  }

  function openModal(user) {
    const form = document.getElementById('user-form');
    form.reset();
    document.getElementById('user-modal-title').textContent = user ? 'Edit User' : 'Add User';
    if (user) {
      form.id.value = user.id;
      form.name.value = user.name;
      form.email.value = user.email;
      form.role.value = user.role;
      form.status.value = user.status;
    } else {
      form.id.value = '';
    }
    AuroraUI.openModal('user-modal');
  }

  function initForm() {
    const form = document.getElementById('user-form');
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
      if (!ok) return;

      const payload = { name: form.name.value, email: form.email.value, role: form.role.value, status: form.status.value };
      const id = form.id.value;
      if (id) {
        AuroraStore.update('users', id, payload);
        AuroraUI.toast('Updated', payload.name + ' saved.', 'success');
      } else {
        payload.id = AuroraStore.uid('U');
        AuroraStore.insert('users', payload);
        AuroraUI.toast('Added', payload.name + ' created.', 'success');
      }
      AuroraUI.closeModal('user-modal');
      load();
    });
  }

  function initToolbar() {
    document.getElementById('add-user-btn').addEventListener('click', () => openModal(null));
    document.getElementById('user-filter').addEventListener('change', (e) => {
      const v = e.target.value;
      const all = AuroraStore.getCollection('users');
      table.setData(v === 'all' ? all : all.filter((u) => u.role === v));
    });
  }

  function bindRowActions() {
    document.querySelectorAll('[data-edit]').forEach((b) =>
      b.addEventListener('click', () => {
        const u = AuroraStore.getById('users', b.getAttribute('data-edit'));
        if (u) openModal(u);
      })
    );
    document.querySelectorAll('[data-del]').forEach((b) =>
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-del');
        AuroraAdmin.confirmDelete('Delete this user?', () => {
          AuroraStore.remove('users', id);
          AuroraUI.toast('Deleted', 'User removed.', 'success');
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
    AuroraAdmin.injectTopbar('Users');

    table = AuroraAdmin.createTable({
      tbodyId: 'user-tbody',
      searchId: 'user-search',
      paginationId: 'user-pagination',
      pageSize: 7,
      colspan: 5,
      searchKeys: ['name', 'email', 'role'],
      sortMap: {
        role: (a, b) => a.role.localeCompare(b.role),
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
