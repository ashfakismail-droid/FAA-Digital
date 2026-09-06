# Camille & Julian — a wedding invitation on Lake Como

A self-contained, cinematic digital invitation for a fictional couple:
**Camille Moretti & Julian Hartwell**, married on **Saturday, 5 June 2027** at
**Villa Serenissima, Lenno, Lake Como**.

## Experience
- Full-screen opening: break the wax seal → the invitation rises from an envelope
  → swing-open gilded doors → the hero film begins
- Scroll-driven storytelling: golden-ink letter reveal, parallax story chapters,
  a horizontally scroll-narrated weekend rail, live countdown to the ceremony,
  drape-like curtain wipes between chapters
- Venue with live map and directions, a masonry gallery with lightbox
  (keyboard + swipe), an RSVP form, add-to-calendar (Google + .ics download)
- A generative ambient score synthesized with the Web Audio API (no audio files),
  light/dark theme, mobile-first, `prefers-reduced-motion` respected

## Run it
No build step, no server required — open `index.html`, or serve the folder:

```sh
python -m http.server 8124
# or: npx serve .
```

## Structure
```
index.html                 page & content
assets/
  css/styles.css           design system + all sections
  js/app.js                choreography (GSAP/ScrollTrigger)
  js/music.js              generative ambient score + intro SFX
  fonts/                   Cormorant Garamond & Manrope (local woff2)
  img/                     photographs & monogram, CREDITS.txt
vendor/                    GSAP 3 + ScrollTrigger (local, MIT license)
scripts/                   asset fetch / curation helpers (dev only)
```

## Notes
- Photographs are free-licensed works from the Wikimedia Commons community —
  see `assets/img/CREDITS.txt` for full titles.
- The RSVP form is front-end only: submissions are stored locally in the
  visitor's browser and a paper/mail fallback address is shown.
- Couple, families, venue, dates and schedule are entirely fictional.