/* Restaurant page dynamic content */
(function () {
  'use strict';

  function render() {
    const r = AuroraStore.read().restaurant;
    if (!r) return;
    document.getElementById('rest-intro').textContent = r.intro;
    document.getElementById('chef-name').textContent = r.chef.name;
    document.getElementById('chef-bio').textContent = r.chef.bio;
    document.getElementById('chef-img').src = r.chef.image;
    document.getElementById('dining-exp').textContent = r.diningExperience;

    const timings = document.getElementById('dining-timings');
    timings.innerHTML = Object.entries(r.timings)
      .map(
        ([k, v]) => `
        <li style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding-bottom:12px;">
          <span style="text-transform:capitalize; font-weight:600;">${k}</span>
          <span class="text-gold">${v}</span>
        </li>`
      )
      .join('');

    const sig = AuroraStore.getCollection('menu').filter((m) => m.chefSpecial).slice(0, 3);
    document.getElementById('signature-dishes').innerHTML = sig
      .map(
        (m) => `
      <article class="card reveal">
        <div class="card-img"><img src="${m.image}" alt="${m.name}" onerror="this.src='images/placeholder.jpg'"></div>
        <div class="card-body">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 class="card-title">${m.name}</h3>
            <span class="text-gold" style="font-weight:700;">${AuroraUI.money(m.price)}</span>
          </div>
          <p class="card-text">${m.description}</p>
        </div>
      </article>`
      )
      .join('');

    document.getElementById('special-offers').innerHTML = r.specialOffers
      .map(
        (o) => `
      <div class="card reveal" style="padding:26px; display:flex; gap:16px; align-items:flex-start;">
        <div style="font-size:30px;">🎁</div>
        <div>
          <h4 style="margin-bottom:6px;">${o.title}</h4>
          <p class="card-text">${o.desc}${o.price != null ? '<b class="text-gold">' + AuroraUI.money(o.price) + '</b>' + (o.suffix || '') : ''}</p>
        </div>
      </div>`
      )
      .join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    render();
    AuroraUI.initReveal();
  });
})();
