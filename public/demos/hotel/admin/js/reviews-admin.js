/* Admin reviews management: approve / reject / delete */
(function () {
  'use strict';

  let table;

  function statusBadge(s) {
    const map = { approved: 'badge-green', pending: 'badge-gold', rejected: 'badge-red' };
    return `<span class="badge ${map[s] || 'badge-gray'}">${s}</span>`;
  }

  function renderRow(r) {
    return `<tr>
      <td class="cell-strong">${r.name}</td>
      <td>${r.room}</td>
      <td class="text-gold">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</td>
      <td style="max-width:320px;">${r.comment}</td>
      <td>${statusBadge(r.status)}</td>
      <td>
        <div class="row-actions">
          ${r.status !== 'approved' ? '<button class="icon-action" data-approve="' + r.id + '" title="Approve">✓</button>' : ''}
          ${r.status !== 'rejected' ? '<button class="icon-action" data-reject="' + r.id + '" title="Reject">✕</button>' : ''}
          <button class="icon-action danger" data-del="${r.id}" title="Delete">🗑</button>
        </div>
      </td>
    </tr>`;
  }

  function load() {
    table.setData(AuroraStore.getCollection('reviews'));
  }

  function initToolbar() {
    document.getElementById('rev-filter').addEventListener('change', (e) => {
      const v = e.target.value;
      const all = AuroraStore.getCollection('reviews');
      table.setData(v === 'all' ? all : all.filter((r) => r.status === v));
    });
  }

  function bindRowActions() {
    document.querySelectorAll('[data-approve]').forEach((b) =>
      b.addEventListener('click', () => {
        AuroraStore.update('reviews', b.getAttribute('data-approve'), { status: 'approved' });
        AuroraUI.toast('Approved', 'Review is now public.', 'success');
        load();
      })
    );
    document.querySelectorAll('[data-reject]').forEach((b) =>
      b.addEventListener('click', () => {
        AuroraStore.update('reviews', b.getAttribute('data-reject'), { status: 'rejected' });
        AuroraUI.toast('Rejected', 'Review hidden.', 'error');
        load();
      })
    );
    document.querySelectorAll('[data-del]').forEach((b) =>
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-del');
        AuroraAdmin.confirmDelete('Delete this review?', () => {
          AuroraStore.remove('reviews', id);
          AuroraUI.toast('Deleted', 'Review removed.', 'success');
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
    AuroraAdmin.injectTopbar('Reviews');

    table = AuroraAdmin.createTable({
      tbodyId: 'rev-tbody',
      searchId: 'rev-search',
      paginationId: 'rev-pagination',
      pageSize: 7,
      colspan: 6,
      searchKeys: ['name', 'room', 'comment', 'status'],
      sortMap: {
        name: (a, b) => a.name.localeCompare(b.name),
        status: (a, b) => a.status.localeCompare(b.status)
      },
      renderRow,
      onRender: bindRowActions
    });

    initToolbar();
    load();
  });
})();
