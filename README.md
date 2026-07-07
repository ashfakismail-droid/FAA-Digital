# FAA Digital — Website

A minimal, black-and-white agency website built with plain HTML, CSS and
JavaScript. No build step, no framework — open `index.html` in a browser or
deploy the folder as-is to any static host (Vercel, Netlify, GitHub Pages).

## Structure

```
faa-digital/
├── index.html          All page sections (Home, About, Services, Portfolio, Pricing, FAQ, Contact)
├── css/
│   ├── style.css        Design tokens, layout, and component styles
│   └── animations.css   Keyframes + scroll-reveal classes
├── js/
│   └── main.js           Nav, cursor glow, reveals, counters, accordion, form
└── images/
    ├── logo.svg          Wordmark used in nav + footer
    └── favicon.svg        Browser tab icon
```

## Quick customization

**Brand name & copy** — edit the text directly inside `index.html`. Every
section is clearly commented (`<!-- ============ SECTION ============ -->`).

**Colors** — all colors are CSS variables at the top of `css/style.css`
under `:root`. Change `--bg`, `--fg`, `--border` etc. to re-theme the whole
site in one place.

**Fonts** — swap the Google Fonts `<link>` in `index.html` and update
`--font-display`, `--font-body`, `--font-mono` in `css/style.css`.

**WhatsApp number** — update the `href` on the `.whatsapp-fab` link near the
bottom of `index.html` (replace `919999999999` with your number, country
code first, no `+` or spaces) and the pre-filled `text=` message.

**Contact form** — `js/main.js` currently only shows a success message on
submit. Connect it to a real backend or a form service (Formspree, Basin,
Getform) inside `initContactForm()` — the exact spot is marked with a
`TODO` comment.

**Pricing** — the three pricing cards live inside the `#pricing` section in
`index.html`. Add or remove `.price-card` blocks as needed; mark one
`.price-card--featured` to highlight it.

**Portfolio thumbnails** — each project cover is a CSS gradient
(`.cover--1` through `.cover--5` in `css/style.css`), no image files
required. Add new gradients or swap in real project screenshots by
replacing the `<div class="portfolio-card__cover">` with an `<img>` tag.

## Performance & accessibility notes

- No external JS libraries — vanilla JS only, keeps the site fast.
- `prefers-reduced-motion` is respected across all animations.
- Keyboard focus states are visible (`:focus-visible`) on all interactive
  elements.
- Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`) and
  `aria-*` attributes are used throughout for screen readers.
