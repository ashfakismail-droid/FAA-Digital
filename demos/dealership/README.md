# Prestige Motors — Luxury Car Dealership

A premium, multi-page luxury automotive dealership website built from scratch with **HTML, CSS, Vanilla JavaScript, and LocalStorage** — no frameworks.

## Features

- **22 pages**: Home, Inventory, Vehicle Details, Finance, Trade-In, Book Test Drive, About, Services, Locations, Offers, Contact, FAQ, Blog (+ article view), Compare, Wishlist, Admin Login, Admin Dashboard, 404.
- **131 real-world vehicles** across 18 premium brands (BMW, Mercedes-Benz, Audi, Porsche, Ferrari, Lamborghini, Rolls-Royce, Bentley, Range Rover, Tesla, Volvo, Toyota, Honda, Lexus, Hyundai, Kia, Ford, Jeep).
- **Advanced inventory**: grid/list toggle, 11 filters, 6 sort modes, live search, pagination.
- **Vehicle detail**: gallery with zoom, 18-spec table, feature list, finance/EMI calculator, save/compare/share/brochure, related vehicles.
- **Finance calculator** (HP/PCP, live EMI), **Trade-In valuation** with photo preview, **Test Drive booking** with confirmation.
- **Wishlist & Compare** (up to 3, difference highlighting) — persistent via LocalStorage.
- **Admin panel**: authentication, dashboard stats, full vehicle CRUD, and management of bookings, trade-ins, inquiries, offers, and blog.
- **Design**: black/white/silver luxury palette, glassmorphism, smooth scroll reveals, dark mode, fully responsive.
- **Imagery**: unique, body-type + colour-matched SVG vehicle renderings and brand wordmarks (no placeholders, no reused photos).

## How to Run

Because the site uses `localStorage` and ES-module-free scripts, open it through a local web server (not `file://`):

```bash
# Option A — Node (included)
node tools/server.js
# then visit http://localhost:8080

# Option B — Python
python -m http.server 8080
```

### Regenerate data / imagery

```bash
node tools/generate-data.js
```

This regenerates `assets/data/*.js` and all SVG imagery in `assets/img/`.

## Admin Access

- URL: `admin/login.html`
- Username: `admin`
- Password: `prestige`

Use **Settings → Reset Demo Data** in the admin panel to restore the original generated inventory.

## Project Structure

```
.
├── index.html              # Home
├── inventory.html          # Inventory + filters
├── vehicle.html            # Vehicle details
├── finance.html            # Finance calculator
├── trade-in.html           # Trade-in valuation
├── test-drive.html         # Booking
├── about.html services.html locations.html offers.html
├── contact.html faq.html blog.html compare.html wishlist.html
├── 404.html
├── admin/                  # login.html, dashboard.html
├── assets/
│   ├── css/styles.css
│   ├── js/                 # app.js + per-page logic
│   ├── data/               # vehicles.js, blog.js, offers.js (generated)
│   └── img/                # brands/ + vehicles/ (generated SVG)
└── tools/                  # generate-data.js, server.js
```
