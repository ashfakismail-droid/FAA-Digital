/* =============================================================
   PRESTIGE MOTORS — Blog page logic (list + article view)
   ============================================================= */
(function () {
  "use strict";
  const A = window.Prestige;
  const blog = A.store.getBlog();
  const grid = A.qs("#blogGrid");
  const cats = ["All", ...new Set(blog.map(b => b.category))];
  let activeCat = "All";
  let query = "";

  // article view?
  const slug = new URLSearchParams(location.search).get("slug");
  if (slug) { renderArticle(blog.find(b => b.slug === slug)); return; }

  // category filters
  const cf = A.qs("#catFilters");
  cats.forEach(c => {
    const b = A.el("button", { class: "toggle-group" });
    b.style.cssText = "border:none;background:none";
    const inner = A.el("button", { class: "btn btn--sm " + (c === "All" ? "btn--gold" : "btn--outline") });
    inner.textContent = c;
    inner.addEventListener("click", () => {
      activeCat = c;
      A.qsa("button", cf).forEach(x => x.classList.remove("btn--gold"), x.classList.add("btn--outline"));
      inner.className = "btn btn--sm btn--gold";
      render();
    });
    b.appendChild(inner);
    cf.appendChild(b);
  });

  A.qs("#blogSearch").addEventListener("input", e => { query = e.target.value.toLowerCase(); render(); });

  function render() {
    const list = blog.filter(b =>
      (activeCat === "All" || b.category === activeCat) &&
      (!query || (b.title + b.excerpt + b.category).toLowerCase().includes(query))
    );
    grid.innerHTML = "";
    A.qs("#blogEmpty").classList.toggle("hidden", list.length > 0);
    list.forEach(p => {
      const c = A.el("article", { class: "card reveal" });
      c.innerHTML = `
        <a href="blog.html?slug=${p.slug}"><img src="${p.image}" alt="${p.title}" style="aspect-ratio:16/9;object-fit:cover" loading="lazy"></a>
        <div style="padding:22px">
          <div class="flex between" style="margin-bottom:8px">
            <span class="badge badge--gold">${p.category}</span>
            <span class="muted" style="font-size:.8rem">${A.fmt.date(p.date)}</span>
          </div>
          <h3 style="font-size:1.2rem;margin:0 0 8px"><a href="blog.html?slug=${p.slug}">${p.title}</a></h3>
          <p class="muted" style="font-size:.9rem">${p.excerpt}</p>
          <div class="flex between" style="margin-top:12px">
            <span class="muted" style="font-size:.82rem">${p.author} · ${p.readTime} min read</span>
            <a class="btn btn--sm btn--outline" href="blog.html?slug=${p.slug}">Read</a>
          </div>
        </div>`;
      grid.appendChild(c);
    });
    A.reveal();
  }
  render();

  function renderArticle(p) {
    if (!p) { location.href = "blog.html"; return; }
    document.title = p.title + " — Prestige Motors";
    document.body.innerHTML = `
      <header id="site-nav"></header>
      <section class="page-head">
        <div class="container">
          <div class="breadcrumb" style="color:rgba(255,255,255,.6)"><a href="index.html" style="color:rgba(255,255,255,.6)">Home</a><span>/</span><a href="blog.html" style="color:rgba(255,255,255,.6)">Blog</a><span>/</span><span>${p.category}</span></div>
          <span class="badge badge--gold">${p.category}</span>
          <h1 style="margin-top:12px">${p.title}</h1>
          <p style="color:rgba(255,255,255,.7)">${p.author} · ${A.fmt.date(p.date)} · ${p.readTime} min read</p>
        </div>
      </section>
      <section class="section">
        <div class="container" style="max-width:760px">
          <img src="${p.image}" alt="${p.title}" style="border-radius:var(--radius-lg);width:100%;margin-bottom:28px">
          <p style="font-size:1.1rem">${p.excerpt}</p>
          <p>${p.body}</p>
          <div class="card section--alt" style="padding:24px;margin-top:24px">
            <h3 style="margin-top:0">Enjoyed this?</h3>
            <a class="btn btn--gold" href="blog.html">Back to Journal</a>
          </div>
        </div>
      </section>
      <footer id="site-footer"></footer>
      <script src="assets/js/app.js"><\/script>`;
    // re-init chrome after replacing body
    setTimeout(() => { if (window.Prestige) window.Prestige.initChrome(); }, 0);
  }
})();
