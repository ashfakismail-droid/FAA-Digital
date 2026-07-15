/* Menu page: category tabs + item cards */
(function () {
  'use strict';

  const ORDER = ['Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Coffee', 'Tea', 'Cocktails', 'Mocktails'];
  let active = 'all';

  function itemCard(m) {
    const tags = [];
    tags.push(`<span class="veg-dot ${m.veg ? 'veg' : 'nonveg'}" title="${m.veg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>`);
    if (m.popular) tags.push('<span class="badge badge-gold">Popular</span>');
    if (m.chefSpecial) tags.push('<span class="badge badge-blue">Chef Special</span>');
    if (!m.available) tags.push('<span class="badge badge-gray">Unavailable</span>');
    return `
      <div class="menu-item reveal">
        <img class="m-img" src="${m.image}" alt="${m.name}" onerror="this.src='images/placeholder.jpg'">
        <div class="m-info">
          <div class="m-head">
            <span class="m-name">${m.name}</span>
            <span class="m-price">${AuroraUI.money(m.price)}</span>
          </div>
          <p class="m-desc">${m.description}</p>
          <div class="m-tags">${tags.join('')}</div>
        </div>
      </div>`;
  }

  function render() {
    const container = document.getElementById('menu-container');
    if (!container) return;
    const menu = AuroraStore.getCollection('menu');
    const cats = active === 'all' ? ORDER : [active];
    let html = '';
    cats.forEach((cat) => {
      const items = menu.filter((m) => m.category === cat);
      if (!items.length) return;
      html += `<h3 class="menu-cat-title">${cat}</h3><div class="grid grid-2">${items.map(itemCard).join('')}</div>`;
    });
    container.innerHTML = html;
    AuroraUI.initReveal();
  }

  function renderFilters() {
    const el = document.getElementById('menu-filters');
    if (!el) return;
    const cats = ['all', ...ORDER];
    el.innerHTML = cats
      .map((c) => `<button class="filter-tab ${c === 'all' ? 'active' : ''}" data-cat="${c}">${c === 'all' ? 'All' : c}</button>`)
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
