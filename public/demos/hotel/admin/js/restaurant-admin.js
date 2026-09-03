/* Admin restaurant management */
(function () {
  'use strict';

  function load() {
    const r = AuroraStore.read().restaurant;
    const restForm = document.getElementById('rest-form');
    restForm.intro.value = r.intro;
    restForm.diningExperience.value = r.diningExperience;

    const chefForm = document.getElementById('chef-form');
    chefForm.name.value = r.chef.name;
    chefForm.bio.value = r.chef.bio;
    chefForm.image.value = r.chef.image;

    const tf = document.getElementById('timings-form');
    tf.breakfast.value = r.timings.breakfast;
    tf.lunch.value = r.timings.lunch;
    tf.dinner.value = r.timings.dinner;

    renderOffers();
  }

  function renderOffers() {
    const offers = AuroraStore.read().restaurant.specialOffers;
    document.getElementById('offers-list').innerHTML = offers
      .map(
        (o, i) => `
      <div class="flex-between" style="background:var(--navy-700); padding:12px 14px; border-radius:var(--radius-sm);">
        <div><b>${o.title}</b><div class="text-mute" style="font-size:12px;">${o.desc}${o.price != null ? '<b style="color:var(--gold);">' + AuroraUI.money(o.price) + '</b>' + (o.suffix || '') : ''}</div></div>
        <button class="icon-action danger" data-offer="${i}" title="Remove">🗑</button>
      </div>`
      )
      .join('');
    document.querySelectorAll('[data-offer]').forEach((b) =>
      b.addEventListener('click', () => {
        const offers = AuroraStore.read().restaurant.specialOffers;
        offers.splice(+b.getAttribute('data-offer'), 1);
        const db = AuroraStore.read();
        db.restaurant.specialOffers = offers;
        AuroraStore.write(db);
        renderOffers();
        AuroraUI.toast('Removed', 'Offer deleted.', 'success');
      })
    );
  }

  function saveRestaurant(patch) {
    const db = AuroraStore.read();
    db.restaurant = Object.assign({}, db.restaurant, patch);
    AuroraStore.write(db);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!AuroraAdmin.guard()) return;
    AuroraUI.initTheme();
    AuroraUI.bindModals();
    AuroraAdmin.injectSidebar();
    AuroraAdmin.injectTopbar('Restaurant');

    load();

    document.getElementById('rest-form').addEventListener('submit', (e) => {
      e.preventDefault();
      saveRestaurant({ intro: e.target.intro.value, diningExperience: e.target.diningExperience.value });
      AuroraUI.toast('Saved', 'Restaurant info updated.', 'success');
    });
    document.getElementById('chef-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const db = AuroraStore.read();
      db.restaurant.chef = { name: e.target.name.value, bio: e.target.bio.value, image: e.target.image.value };
      AuroraStore.write(db);
      AuroraUI.toast('Saved', 'Chef profile updated.', 'success');
    });
    document.getElementById('timings-form').addEventListener('submit', (e) => {
      e.preventDefault();
      saveRestaurant({ timings: { breakfast: e.target.breakfast.value, lunch: e.target.lunch.value, dinner: e.target.dinner.value } });
      AuroraUI.toast('Saved', 'Dining timings updated.', 'success');
    });
    document.getElementById('add-offer').addEventListener('click', () => {
      const title = document.getElementById('offer-title').value.trim();
      const desc = document.getElementById('offer-desc').value.trim();
      if (!title || !desc) { AuroraUI.toast('Missing', 'Enter title and description.', 'error'); return; }
      const db = AuroraStore.read();
      db.restaurant.specialOffers.push({ title, desc });
      AuroraStore.write(db);
      document.getElementById('offer-title').value = '';
      document.getElementById('offer-desc').value = '';
      renderOffers();
      AuroraUI.toast('Added', 'Special offer created.', 'success');
    });
  });
})();
