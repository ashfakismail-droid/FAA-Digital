/* Admin dashboard */
(function () {
  'use strict';

  function statusBadge(s) {
    const map = {
      confirmed: 'badge-green', pending: 'badge-gold',
      'checked-in': 'badge-blue', 'checked-out': 'badge-gray', cancelled: 'badge-red'
    };
    return `<span class="badge ${map[s] || 'badge-gray'}">${s}</span>`;
  }

  function renderStats() {
    const db = AuroraStore.read();
    const rooms = db.rooms;
    const totalRooms = rooms.length;
    const available = rooms.filter((r) => r.status === 'available').length;
    const reservations = db.reservations.length;
    const orders = db.orders.reduce((a, b) => a + b.bookings, 0);
    const revenue = db.orders.reduce((a, b) => a + b.revenue, 0);
    const customers = new Set(db.reservations.map((r) => r.email)).size;

    const cards = [
      { ico: '🛏', val: totalRooms, lbl: 'Total Rooms', trend: '+2 this month', up: true },
      { ico: '✅', val: available, lbl: 'Available Rooms', trend: 'Ready to book', up: true },
      { ico: '📅', val: reservations, lbl: 'Reservations', trend: '+12% vs last', up: true },
      { ico: '🍽', val: orders, lbl: 'Restaurant Orders', trend: '+8% vs last', up: true },
      { ico: '💰', val: AuroraUI.money(revenue), lbl: 'Revenue', trend: '+15% vs last', up: true },
      { ico: '👥', val: customers, lbl: 'Customers', trend: '+5 new', up: true }
    ];
    document.getElementById('stat-cards').innerHTML = cards
      .map(
        (c) => `
      <div class="stat-card">
        <div class="ico">${c.ico}</div>
        <div class="val">${c.val}</div>
        <div class="lbl">${c.lbl}</div>
        <div class="trend ${c.up ? 'up' : 'down'}">${c.up ? '▲' : '▼'} ${c.trend}</div>
      </div>`
      )
      .join('');
  }

  function renderCharts() {
    const orders = AuroraStore.read().orders;
    const labels = orders.map((o) => o.month);
    AuroraCharts.line(document.getElementById('chart-bookings'), {
      labels,
      datasets: [{ data: orders.map((o) => o.bookings), color: AuroraCharts.COLORS.gold }]
    });
    AuroraCharts.bar(document.getElementById('chart-revenue'), {
      labels,
      datasets: [{ data: orders.map((o) => o.revenue), color: AuroraCharts.COLORS.blue }]
    });
    AuroraCharts.line(document.getElementById('chart-occupancy'), {
      labels,
      datasets: [{ data: orders.map((o) => o.occupancy), color: AuroraCharts.COLORS.green, fill: true }]
    });
    const rooms = AuroraStore.read().rooms;
    const dist = {
      available: rooms.filter((r) => r.status === 'available').length,
      booked: rooms.filter((r) => r.status === 'booked').length,
      maintenance: rooms.filter((r) => r.status === 'maintenance').length
    };
    AuroraCharts.doughnut(document.getElementById('chart-rooms'), {
      data: [dist.available, dist.booked, dist.maintenance],
      colors: [AuroraCharts.COLORS.green, AuroraCharts.COLORS.red, '#6c7d92'],
      centerText: String(rooms.length)
    });
  }

  function renderRecent() {
    const db = AuroraStore.read();
    const recent = [...db.reservations].slice(-5).reverse();
    document.getElementById('recent-reservations').innerHTML = recent
      .map((r) => {
        const room = db.rooms.find((x) => x.id === r.roomId);
        return `<tr>
          <td class="cell-strong">${r.id}</td>
          <td>${r.guest}</td>
          <td>${room ? room.name : '—'}</td>
          <td>${AuroraUI.formatDate(r.checkIn)} → ${AuroraUI.formatDate(r.checkOut)}</td>
          <td>${statusBadge(r.status)}</td>
          <td class="cell-strong">${AuroraUI.money(r.total)}</td>
        </tr>`;
      })
      .join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!AuroraAdmin.guard()) return;
    AuroraUI.initTheme();
    AuroraUI.bindModals();
    AuroraAdmin.injectSidebar();
    AuroraAdmin.injectTopbar('Dashboard');
    renderStats();
    renderCharts();
    renderRecent();
    window.addEventListener('resize', AuroraUI.debounce(renderCharts, 250));
  });
})();
