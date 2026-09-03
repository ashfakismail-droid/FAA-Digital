/* =============================================================
   PRESTIGE MOTORS — Admin Dashboard logic (full CRUD)
   ============================================================= */
(function () {
  "use strict";
  const A = window.Prestige;

  if (!A.store.getAdmin().loggedIn) { location.href = "login.html"; return; }

  const main = A.qs("#adminMain");
  const nav = A.qs("#adminNav");
  const vehicles = A.store.getVehicles();

  A.qs("#adminLogout").addEventListener("click", () => { A.store.logout(); location.href = "login.html"; });

  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    nav.querySelectorAll("a").forEach(x => x.classList.remove("active"));
    a.classList.add("active");
    render(a.dataset.view);
  }));

  /* ---------- helpers ---------- */
  function statCard(n, l, c) {
    return `<div class="admin-stat"><div class="n" style="${c ? "color:" + c : ""}">${n}</div><div class="l">${l}</div></div>`;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m])); }

  /* ---------- DASHBOARD ---------- */
  function viewDashboard() {
    const bookings = A.store.getBookings();
    const tradeins = A.store.getTradeIns();
    const inquiries = A.store.getInquiries();
    const offers = A.store.getOffers();
    const newCount = vehicles.filter(v => v.condition === "New").length;
    main.innerHTML = `
      <h1 style="margin-top:0">Dashboard</h1>
      <p class="muted">Welcome back. Here's what's happening at Prestige Motors.</p>
      <div class="admin-cards">
        ${statCard(vehicles.length, "Total Vehicles")}
        ${statCard(newCount, "New in Stock", "var(--c-success)")}
        ${statCard(bookings.length, "Test Drive Requests")}
        ${statCard(tradeins.length, "Trade-In Requests", "var(--c-gold)")}
      </div>
      <div class="grid" style="grid-template-columns:1fr 1fr;gap:24px">
        <div class="card" style="padding:24px">
          <h3 style="margin-top:0">Recent Test Drive Requests</h3>
          ${bookings.length ? bookings.slice(-5).reverse().map(b => `<div class="flex between" style="padding:10px 0;border-bottom:1px solid var(--line)"><div><strong>${esc(b.name)}</strong><div class="muted" style="font-size:.82rem">${esc(b.vehicle)} · ${b.dealer}</div></div><span class="badge">${b.status}</span></div>`).join("") : '<p class="muted">No requests yet.</p>'}
        </div>
        <div class="card" style="padding:24px">
          <h3 style="margin-top:0">Recent Inquiries</h3>
          ${inquiries.length ? inquiries.slice(-5).reverse().map(i => `<div class="flex between" style="padding:10px 0;border-bottom:1px solid var(--line)"><div><strong>${esc(i.name)}</strong><div class="muted" style="font-size:.82rem">${esc(i.dept)} · ${esc(i.email)}</div></div></div>`).join("") : '<p class="muted">No inquiries yet.</p>'}
        </div>
      </div>
      <div class="card" style="padding:24px;margin-top:24px">
        <h3 style="margin-top:0">Inventory by Brand</h3>
        <div class="grid" style="grid-template-columns:repeat(3,1fr);gap:12px">
          ${Object.entries(vehicles.reduce((m, v) => (m[v.brand] = (m[v.brand] || 0) + 1, m), {})).sort((a, b) => b[1] - a[1]).map(([b, n]) => `<div class="flex between" style="padding:8px 0"><span>${esc(b)}</span><strong>${n}</strong></div>`).join("")}
        </div>
      </div>`;
  }

  /* ---------- VEHICLES (CRUD) ---------- */
  function viewVehicles() {
    let list = A.store.getVehicles();
    main.innerHTML = `
      <div class="flex between" style="align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <h1 style="margin:0">Vehicle Management</h1>
        <div class="flex" style="gap:10px">
          <input type="search" id="vSearch" placeholder="Search…" style="padding:11px 14px;border:1px solid var(--line);border-radius:var(--radius);background:var(--bg);color:var(--text)">
          <button class="btn btn--gold" id="addVehicle">+ Add Vehicle</button>
        </div>
      </div>
      <div style="overflow-x:auto"><table class="table" id="vTable">
        <thead><tr><th>Image</th><th>Brand</th><th>Model</th><th>Year</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody></tbody>
      </table></div>`;

    const tbody = A.qs("#vTable tbody");
    function draw() {
      const q = A.qs("#vSearch").value.toLowerCase();
      const data = list.filter(v => !q || (v.brand + v.model + v.year).toLowerCase().includes(q));
      tbody.innerHTML = data.map(v => `<tr>
        <td><img src="${v.gallery[0]}" alt=""></td>
        <td><strong>${esc(v.brand)}</strong></td>
        <td>${esc(v.model)}</td>
        <td>${v.year}</td>
        <td>${A.fmt.gbp(v.price)}</td>
        <td><span class="badge ${v.availability === "In Stock" ? "badge--new" : v.availability === "Reserved" ? "badge--reserved" : ""}">${v.availability}</span></td>
        <td><div class="flex" style="gap:6px">
          <button class="icon-btn" data-edit="${v.id}" title="Edit">✎</button>
          <button class="icon-btn danger" data-del="${v.id}" title="Delete">🗑</button>
        </div></td>
      </tr>`).join("");
      tbody.querySelectorAll("[data-edit]").forEach(b => b.addEventListener("click", () => openVehicleForm(+b.dataset.edit)));
      tbody.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => deleteVehicle(+b.dataset.del)));
    }
    A.qs("#vSearch").addEventListener("input", draw);
    draw();

    A.qs("#addVehicle").addEventListener("click", () => openVehicleForm(null));
  }

  function openVehicleForm(id) {
    const v = id ? A.store.getVehicles().find(x => x.id === id) : null;
    const brands = [...new Set(A.store.getVehicles().map(x => x.brand))].sort();
    const content = `
      <h2 style="margin-top:0">${v ? "Edit" : "Add"} Vehicle</h2>
      <form id="vehForm">
        <div class="form-row">
          <div class="field"><label>Brand</label><input name="brand" value="${v ? esc(v.brand) : ""}" list="brandList" required><datalist id="brandList">${brands.map(b => `<option value="${b}">`).join("")}</datalist></div>
          <div class="field"><label>Model</label><input name="model" value="${v ? esc(v.model) : ""}" required></div>
        </div>
        <div class="form-row">
          <div class="field"><label>Year</label><input name="year" type="number" value="${v ? v.year : 2024}" required></div>
          <div class="field"><label>Price (£)</label><input name="price" type="number" value="${v ? v.price : 50000}" required></div>
        </div>
        <div class="form-row">
          <div class="field"><label>Body Type</label><input name="bodyType" value="${v ? esc(v.bodyType) : "Sedan"}" required></div>
          <div class="field"><label>Fuel</label><select name="fuel">${["Petrol","Diesel","Hybrid","Electric"].map(f => `<option ${v && v.fuel === f ? "selected" : ""}>${f}</option>`).join("")}</select></div>
        </div>
        <div class="form-row">
          <div class="field"><label>Transmission</label><select name="transmission">${["Automatic","Manual"].map(f => `<option ${v && v.transmission === f ? "selected" : ""}>${f}</option>`).join("")}</select></div>
          <div class="field"><label>Drive</label><select name="drive">${["FWD","RWD","AWD","4WD"].map(f => `<option ${v && v.drive === f ? "selected" : ""}>${f}</option>`).join("")}</select></div>
        </div>
        <div class="form-row">
          <div class="field"><label>Horsepower</label><input name="horsepower" type="number" value="${v ? v.horsepower : 300}"></div>
          <div class="field"><label>Seats</label><input name="seats" type="number" value="${v ? v.seats : 5}"></div>
        </div>
        <div class="form-row">
          <div class="field"><label>Engine</label><input name="engine" value="${v ? esc(v.engine) : "2.0L Turbo I4"}"></div>
          <div class="field"><label>Exterior Color</label><input name="exteriorColor" value="${v ? esc(v.exteriorColor) : "Alpine White"}"></div>
        </div>
        <div class="form-row">
          <div class="field"><label>Top Speed (mph)</label><input name="topSpeed" type="number" value="${v ? v.topSpeed : 200}"></div>
          <div class="field"><label>0-100 (s)</label><input name="acceleration" step="0.1" value="${v ? v.acceleration : 6}"></div>
        </div>
        <div class="form-row">
          <div class="field"><label>Mileage (mi)</label><input name="mileage" type="number" value="${v ? v.mileage : 0}"></div>
          <div class="field"><label>Availability</label><select name="availability">${["In Stock","Reserved","Coming Soon"].map(f => `<option ${v && v.availability === f ? "selected" : ""}>${f}</option>`).join("")}</select></div>
        </div>
        <div class="field"><label>Interior Color</label><input name="interiorColor" value="${v ? esc(v.interiorColor) : "Black Leather"}"></div>
        <div class="field"><label>Description</label><textarea name="description">${v ? esc(v.description) : ""}</textarea></div>
        <div class="flex" style="gap:10px;margin-top:10px">
          <button class="btn btn--gold" type="submit">${v ? "Save Changes" : "Create Vehicle"}</button>
          <button class="btn btn--outline" type="button" onclick="Prestige.modal.close()">Cancel</button>
        </div>
      </form>`;
    const box = A.modal.open(content);
    box.querySelector("#vehForm").addEventListener("submit", e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const data = Object.fromEntries(fd.entries());
      data.year = +data.year; data.price = +data.price; data.horsepower = +data.horsepower;
      data.seats = +data.seats; data.topSpeed = +data.topSpeed; data.acceleration = +data.acceleration; data.mileage = +data.mileage;
      data.emi = Math.round((data.price * 0.018) / 10) * 10;
      data.condition = data.year >= 2024 ? "New" : "Used";
      data.features = v ? v.features : ["Adaptive Cruise Control", "Premium Sound System", "Keyless Entry"];
      data.featured = v ? v.featured : false; data.offer = v ? v.offer : false;
      data.dateAdded = v ? v.dateAdded : new Date().toISOString();
      // keep gallery or generate placeholder
      if (!v) {
        data.id = Math.max(0, ...A.store.getVehicles().map(x => x.id)) + 1;
        data.slug = A.fmt.slug(`${data.brand}-${data.model}-${data.year}-${data.id}`);
        data.vin = Array.from({ length: 17 }, () => "ABCDEFGHJKLMNPRSTUVWXYZ0123456789"[Math.floor(Math.random() * 34)]).join("");
        data.gallery = ["assets/img/vehicles/v1_exterior-front.svg", "assets/img/vehicles/v1_exterior-side.svg", "assets/img/vehicles/v1_rear-view.svg", "assets/img/vehicles/v1_interior.svg", "assets/img/vehicles/v1_detail.svg"];
      } else {
        data.id = v.id; data.slug = v.slug; data.vin = v.vin; data.gallery = v.gallery;
      }
      let all = A.store.getVehicles();
      if (v) all = all.map(x => x.id === v.id ? data : x); else all.push(data);
      A.store.saveVehicles(all);
      A.modal.close();
      A.toast("Vehicle saved", "success");
      viewVehicles();
    });
  }

  function deleteVehicle(id) {
    const v = A.store.getVehicles().find(x => x.id === id);
    A.modal.open(`<div style="text-align:center"><div style="font-size:2.4rem">⚠️</div><h2 style="margin:10px 0">Delete ${esc(v.brand)} ${esc(v.model)}?</h2><p class="muted">This action cannot be undone.</p><div class="flex" style="gap:10px;justify-content:center"><button class="btn btn--outline" onclick="Prestige.modal.close()">Cancel</button><button class="btn" style="background:var(--c-danger);color:#fff" id="confirmDel">Delete</button></div></div>`);
    A.qs("#confirmDel").addEventListener("click", () => {
      A.store.saveVehicles(A.store.getVehicles().filter(x => x.id !== id));
      A.modal.close(); A.toast("Vehicle deleted", "success"); viewVehicles();
    });
  }

  /* ---------- BOOKINGS ---------- */
  function viewBookings() {
    const list = A.store.getBookings().slice().reverse();
    main.innerHTML = `<h1 style="margin-top:0">Test Drive Requests</h1>
      <div style="overflow-x:auto"><table class="table"><thead><tr><th>Name</th><th>Vehicle</th><th>Showroom</th><th>Date</th><th>Time</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>${list.length ? list.map(b => `<tr><td><strong>${esc(b.name)}</strong><div class="muted" style="font-size:.8rem">${esc(b.email)}</div></td><td>${esc(b.vehicle)}</td><td>${esc(b.dealer)}</td><td>${A.fmt.date(b.date)}</td><td>${b.time}</td><td><span class="badge">${b.status}</span></td><td><button class="icon-btn danger" data-rm="${b.id}" title="Remove">🗑</button></td></tr>`).join("") : '<tr><td colspan="7" class="muted">No requests.</td></tr>'}</tbody></table></div>`;
    main.querySelectorAll("[data-rm]").forEach(b => b.addEventListener("click", () => { A.store.removeBooking(+b.dataset.rm); viewBookings(); }));
  }

  /* ---------- TRADE-INS ---------- */
  function viewTradeIns() {
    const list = A.store.getTradeIns().slice().reverse();
    main.innerHTML = `<h1 style="margin-top:0">Trade-In Requests</h1>
      <div style="overflow-x:auto"><table class="table"><thead><tr><th>Customer</th><th>Vehicle</th><th>Year</th><th>Mileage</th><th>Condition</th><th>Estimate</th><th>Action</th></tr></thead>
      <tbody>${list.length ? list.map(t => `<tr><td><strong>${esc(t.name)}</strong><div class="muted" style="font-size:.8rem">${esc(t.email)}</div></td><td>${esc(t.make)} ${esc(t.model)}</td><td>${t.year}</td><td>${t.mileage.toLocaleString()} mi</td><td>${esc(t.condition)}</td><td><strong>${esc(t.estimate)}</strong></td><td><button class="icon-btn danger" data-rm="${t.id}" title="Remove">🗑</button></td></tr>`).join("") : '<tr><td colspan="7" class="muted">No requests.</td></tr>'}</tbody></table></div>`;
    main.querySelectorAll("[data-rm]").forEach(b => b.addEventListener("click", () => { const l = A.store.getTradeIns().filter(x => x.id != b.dataset.rm); A.store.set("pm_tradeins", l); viewTradeIns(); }));
  }

  /* ---------- INQUIRIES ---------- */
  function viewInquiries() {
    const list = A.store.getInquiries().slice().reverse();
    main.innerHTML = `<h1 style="margin-top:0">Customer Inquiries</h1>
      <div style="overflow-x:auto"><table class="table"><thead><tr><th>Name</th><th>Dept</th><th>Message</th><th>Contact</th><th>Action</th></tr></thead>
      <tbody>${list.length ? list.map(i => `<tr><td><strong>${esc(i.name)}</strong></td><td><span class="badge badge--gold">${esc(i.dept)}</span></td><td style="max-width:280px">${esc(i.msg)}</td><td class="muted" style="font-size:.82rem">${esc(i.email)}<br>${esc(i.phone || "")}</td><td><button class="icon-btn danger" data-rm="${i.id}" title="Remove">🗑</button></td></tr>`).join("") : '<tr><td colspan="5" class="muted">No inquiries.</td></tr>'}</tbody></table></div>`;
    main.querySelectorAll("[data-rm]").forEach(b => b.addEventListener("click", () => { const l = A.store.getInquiries().filter(x => x.id != b.dataset.rm); A.store.set("pm_inquiries", l); viewInquiries(); }));
  }

  /* ---------- OFFERS ---------- */
  function viewOffers() {
    let list = A.store.getOffers();
    main.innerHTML = `<div class="flex between" style="align-items:center;margin-bottom:20px"><h1 style="margin:0">Offers Management</h1><button class="btn btn--gold" id="addOffer">+ Add Offer</button></div>
      <div style="overflow-x:auto"><table class="table"><thead><tr><th>Title</th><th>Type</th><th>Discount</th><th>Expires</th><th>Actions</th></tr></thead>
      <tbody id="offerBody"></tbody></table></div>`;
    const body = A.qs("#offerBody");
    function draw() {
      body.innerHTML = list.map(o => `<tr><td><strong>${esc(o.title)}</strong><div class="muted" style="font-size:.82rem">${esc(o.subtitle)}</div></td><td><span class="badge badge--gold">${esc(o.type)}</span></td><td><strong>${esc(o.discount)}</strong></td><td>${A.fmt.date(o.expires)}</td><td><div class="flex" style="gap:6px"><button class="icon-btn" data-edit="${o.id}">✎</button><button class="icon-btn danger" data-del="${o.id}">🗑</button></div></td></tr>`).join("");
      body.querySelectorAll("[data-edit]").forEach(b => b.addEventListener("click", () => openOfferForm(+b.dataset.edit)));
      body.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => { list = list.filter(x => x.id != b.dataset.del); A.store.saveOffers(list); draw(); A.toast("Offer deleted", "success"); }));
    }
    draw();
    A.qs("#addOffer").addEventListener("click", () => openOfferForm(null));
    function openOfferForm(id) {
      const o = id ? list.find(x => x.id === id) : null;
      const box = A.modal.open(`<h2 style="margin-top:0">${o ? "Edit" : "Add"} Offer</h2><form id="offerForm">
        <div class="field"><label>Title</label><input name="title" value="${o ? esc(o.title) : ""}" required></div>
        <div class="field"><label>Subtitle</label><input name="subtitle" value="${o ? esc(o.subtitle) : ""}"></div>
        <div class="form-row"><div class="field"><label>Type</label><input name="type" value="${o ? esc(o.type) : "Finance"}"></div><div class="field"><label>Discount</label><input name="discount" value="${o ? esc(o.discount) : "0%"}"></div></div>
        <div class="field"><label>Expires</label><input name="expires" type="date" value="${o ? o.expires : "2025-12-31"}"></div>
        <div class="field"><label>Description</label><textarea name="description">${o ? esc(o.description) : ""}</textarea></div>
        <div class="flex" style="gap:10px"><button class="btn btn--gold" type="submit">Save</button><button class="btn btn--outline" type="button" onclick="Prestige.modal.close()">Cancel</button></div>
      </form>`);
      box.querySelector("#offerForm").addEventListener("submit", e => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.target).entries());
        if (o) { Object.assign(o, fd); } else { fd.id = Math.max(0, ...list.map(x => x.id)) + 1; list.push(fd); }
        A.store.saveOffers(list); A.modal.close(); A.toast("Offer saved", "success"); draw();
      });
    }
  }

  /* ---------- BLOG ---------- */
  function viewBlog() {
    let list = A.store.getBlog();
    main.innerHTML = `<div class="flex between" style="align-items:center;margin-bottom:20px"><h1 style="margin:0">Blog Management</h1><button class="btn btn--gold" id="addPost">+ Add Article</button></div>
      <div style="overflow-x:auto"><table class="table"><thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Actions</th></tr></thead>
      <tbody id="blogBody"></tbody></table></div>`;
    const body = A.qs("#blogBody");
    function draw() {
      body.innerHTML = list.map(p => `<tr><td><strong>${esc(p.title)}</strong></td><td><span class="badge badge--gold">${esc(p.category)}</span></td><td>${A.fmt.date(p.date)}</td><td><div class="flex" style="gap:6px"><button class="icon-btn" data-edit="${p.id}">✎</button><button class="icon-btn danger" data-del="${p.id}">🗑</button></div></td></tr>`).join("");
      body.querySelectorAll("[data-edit]").forEach(b => b.addEventListener("click", () => openPostForm(+b.dataset.edit)));
      body.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => { list = list.filter(x => x.id != b.dataset.del); A.store.set("pm_blog", list); draw(); A.toast("Article deleted", "success"); }));
    }
    draw();
    A.qs("#addPost").addEventListener("click", () => openPostForm(null));
    function openPostForm(id) {
      const p = id ? list.find(x => x.id === id) : null;
      const box = A.modal.open(`<h2 style="margin-top:0">${p ? "Edit" : "Add"} Article</h2><form id="postForm">
        <div class="field"><label>Title</label><input name="title" value="${p ? esc(p.title) : ""}" required></div>
        <div class="form-row"><div class="field"><label>Category</label><input name="category" value="${p ? esc(p.category) : "News"}"></div><div class="field"><label>Author</label><input name="author" value="${p ? esc(p.author) : "Editorial Team"}"></div></div>
        <div class="field"><label>Excerpt</label><textarea name="excerpt">${p ? esc(p.excerpt) : ""}</textarea></div>
        <div class="field"><label>Body</label><textarea name="body">${p ? esc(p.body) : ""}</textarea></div>
        <div class="flex" style="gap:10px"><button class="btn btn--gold" type="submit">Save</button><button class="btn btn--outline" type="button" onclick="Prestige.modal.close()">Cancel</button></div>
      </form>`);
      box.querySelector("#postForm").addEventListener("submit", e => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.target).entries());
        if (p) { Object.assign(p, fd); } else { fd.id = Math.max(0, ...list.map(x => x.id)) + 1; fd.slug = A.fmt.slug(fd.title); fd.date = new Date().toISOString().slice(0, 10); fd.readTime = 5; fd.image = "assets/img/vehicles/v1_exterior-side.svg"; list.push(fd); }
        A.store.set("pm_blog", list); A.modal.close(); A.toast("Article saved", "success"); draw();
      });
    }
  }

  /* ---------- SETTINGS ---------- */
  function viewSettings() {
    const theme = A.store.getTheme() || "light";
    main.innerHTML = `<h1 style="margin-top:0">Settings</h1>
      <div class="card" style="padding:28px;max-width:560px">
        <h3 style="margin-top:0">Appearance</h3>
        <div class="field"><label>Default Theme</label>
          <select id="setTheme"><option value="light" ${theme === "light" ? "selected" : ""}>Light</option><option value="dark" ${theme === "dark" ? "selected" : ""}>Dark</option></select>
        </div>
        <h3>Account</h3>
        <p class="muted">Logged in as <strong>${esc(A.store.getAdmin().user || "admin")}</strong></p>
        <div class="flex" style="gap:10px">
          <button class="btn btn--gold" id="saveSettings">Save Settings</button>
          <button class="btn btn--outline" id="resetData">Reset Demo Data</button>
        </div>
        <p class="form-note" style="margin-top:14px">Reset Demo Data restores the original generated inventory (clears admin edits, bookings, and saved lists).</p>
      </div>`;
    A.qs("#saveSettings").addEventListener("click", () => {
      A.store.setTheme(A.qs("#setTheme").value);
      document.documentElement.setAttribute("data-theme", A.qs("#setTheme").value);
      A.toast("Settings saved", "success");
    });
    A.qs("#resetData").addEventListener("click", () => {
      ["pm_vehicles", "pm_offers", "pm_bookings", "pm_tradeins", "pm_inquiries", "pm_wishlist", "pm_compare", "pm_blog"].forEach(k => localStorage.removeItem(k));
      A.toast("Demo data reset. Reloading…", "success");
      setTimeout(() => location.reload(), 800);
    });
  }

  /* ---------- router ---------- */
  function render(view) {
    switch (view) {
      case "vehicles": viewVehicles(); break;
      case "bookings": viewBookings(); break;
      case "tradeins": viewTradeIns(); break;
      case "inquiries": viewInquiries(); break;
      case "offers": viewOffers(); break;
      case "blog": viewBlog(); break;
      case "settings": viewSettings(); break;
      default: viewDashboard();
    }
  }
  render("dashboard");
})();
