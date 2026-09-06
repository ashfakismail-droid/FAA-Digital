# FAA Digital — Website (V1)

A premium, dark, conversion-focused digital agency website built with plain
HTML, CSS and JavaScript. No build step, no framework — open `index.html` in
a browser or deploy the folder as-is to any static host (Vercel, Netlify,
GitHub Pages).

V1 refines the original site into a polished, client-ready agency presence:
clearer positioning, business-focused services, trust sections (Why Us,
Process, Testimonials), and improved SEO — while preserving the original
design system and all live demo projects.

## Structure

```
faa digital v1/
├── index.html           All sections (Hero, About, Services, Work, Why Us,
│                        Process, Testimonials, Pricing, FAQ, CTA, Contact)
├── css/
│   ├── style.css        Design tokens, layout, and component styles
│   └── animations.css   Keyframes + scroll-reveal classes
├── js/
│   └── main.js          Nav, cursor glow, reveals, counters, accordion, form
├── images/
│   ├── logo.svg         Wordmark used in nav + footer
│   └── favicon.svg      Browser tab icon
├── demos/               Live client demo projects (linked from the portfolio)
├── robots.txt
└── sitemap.xml
```

## Sections

Hero · About · Services (9 business solutions) · Portfolio (9 live demos,
1 featured) · Why FAA Digital · Process (7 steps) · Testimonials · Pricing ·
FAQ · CTA banner · Contact · Footer.

## Quick customization

**Copy** — edit text directly in `index.html`. Each section is clearly
commented (`<!-- ============ SECTION ============ -->`).

**Colors** — all colors are CSS variables at the top of `css/style.css` under
`:root` (`--bg`, `--fg`, `--accent`, etc.). Change once to re-theme the site.

**Fonts** — swap the Google Fonts `<link>` in `index.html` and update
`--font-display`, `--font-body`, `--font-mono` in `css/style.css`.

**Contact form** — `js/main.js` shows a success/fallback message on submit.
To receive enquiries, set `FORM_ENDPOINT` inside `initContactForm()` to a
Formspree/Getform/Basin endpoint. Until then it falls back to opening the
visitor's email client pre-filled.

**WhatsApp number** — update the `href` on the `.whatsapp-fab` link near the
bottom of `index.html` (replace `919999999999`, country code first, no `+`).

**Portfolio** — each project card links to a live demo under `demos/`. Cards
without a photo fall back to a styled gradient cover (`cover--*` classes).

**Testimonials** — the section ships with elegant placeholders. Replace the
`<blockquote>` text, name and role with real client feedback when available.

## SEO

Meta title/description, Open Graph, Twitter Cards, JSON-LD structured data,
canonical URL, `robots.txt` and `sitemap.xml` are included. Replace the
placeholder domain `https://faadigital.com/` and add a real
`images/og-image.jpg` (1200×630) before going live.

## Performance & accessibility

- No external JS libraries — vanilla JS only.
- `prefers-reduced-motion` respected across all animations.
- Visible `:focus-visible` states on interactive elements.
- Semantic HTML and ARIA attributes throughout.
- Lazy-loading on portfolio preview images.
