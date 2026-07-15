/* Admin settings management */
(function () {
  'use strict';

  function load() {
    const db = AuroraStore.read();
    const h = db.hotel;
    const hf = document.getElementById('hotel-form');
    hf.name.value = h.name;
    hf.tagline.value = h.tagline;
    hf.phone.value = h.contact.phone;
    hf.email.value = h.contact.email;
    hf.address.value = h.contact.address;

    const tf = document.getElementById('theme-form');
    tf.theme.value = h.theme;
    tf.logo.value = h.logo || '';
    tf.accent.value = h.accent || '#c9a24b';

    const sf = document.getElementById('social-form');
    sf.facebook.value = h.social.facebook;
    sf.instagram.value = h.social.instagram;
    sf.twitter.value = h.social.twitter;
    sf.linkedin.value = h.social.linkedin;

    const ohf = document.getElementById('hours-form');
    ohf.reception.value = h.openingHours.reception;
    ohf.restaurant.value = h.openingHours.restaurant;
    ohf.spa.value = h.openingHours.spa;
    ohf.pool.value = h.openingHours.pool;

    const rsf = document.getElementById('res-settings-form');
    rsf.minNights.value = h.reservationSettings.minNights;
    rsf.taxRate.value = h.reservationSettings.taxRate;

    // Populate currency dropdown from shared list
    const sel = document.getElementById('currency-select');
    sel.innerHTML = AuroraStore.CURRENCIES
      .map((c) => `<option value="${c.code}">${c.label}</option>`)
      .join('');
    // Selected currency: prefer saved localStorage choice, else seeded value
    sel.value = AuroraUI.getCurrency();
  }

  function patchHotel(patch) {
    const db = AuroraStore.read();
    db.hotel = Object.assign({}, db.hotel, patch);
    AuroraStore.write(db);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!AuroraAdmin.guard()) return;
    AuroraUI.initTheme();
    AuroraUI.bindModals();
    AuroraAdmin.injectSidebar();
    AuroraAdmin.injectTopbar('Settings');

    load();

    document.getElementById('hotel-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.target;
      patchHotel({
        name: f.name.value, tagline: f.tagline.value,
        contact: { phone: f.phone.value, email: f.email.value, address: f.address.value }
      });
      AuroraUI.toast('Saved', 'Hotel profile updated.', 'success');
    });

    document.getElementById('theme-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.target;
      patchHotel({ theme: f.theme.value, logo: f.logo.value, accent: f.accent.value });
      AuroraUI.applyTheme(f.theme.value);
      AuroraUI.toast('Saved', 'Appearance updated.', 'success');
    });

    document.getElementById('social-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.target;
      patchHotel({ social: { facebook: f.facebook.value, instagram: f.instagram.value, twitter: f.twitter.value, linkedin: f.linkedin.value } });
      AuroraUI.toast('Saved', 'Social links updated.', 'success');
    });

    document.getElementById('hours-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.target;
      patchHotel({ openingHours: { reception: f.reception.value, restaurant: f.restaurant.value, spa: f.spa.value, pool: f.pool.value } });
      AuroraUI.toast('Saved', 'Opening hours updated.', 'success');
    });

    document.getElementById('res-settings-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.target;
      patchHotel({ reservationSettings: { minNights: +f.minNights.value, currency: f.currency.value, taxRate: +f.taxRate.value } });
      // Persist selected currency so all prices update across the site
      AuroraUI.setCurrency(f.currency.value);
      AuroraUI.toast('Saved', 'Reservation settings updated. Prices now show ' + f.currency.value + '.', 'success');
    });

    document.getElementById('reset-data').addEventListener('click', () => {
      AuroraAdmin.confirmDelete('Reset all demo data to defaults?', () => {
        AuroraStore.reset();
        AuroraUI.toast('Reset', 'Demo data restored.', 'success');
        load();
      });
    });
  });
})();
