/* ============================================================
   Aurora Grand Resort — Admin shared behaviour
   Auth guard, sidebar injection, table helpers (search/sort/
   filter/paginate), and reusable CRUD helpers.
   ============================================================ */
(function (global) {
  'use strict';

  const NAV = [
    { href: 'dashboard.html', label: 'Dashboard', ico: '▦' },
    { href: 'rooms.html', label: 'Rooms', ico: '🛏' },
    { href: 'reservations.html', label: 'Reservations', ico: '📅' },
    { href: 'restaurant.html', label: 'Restaurant', ico: '🍽' },
    { href: 'menu.html', label: 'Menu', ico: '📋' },
    { href: 'gallery.html', label: 'Gallery', ico: '🖼' },
    { href: 'reviews.html', label: 'Reviews', ico: '⭐' },
    { href: 'users.html', label: 'Users', ico: '👤' },
    { href: 'settings.html', label: 'Settings', ico: '⚙' }
  ];

  /* ---------- Auth guard ---------- */
  function guard() {
    if (!AuroraStore.isAuthenticated()) {
      location.href = 'login.html';
      return false;
    }
    return true;
  }

  /* ---------- Sidebar injection ---------- */
  function injectSidebar() {
    const el = document.getElementById('sidebar');
    if (!el) return;
    AuroraUI.initImageFallback();
    const file = location.pathname.split('/').pop();
    const links = NAV.map(
      (n) => `<a href="${n.href}" class="${n.href === file ? 'active' : ''}"><span class="ico">${n.ico}</span>${n.label}</a>`
    ).join('');
    el.innerHTML = `
      <div class="brand">
        <span class="logo-mark">A</span>
        <span>Aurora<span class="text-gold"> Admin</span></span>
      </div>
      <nav class="sidebar-nav">${links}</nav>
      <div class="sidebar-foot">
        <button class="btn btn-danger btn-block btn-sm" id="logout-btn">⎋ Logout</button>
      </div>`;
    document.getElementById('logout-btn').addEventListener('click', () => {
      AuroraStore.logout();
      location.href = 'login.html';
    });
  }

  /* ---------- Topbar injection ---------- */
  function injectTopbar(title) {
    const el = document.getElementById('topbar');
    if (!el) return;
    const session = JSON.parse(localStorage.getItem(AuroraStore.SESSION_KEY) || '{}');
    el.innerHTML = `
      <button class="menu-toggle" id="menu-toggle">☰</button>
      <div class="page-title">${title}</div>
      <div class="topbar-actions">
        <button class="icon-btn" data-theme-toggle data-theme-icon title="Toggle theme">☾</button>
        <button class="icon-btn" title="Notifications">🔔<span class="badge-count">3</span></button>
        <div class="admin-profile">
          <div class="av">${((session.user) || 'A').charAt(0).toUpperCase()}</div>
          <div>
            <div class="nm">${session.user || 'Admin'}</div>
            <div class="rl">Super Admin</div>
          </div>
        </div>
      </div>`;
    document.getElementById('menu-toggle').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('open');
    });
    el.querySelectorAll('[data-theme-toggle]').forEach((b) =>
      b.addEventListener('click', () => AuroraUI.toggleTheme())
    );
  }

  /* ---------- Reusable table controller ----------
     opts: { renderRow(item), searchKeys, sortMap, pageSize } */
  function createTable(opts) {
    let data = [];
    let filtered = [];
    let page = 1;
    let sortKey = null;
    let sortDir = 1;
    let query = '';

    const tbody = document.getElementById(opts.tbodyId);
    const searchInput = document.getElementById(opts.searchId);
    const pagEl = document.getElementById(opts.paginationId);
    const countEl = document.getElementById(opts.countId);

    function apply() {
      filtered = data.filter((item) => {
        if (!query) return true;
        const hay = opts.searchKeys.map((k) => String(item[k] || '')).join(' ').toLowerCase();
        return hay.includes(query.toLowerCase());
      });
      if (sortKey && opts.sortMap && opts.sortMap[sortKey]) {
        filtered.sort((a, b) => opts.sortMap[sortKey](a, b) * sortDir);
      }
      const totalPages = Math.max(1, Math.ceil(filtered.length / opts.pageSize));
      if (page > totalPages) page = totalPages;
      const start = (page - 1) * opts.pageSize;
      const slice = filtered.slice(start, start + opts.pageSize);
      tbody.innerHTML = slice.length
        ? slice.map(opts.renderRow).join('')
        : `<tr><td colspan="${opts.colspan || 6}"><div class="empty-state"><div class="ico">📭</div>No records found.</div></td></tr>`;
      if (countEl) countEl.textContent = `${filtered.length} record${filtered.length === 1 ? '' : 's'}`;
      renderPagination(totalPages);
      if (opts.onRender) opts.onRender();
    }

    function renderPagination(totalPages) {
      if (!pagEl) return;
      let html = `<button ${page === 1 ? 'disabled' : ''} data-pg="prev">‹</button>`;
      for (let i = 1; i <= totalPages; i++) {
        html += `<button class="${i === page ? 'active' : ''}" data-pg="${i}">${i}</button>`;
      }
      html += `<button ${page === totalPages ? 'disabled' : ''} data-pg="next">›</button>`;
      pagEl.innerHTML = html;
      pagEl.querySelectorAll('button').forEach((b) =>
        b.addEventListener('click', () => {
          const v = b.getAttribute('data-pg');
          if (v === 'prev') page = Math.max(1, page - 1);
          else if (v === 'next') page = Math.min(totalPages, page + 1);
          else page = +v;
          apply();
        })
      );
    }

    if (searchInput) {
      searchInput.addEventListener('input', AuroraUI.debounce((e) => {
        query = e.target.value; page = 1; apply();
      }, 200));
    }
    document.querySelectorAll('[data-sort]').forEach((th) => {
      th.addEventListener('click', () => {
        const k = th.getAttribute('data-sort');
        if (sortKey === k) sortDir *= -1; else { sortKey = k; sortDir = 1; }
        apply();
      });
    });

    return {
      setData(arr) { data = arr; apply(); },
      refresh() { apply(); },
      getFiltered() { return filtered; }
    };
  }

  /* ---------- Image upload preview ---------- */
  function bindImageUpload(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if (!input || !preview) return;
    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.innerHTML = `<img src="${e.target.result}" alt="preview">`;
        preview.dataset.dataUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  /* ---------- Confirm dialog via toast-ish modal ---------- */
  function confirmDelete(message, onYes) {
    if (confirm(message)) onYes();
  }

  global.AuroraAdmin = {
    NAV, guard, injectSidebar, injectTopbar, createTable, bindImageUpload, confirmDelete
  };
})(window);
