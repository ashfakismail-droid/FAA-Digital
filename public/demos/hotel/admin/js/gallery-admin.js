/* Admin gallery management: upload, delete, filter */
(function () {
  'use strict';

  let table;
  let pendingImage = '';

  function renderRow(g) {
    return `<tr>
      <td><img src="${AuroraStore.base()}${g.src}" alt="${g.title}" style="width:80px; height:54px; object-fit:cover; border-radius:8px;" onerror="this.src='${AuroraStore.base()}images/placeholder.jpg'"></td>
      <td class="cell-strong">${g.title}</td>
      <td><span class="badge badge-gray">${g.category}</span></td>
      <td>
        <div class="row-actions">
          <button class="icon-action danger" data-del="${g.id}" title="Delete">🗑</button>
        </div>
      </td>
    </tr>`;
  }

  function load() {
    table.setData(AuroraStore.getCollection('gallery'));
    const cats = ['all', ...new Set(AuroraStore.getCollection('gallery').map((x) => x.category))];
    const sel = document.getElementById('g-filter');
    sel.innerHTML = cats.map((c) => `<option value="${c}">${c === 'all' ? 'All Categories' : c}</option>`).join('');
  }

  function initUpload() {
    AuroraAdmin.bindImageUpload('g-file', 'g-upload');
    document.getElementById('g-add').addEventListener('click', () => {
      const title = document.getElementById('g-title').value.trim();
      const cat = document.getElementById('g-cat').value.trim() || 'General';
      const preview = document.getElementById('g-upload');
      const src = preview.dataset.dataUrl || '';
      if (!title || !src) {
        AuroraUI.toast('Missing', 'Add a title and upload an image.', 'error');
        return;
      }
      AuroraStore.insert('gallery', { id: AuroraStore.uid('G'), src, title, category: cat });
      document.getElementById('g-title').value = '';
      document.getElementById('g-cat').value = '';
      preview.innerHTML = '<div class="hint" style="font-size:12px;">Choose file…</div><input type="file" id="g-file" accept="image/*">';
      AuroraAdmin.bindImageUpload('g-file', 'g-upload');
      AuroraUI.toast('Added', 'Image uploaded to gallery.', 'success');
      load();
    });
  }

  function initToolbar() {
    document.getElementById('g-filter').addEventListener('change', (e) => {
      const v = e.target.value;
      const all = AuroraStore.getCollection('gallery');
      table.setData(v === 'all' ? all : all.filter((g) => g.category === v));
    });
  }

  function bindRowActions() {
    document.querySelectorAll('[data-del]').forEach((b) =>
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-del');
        AuroraAdmin.confirmDelete('Delete this image?', () => {
          AuroraStore.remove('gallery', id);
          AuroraUI.toast('Deleted', 'Image removed.', 'success');
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
    AuroraAdmin.injectTopbar('Gallery');

    table = AuroraAdmin.createTable({
      tbodyId: 'g-tbody',
      searchId: 'g-search',
      paginationId: 'g-pagination',
      pageSize: 8,
      colspan: 4,
      searchKeys: ['title', 'category'],
      sortMap: {
        title: (a, b) => a.title.localeCompare(b.title),
        category: (a, b) => a.category.localeCompare(b.category)
      },
      renderRow,
      onRender: bindRowActions
    });

    initUpload();
    initToolbar();
    load();
  });
})();
