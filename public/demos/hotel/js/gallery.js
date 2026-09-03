/* Gallery page: category filter + masonry + lightbox */
(function () {
  'use strict';

  let active = 'all';

  function render() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    const items = AuroraStore.getCollection('gallery').filter((g) => active === 'all' || g.category === active);
    grid.innerHTML = items
      .map(
        (g) => `
      <div class="m-item reveal" data-lightbox data-src="${g.src}" data-title="${g.title}">
        <img src="${g.src}" alt="${g.title}" onerror="this.src='images/placeholder.jpg'">
        <div class="overlay"><h4>${g.title}</h4></div>
      </div>`
      )
      .join('');
    AuroraUI.initReveal();
    AuroraUI.initLightbox();
  }

  function renderFilters() {
    const el = document.getElementById('gallery-filters');
    if (!el) return;
    const cats = ['all', ...new Set(AuroraStore.getCollection('gallery').map((g) => g.category))];
    el.innerHTML = cats
      .map((c) => `<button class="filter-tab ${c === 'all' ? 'active' : ''}" data-cat="${c}">${c}</button>`)
      .join('');
    el.querySelectorAll('.filter-tab').forEach((tab) =>
      tab.addEventListener('click', () => {
        el.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        active = tab.getAttribute('data-cat');
        render();
      })
    );
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderFilters();
    render();
  });
})();
