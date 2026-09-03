/* Admin menu management: CRUD + image upload preview */
(function () {
  'use strict';

  let table;
  let pendingImage = '';

  function flags(m) {
    const out = [];
    out.push(`<span class="veg-dot ${m.veg ? 'veg' : 'nonveg'}" title="${m.veg ? 'Veg' : 'Non-veg'}"></span>`);
    if (m.popular) out.push('<span class="badge badge-gold">Popular</span>');
    if (m.chefSpecial) out.push('<span class="badge badge-blue">Special</span>');
    if (!m.available) out.push('<span class="badge badge-gray">Off</span>');
    return out.join(' ');
  }

  function renderRow(m) {
    return `<tr>
      <td class="cell-strong">${m.name}</td>
      <td>${m.category}</td>
      <td class="cell-strong">${AuroraUI.money(m.price)}</td>
      <td>${m.veg ? '<span class="badge badge-green">Veg</span>' : '<span class="badge badge-red">Non-Veg</span>'}</td>
      <td>${flags(m)}</td>
      <td>
        <div class="row-actions">
          <button class="icon-action" data-edit="${m.id}" title="Edit">✎</button>
          <button class="icon-action danger" data-del="${m.id}" title="Delete">🗑</button>
        </div>
      </td>
    </tr>`;
  }

  function load() {
    table.setData(AuroraStore.getCollection('menu'));
  }

  function openModal(item) {
    const form = document.getElementById('menu-form');
    form.reset();
    pendingImage = '';
    document.getElementById('menu-upload-preview').innerHTML =
      '<div class="hint">Click to upload<br><small>or paste URL above</small></div><input type="file" id="menu-image-file" accept="image/*">';
    AuroraAdmin.bindImageUpload('menu-image-file', 'menu-upload-preview');
    document.getElementById('m-avail').checked = true;

    document.getElementById('menu-modal-title').textContent = item ? 'Edit Menu Item' : 'Add Menu Item';
    if (item) {
      form.id.value = item.id;
      form.name.value = item.name;
      form.category.value = item.category;
      form.description.value = item.description;
      form.price.value = item.price;
      form.image.value = item.image;
      form.veg.checked = item.veg;
      form.available.checked = item.available;
      form.popular.checked = item.popular;
      form.chefSpecial.checked = item.chefSpecial;
      if (item.image) {
        document.getElementById('menu-upload-preview').innerHTML =
          `<img src="${AuroraStore.base()}${item.image}" alt="preview"><input type="file" id="menu-image-file" accept="image/*">`;
        AuroraAdmin.bindImageUpload('menu-image-file', 'menu-upload-preview');
      }
    } else {
      form.id.value = '';
    }
    AuroraUI.openModal('menu-modal');
  }

  function initForm() {
    const form = document.getElementById('menu-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('[required]').forEach((inp) => {
        const err = inp.parentElement.querySelector('.field-error');
        if (!String(inp.value).trim()) { ok = false; if (err) err.classList.add('show'); }
        else if (err) err.classList.remove('show');
      });
      if (!ok) return;

      const preview = document.getElementById('menu-upload-preview');
      const uploaded = preview.dataset.dataUrl || '';
      const image = uploaded || form.image.value || AuroraStore.base() + 'images/placeholder.jpg';

      const payload = {
        name: form.name.value,
        category: form.category.value,
        description: form.description.value,
        price: +form.price.value,
        image,
        veg: form.veg.checked,
        available: form.available.checked,
        popular: form.popular.checked,
        chefSpecial: form.chefSpecial.checked
      };
      const id = form.id.value;
      if (id) {
        AuroraStore.update('menu', id, payload);
        AuroraUI.toast('Updated', payload.name + ' saved.', 'success');
      } else {
        payload.id = AuroraStore.uid('M');
        AuroraStore.insert('menu', payload);
        AuroraUI.toast('Added', payload.name + ' created.', 'success');
      }
      AuroraUI.closeModal('menu-modal');
      load();
    });
  }

  function initToolbar() {
    document.getElementById('add-menu-btn').addEventListener('click', () => openModal(null));
    document.getElementById('menu-filter').addEventListener('change', (e) => {
      const v = e.target.value;
      const all = AuroraStore.getCollection('menu');
      table.setData(v === 'all' ? all : all.filter((m) => m.category === v));
    });
  }

  function bindRowActions() {
    document.querySelectorAll('[data-edit]').forEach((b) =>
      b.addEventListener('click', () => {
        const m = AuroraStore.getById('menu', b.getAttribute('data-edit'));
        if (m) openModal(m);
      })
    );
    document.querySelectorAll('[data-del]').forEach((b) =>
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-del');
        AuroraAdmin.confirmDelete('Delete this menu item?', () => {
          AuroraStore.remove('menu', id);
          AuroraUI.toast('Deleted', 'Menu item removed.', 'success');
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
    AuroraAdmin.injectTopbar('Menu');

    table = AuroraAdmin.createTable({
      tbodyId: 'menu-tbody',
      searchId: 'menu-search',
      paginationId: 'menu-pagination',
      pageSize: 8,
      colspan: 6,
      searchKeys: ['name', 'category', 'description'],
      sortMap: {
        category: (a, b) => a.category.localeCompare(b.category),
        price: (a, b) => a.price - b.price
      },
      renderRow,
      onRender: bindRowActions
    });

    initForm();
    initToolbar();
    load();
  });
})();
