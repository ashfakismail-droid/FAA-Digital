/* ============================================================
   Aurora Grand Resort — Shared Data Store
   Simulates a database using localStorage.
   Used by both the public site and the admin panel.
   ============================================================ */
(function (global) {
  'use strict';

  const DB_KEY = 'aurora_grand_db_v1';
  const SESSION_KEY = 'aurora_admin_session';

  /* ---------- Seed data ---------- */
  const seed = () => ({
    hotel: {
      name: 'Aurora Grand Resort',
      tagline: 'Where Elegance Meets the Horizon',
      description:
        'Perched along a private stretch of coastline, Aurora Grand Resort blends timeless luxury with modern comfort. Discover curated experiences, world-class dining, and rooms designed to soothe the soul.',
      contact: {
        phone: '+1 (800) 555-0199',
        email: 'reservations@auroragrand.com',
        address: '1200 Oceanview Boulevard, Monterey Bay, CA 93940'
      },
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#',
        linkedin: '#'
      },
      openingHours: {
        reception: '24 Hours',
        restaurant: '06:30 AM – 11:00 PM',
        spa: '09:00 AM – 08:00 PM',
        pool: '07:00 AM – 10:00 PM'
      },
      reservationSettings: {
        minNights: 1,
        currency: 'USD',
        taxRate: 12
      },
      theme: 'dark'
    },

    rooms: [
      { id: 'R001', name: 'Ocean Deluxe Suite', type: 'Suite', price: 420, capacity: 2, size: 55, beds: '1 King', amenities: ['Sea View', 'Free Wi-Fi', 'Mini Bar', 'Jacuzzi'], description: 'Wake up to panoramic ocean views from your private balcony.', image: 'images/rooms/ocean-deluxe.jpg', status: 'available', featured: true },
      { id: 'R002', name: 'Garden Premium Room', type: 'Premium', price: 280, capacity: 2, size: 40, beds: '1 Queen', amenities: ['Garden View', 'Free Wi-Fi', 'Breakfast', 'Smart TV'], description: 'A serene retreat surrounded by tropical gardens.', image: 'images/rooms/garden-premium.jpg', status: 'available', featured: true },
      { id: 'R003', name: 'Presidential Villa', type: 'Villa', price: 980, capacity: 6, size: 180, beds: '3 King', amenities: ['Private Pool', 'Butler', 'Sea View', 'Kitchen'], description: 'Our most exclusive residence with a private infinity pool.', image: 'images/rooms/presidential-villa.jpg', status: 'booked', featured: true },
      { id: 'R004', name: 'Classic City Room', type: 'Standard', price: 180, capacity: 2, size: 32, beds: '1 Double', amenities: ['Free Wi-Fi', 'City View', 'Work Desk'], description: 'Smart, comfortable and perfectly located.', image: 'images/rooms/classic-city.jpg', status: 'available', featured: false },
      { id: 'R005', name: 'Family Loft', type: 'Loft', price: 520, capacity: 4, size: 90, beds: '2 Queen', amenities: ['Sea View', 'Free Wi-Fi', 'Kids Area', 'Kitchen'], description: 'Spacious two-level loft ideal for families.', image: 'images/rooms/family-loft.jpg', status: 'maintenance', featured: false },
      { id: 'R006', name: 'Spa Retreat Room', type: 'Premium', price: 340, capacity: 2, size: 45, beds: '1 King', amenities: ['Spa Access', 'Free Wi-Fi', 'Balcony'], description: 'Includes daily spa rituals and a calming ambiance.', image: 'images/rooms/spa-retreat.jpg', status: 'available', featured: false }
    ],

    reservations: [
      { id: 'BK-1001', guest: 'Emily Carter', email: 'emily@mail.com', phone: '+1 202 555 0143', roomId: 'R001', checkIn: '2026-07-20', checkOut: '2026-07-25', adults: 2, children: 0, status: 'confirmed', payment: 'Paid', total: 2100 },
      { id: 'BK-1002', guest: 'James Wilson', email: 'james@mail.com', phone: '+1 305 555 0188', roomId: 'R003', checkIn: '2026-07-18', checkOut: '2026-07-22', adults: 4, children: 2, status: 'confirmed', payment: 'Paid', total: 3920 },
      { id: 'BK-1003', guest: 'Sofia Martinez', email: 'sofia@mail.com', phone: '+1 415 555 0122', roomId: 'R002', checkIn: '2026-08-01', checkOut: '2026-08-04', adults: 2, children: 1, status: 'pending', payment: 'Unpaid', total: 840 },
      { id: 'BK-1004', guest: 'Liam Brown', email: 'liam@mail.com', phone: '+1 212 555 0177', roomId: 'R004', checkIn: '2026-07-15', checkOut: '2026-07-17', adults: 1, children: 0, status: 'checked-in', payment: 'Paid', total: 360 },
      { id: 'BK-1005', guest: 'Olivia Davis', email: 'olivia@mail.com', phone: '+1 646 555 0190', roomId: 'R006', checkIn: '2026-09-10', checkOut: '2026-09-14', adults: 2, children: 0, status: 'confirmed', payment: 'Paid', total: 1360 }
    ],

    restaurant: {
      intro:
        'Lumière is our signature dining destination, where culinary artistry meets coastal serenity. Our chefs craft seasonal menus from locally sourced ingredients, served in an atmosphere of understated elegance.',
      chef: {
        name: 'Chef Antoine Laurent',
        bio: 'With two Michelin stars and two decades across Paris, Tokyo and New York, Chef Antoine brings a refined, produce-led philosophy to every plate.',
        image: 'images/chef.jpg'
      },
      diningExperience:
        'From candle-lit dinners on the terrace to private chef’s table experiences, every meal at Aurora is designed to be remembered.',
      timings: {
        breakfast: '06:30 AM – 10:30 AM',
        lunch: '12:00 PM – 03:00 PM',
        dinner: '06:00 PM – 11:00 PM'
      },
      specialOffers: [
        { title: 'Sunset Tasting Menu', desc: '5-course pairing menu at dusk — ', price: 95, suffix: ' per guest.' },
        { title: 'Weekend Brunch', desc: 'Unlimited sparkling brunch every Saturday & Sunday.' }
      ]
    },

    menu: [
      { id: 'M001', name: 'Avocado Toast Royale', category: 'Breakfast', description: 'Sourdough, poached eggs, smoked salmon, micro herbs.', price: 18, image: 'images/menu/avocado-toast.jpg', veg: true, popular: true, chefSpecial: false, available: true, featured: true },
      { id: 'M002', name: 'Belgian Waffles', category: 'Breakfast', description: 'Crispy waffles, maple, fresh berries, cream.', price: 14, image: 'images/menu/waffles.jpg', veg: true, popular: false, chefSpecial: false, available: true, featured: false },
      { id: 'M003', name: 'Truffle Omelette', category: 'Breakfast', description: 'Three eggs, black truffle, gruyère, chives.', price: 22, image: 'images/menu/truffle-omelette.jpg', veg: true, popular: false, chefSpecial: true, available: true, featured: false },
      { id: 'M004', name: 'Seared Scallops', category: 'Lunch', description: 'Pan-seared scallops, pea purée, crisp pancetta.', price: 28, image: 'images/menu/scallops.jpg', veg: false, popular: true, chefSpecial: false, available: true, featured: true },
      { id: 'M005', name: 'Wagyu Burger', category: 'Lunch', description: 'A5 wagyu, aged cheddar, brioche, truffle fries.', price: 32, image: 'images/menu/wagyu-burger.jpg', veg: false, popular: true, chefSpecial: false, available: true, featured: false },
      { id: 'M006', name: 'Caprese Salad', category: 'Lunch', description: 'Heirloom tomato, buffalo mozzarella, basil.', price: 16, image: 'images/menu/caprese.jpg', veg: true, popular: false, chefSpecial: false, available: true, featured: false },
      { id: 'M007', name: 'Grilled Lobster', category: 'Dinner', description: 'Half lobster, garlic butter, lemon, herbs.', price: 58, image: 'images/menu/lobster.jpg', veg: false, popular: true, chefSpecial: true, available: true, featured: true },
      { id: 'M008', name: 'Filet Mignon', category: 'Dinner', description: '200g tenderloin, red wine jus, pommes purée.', price: 64, image: 'images/menu/filet.jpg', veg: false, popular: false, chefSpecial: false, available: true, featured: false },
      { id: 'M009', name: 'Wild Mushroom Risotto', category: 'Dinner', description: 'Arborio, porcini, parmesan, truffle oil.', price: 34, image: 'images/menu/risotto.jpg', veg: true, popular: false, chefSpecial: false, available: true, featured: false },
      { id: 'M010', name: 'Molten Chocolate', category: 'Desserts', description: 'Warm dark chocolate cake, vanilla bean ice cream.', price: 14, image: 'images/menu/molten.jpg', veg: true, popular: true, chefSpecial: false, available: true, featured: true },
      { id: 'M011', name: 'Crème Brûlée', category: 'Desserts', description: 'Tahitian vanilla custard, caramelised sugar.', price: 12, image: 'images/menu/creme-brulee.jpg', veg: true, popular: false, chefSpecial: false, available: true, featured: false },
      { id: 'M012', name: 'Espresso', category: 'Coffee', description: 'Single-origin house espresso shot.', price: 4, image: 'images/menu/espresso.jpg', veg: true, popular: true, chefSpecial: false, available: true, featured: false },
      { id: 'M013', name: 'Cappuccino', category: 'Coffee', description: 'Espresso, steamed milk, cocoa dust.', price: 6, image: 'images/menu/cappuccino.jpg', veg: true, popular: false, chefSpecial: false, available: true, featured: false },
      { id: 'M014', name: 'Earl Grey', category: 'Tea', description: 'Classic bergamot black tea.', price: 5, image: 'images/menu/earl-grey.jpg', veg: true, popular: false, chefSpecial: false, available: true, featured: false },
      { id: 'M015', name: 'Green Sencha', category: 'Tea', description: 'Japanese steamed green tea.', price: 5, image: 'images/menu/sencha.jpg', veg: true, popular: false, chefSpecial: false, available: true, featured: false },
      { id: 'M016', name: 'Aurora Negroni', category: 'Cocktails', description: 'Gin, campari, vermouth, orange peel.', price: 16, image: 'images/menu/negroni.jpg', veg: true, popular: true, chefSpecial: true, available: true, featured: true },
      { id: 'M017', name: 'Mojito', category: 'Cocktails', description: 'White rum, lime, mint, soda.', price: 14, image: 'images/menu/mojito.jpg', veg: true, popular: false, chefSpecial: false, available: true, featured: false },
      { id: 'M018', name: 'Virgin Sunrise', category: 'Mocktails', description: 'Orange, grenadine, soda, cherry.', price: 9, image: 'images/menu/sunrise.jpg', veg: true, popular: false, chefSpecial: false, available: true, featured: false },
      { id: 'M019', name: 'Berry Cooler', category: 'Mocktails', description: 'Mixed berries, lime, mint, tonic.', price: 9, image: 'images/menu/berry-cooler.jpg', veg: true, popular: false, chefSpecial: false, available: true, featured: false }
    ],

    gallery: [
      { id: 'G001', src: 'images/gallery/pool.jpg', title: 'Infinity Pool', category: 'Facilities' },
      { id: 'G002', src: 'images/gallery/lobby.jpg', title: 'Grand Lobby', category: 'Interior' },
      { id: 'G003', src: 'images/gallery/beach.jpg', title: 'Private Beach', category: 'Nature' },
      { id: 'G004', src: 'images/gallery/suite.jpg', title: 'Ocean Suite', category: 'Rooms' },
      { id: 'G005', src: 'images/gallery/spa.jpg', title: 'Serenity Spa', category: 'Facilities' },
      { id: 'G006', src: 'images/gallery/restaurant.jpg', title: 'Lumière Dining', category: 'Dining' },
      { id: 'G007', src: 'images/gallery/garden.jpg', title: 'Garden Walk', category: 'Nature' },
      { id: 'G008', src: 'images/gallery/terrace.jpg', title: 'Sky Terrace', category: 'Interior' },
      { id: 'G009', src: 'images/gallery/bar.jpg', title: 'Horizon Bar', category: 'Dining' }
    ],

    reviews: [
      { id: 'RV001', name: 'Emma Thompson', room: 'Ocean Deluxe Suite', rating: 5, comment: 'Absolutely breathtaking views and impeccable service. We will be back!', date: '2026-06-12', status: 'approved' },
      { id: 'RV002', name: 'Michael Reed', room: 'Presidential Villa', rating: 5, comment: 'The private pool and butler service made our anniversary unforgettable.', date: '2026-06-20', status: 'approved' },
      { id: 'RV003', name: 'Aisha Khan', room: 'Garden Premium Room', rating: 4, comment: 'Lovely gardens and friendly staff. Breakfast could have more variety.', date: '2026-07-01', status: 'pending' },
      { id: 'RV004', name: 'David Lee', room: 'Spa Retreat Room', rating: 5, comment: 'The spa access was a game changer. Pure relaxation.', date: '2026-07-05', status: 'approved' }
    ],

    users: [
      { id: 'U001', name: 'Admin Aurora', email: 'admin@auroragrand.com', role: 'Super Admin', status: 'active', avatar: 'images/avatar1.jpg' },
      { id: 'U002', name: 'Sarah Connor', email: 'sarah@auroragrand.com', role: 'Manager', status: 'active', avatar: 'images/avatar2.jpg' },
      { id: 'U003', name: 'Marco Rossi', email: 'marco@auroragrand.com', role: 'Reception', status: 'active', avatar: 'images/avatar3.jpg' },
      { id: 'U004', name: 'Nina Patel', email: 'nina@auroragrand.com', role: 'Restaurant', status: 'inactive', avatar: 'images/avatar4.jpg' }
    ],

    orders: [
      { month: 'Jan', bookings: 42, revenue: 18400, occupancy: 68 },
      { month: 'Feb', bookings: 38, revenue: 16200, occupancy: 64 },
      { month: 'Mar', bookings: 55, revenue: 24100, occupancy: 72 },
      { month: 'Apr', bookings: 61, revenue: 27800, occupancy: 78 },
      { month: 'May', bookings: 73, revenue: 33200, occupancy: 84 },
      { month: 'Jun', bookings: 88, revenue: 40100, occupancy: 91 },
      { month: 'Jul', bookings: 95, revenue: 44800, occupancy: 94 },
      { month: 'Aug', bookings: 90, revenue: 42100, occupancy: 92 },
      { month: 'Sep', bookings: 67, revenue: 30500, occupancy: 79 },
      { month: 'Oct', bookings: 58, revenue: 26400, occupancy: 74 },
      { month: 'Nov', bookings: 49, revenue: 21900, occupancy: 70 },
      { month: 'Dec', bookings: 76, revenue: 36200, occupancy: 86 }
    ]
  });

  /* ---------- Core storage ---------- */
  function read() {
    try {
      const raw = localStorage.getItem(DB_KEY);
      if (!raw) {
        const fresh = seed();
        localStorage.setItem(DB_KEY, JSON.stringify(fresh));
        return fresh;
      }
      return JSON.parse(raw);
    } catch (e) {
      const fresh = seed();
      localStorage.setItem(DB_KEY, JSON.stringify(fresh));
      return fresh;
    }
  }

  function write(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  }

  function reset() {
    const fresh = seed();
    write(fresh);
    return fresh;
  }

  /* ---------- Generic collection helpers ---------- */
  function getCollection(name) {
    return read()[name] || [];
  }

  function saveCollection(name, items) {
    const data = read();
    data[name] = items;
    write(data);
    return items;
  }

  function insert(name, item) {
    const data = read();
    const list = data[name] || (data[name] = []);
    list.push(item);
    write(data);
    return item;
  }

  function update(name, id, patch) {
    const data = read();
    const list = data[name] || [];
    const idx = list.findIndex((x) => x.id === id);
    if (idx === -1) return null;
    list[idx] = Object.assign({}, list[idx], patch);
    write(data);
    return list[idx];
  }

  function remove(name, id) {
    const data = read();
    data[name] = (data[name] || []).filter((x) => x.id !== id);
    write(data);
    return true;
  }

  function getById(name, id) {
    return (read()[name] || []).find((x) => x.id === id) || null;
  }

  /* ---------- ID generator ---------- */
  function uid(prefix) {
    return prefix + '-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  }

  /* ---------- Session (admin auth) ---------- */
  function login(username, password) {
    // Demo credentials
    const valid = [
      { u: 'admin', p: 'admin123' },
      { u: 'manager', p: 'manager123' }
    ];
    const match = valid.find((c) => c.u === username && c.p === password);
    if (match) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ user: username, at: Date.now() }));
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function isAuthenticated() {
    return !!localStorage.getItem(SESSION_KEY);
  }

  /* ---------- Path helper ----------
     Image paths are stored relative to the site root (e.g. "images/menu/x.jpg").
     From admin pages the browser resolves them against admin/, so we prefix
     "../" when the current page lives inside the admin folder. */
  function base() {
    return /(^|\/)admin\//.test(location.pathname) ? '../' : '';
  }

  /* ---------- Currency options (shared with admin dropdown) ---------- */
  const CURRENCIES = [
    { code: 'USD', symbol: '$', label: 'USD ($)' },
    { code: 'EUR', symbol: '€', label: 'EUR (€)' },
    { code: 'GBP', symbol: '£', label: 'GBP (£)' },
    { code: 'INR', symbol: '₹', label: 'INR (₹)' },
    { code: 'AED', symbol: 'د.إ', label: 'AED (د.إ)' },
    { code: 'SAR', symbol: '﷼', label: 'SAR (﷼)' },
    { code: 'JPY', symbol: '¥', label: 'JPY (¥)' }
  ];

  /* ---------- Public API ---------- */
  global.AuroraStore = {
    DB_KEY,
    SESSION_KEY,
    CURRENCIES,
    read,
    write,
    reset,
    getCollection,
    saveCollection,
    insert,
    update,
    remove,
    getById,
    uid,
    base,
    login,
    logout,
    isAuthenticated
  };
})(window);
