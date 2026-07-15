/* ============================================================
   Aurora Grand Resort — Reusable HTML components (public site)
   Injects header + footer into [data-header] / [data-footer].
   Pass base path so links work from any folder depth.
   ============================================================ */
(function (global) {
  'use strict';

  const NAV = [
    { href: 'index.html', label: 'Home' },
    { href: 'index.html#about', label: 'About' },
    { href: 'rooms.html', label: 'Rooms' },
    { href: 'restaurant.html', label: 'Restaurant' },
    { href: 'menu.html', label: 'Menu' },
    { href: 'gallery.html', label: 'Gallery' },
    { href: 'contact.html', label: 'Contact' }
  ];

  function header(base) {
    base = base || '';
    const links = NAV.map(
      (n) => `<a href="${base}${n.href}">${n.label}</a>`
    ).join('');
    return `
    <header class="site-header">
      <div class="container nav">
        <a href="${base}index.html" class="brand">
          <span class="logo-mark">A</span>
          <span>Aurora<span class="text-gold"> Grand</span></span>
        </a>
        <nav class="nav-links">
          ${links}
          <div class="nav-divider"></div>
          <div class="nav-section-label">Developer Demo</div>
          <a href="${base}admin/login.html" class="nav-dev-link">⚙ Admin Dashboard</a>
        </nav>
        <div class="nav-actions">
          <button class="theme-toggle" data-theme-toggle data-theme-icon title="Toggle theme">☾</button>
          <a href="${base}contact.html" class="btn btn-gold btn-sm">Book Now</a>
          <a href="${base}admin/login.html" class="btn btn-outline btn-sm nav-admin-btn">Admin</a>
          <button class="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
      </div>
    </header>`;
  }

  function footer(base) {
    base = base || '';
    return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a href="${base}index.html" class="brand" style="margin-bottom:16px;">
              <span class="logo-mark">A</span>
              <span>Aurora<span class="text-gold"> Grand</span></span>
            </a>
            <p>Where elegance meets the horizon. A coastal sanctuary crafted for unforgettable stays.</p>
            <div class="footer-social">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">◎</a>
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="LinkedIn">in</a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <a href="${base}rooms.html">Rooms & Suites</a>
            <a href="${base}restaurant.html">Restaurant</a>
            <a href="${base}menu.html">Menu</a>
            <a href="${base}gallery.html">Gallery</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="${base}index.html#about">About</a>
            <a href="${base}index.html#amenities">Amenities</a>
            <a href="${base}contact.html">Contact</a>
            <a href="${base}admin/login.html">Admin Panel</a>
          </div>
          <div>
            <h4>Contact</h4>
            <p>1200 Oceanview Blvd,<br>Monterey Bay, CA 93940</p>
            <p>+1 (800) 555-0199</p>
            <p>reservations@auroragrand.com</p>
          </div>
        </div>
        <div class="footer-bottom">
          © 2026 Aurora Grand Resort. Crafted for demonstration. All rights reserved.
        </div>
      </div>
    </footer>`;
  }

  global.AuroraComponents = { header, footer, NAV };
})(window);
