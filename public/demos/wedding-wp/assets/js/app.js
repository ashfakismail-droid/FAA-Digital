/* ============================================================
   CAMILLE & JULIAN — experience choreography
   Intro envelope → gates → hero entrance → scroll narrative
   Powered by GSAP + ScrollTrigger.
   ============================================================ */
(function () {
  'use strict';

  const q = s => document.querySelector(s);
  const qa = s => Array.from(document.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = () => window.innerWidth >= 900;

  if (history.scrollRestoration) history.scrollRestoration = 'manual';

  const state = {
    introDone: false,
    music: false,
    theme: document.documentElement.getAttribute('data-theme') === 'night' ? 'night' : 'ivory'
  };

  /* ---------- unlock & reveal helpers ---------- */
  function unlockPage() {
    document.body.classList.remove('intro-locked');
    q('#site-header').hidden = false;
  }

  /* ---------- theme ---------- */
  function setupTheme() {
    const btn = q('#btn-theme');
    btn.addEventListener('click', () => {
      state.theme = state.theme === 'ivory' ? 'night' : 'ivory';
      document.documentElement.setAttribute('data-theme', state.theme);
      btn.setAttribute('aria-pressed', state.theme === 'night');
      try { localStorage.setItem('cj-theme', state.theme); } catch (e) {}
    });
    btn.setAttribute('aria-pressed', state.theme === 'night');
  }

  /* ---------- header / scroll progress ---------- */
  function setupChrome() {
    gsap.set('#progress span', { scaleX: 0 });
    gsap.to('#progress span', {
      scaleX: 1, ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
    });

    const header = q('#site-header');
    ScrollTrigger.create({
      start: 80,
      onEnter: () => header.classList.add('solid'),
      onLeaveBack: () => header.classList.remove('solid')
    });
  }

  /* ---------- navigation + mobile drawer ---------- */
  function setupNav() {
    const drawer = q('#drawer');
    const menuBtn = q('#btn-menu');

    function closeDrawer() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
    }

    menuBtn.addEventListener('click', () => {
      const willOpen = !drawer.classList.contains('open');
      drawer.classList.toggle('open', willOpen);
      drawer.setAttribute('aria-hidden', String(!willOpen));
      menuBtn.setAttribute('aria-expanded', String(willOpen));
    });

    qa('[data-nav]').forEach(a => {
      a.addEventListener('click', e => {
        closeDrawer();
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = q(id);
        if (!target) return;
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 8;
        window.scrollTo({ top: Math.max(0, y), behavior: reduced ? 'auto' : 'smooth' });
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  /* ---------- music control ---------- */
  function setupMusic() {
    const btn = q('#btn-music');
    const paint = () => {
      btn.classList.toggle('btn-playing', state.music);
      btn.classList.toggle('btn-muted', !state.music);
      btn.setAttribute('aria-pressed', String(state.music));
      btn.title = state.music ? 'Pause the music' : 'Play the music';
    };
    btn.addEventListener('click', () => {
      state.music = window.CJMusic.toggle();
      paint();
    });
    paint();
  }

  /* ============================================================
   THE INTRO — envelope, gates, hero
   ============================================================ */
  function setupIntro() {
    const envScreen = q('#stage-envelope');
    const gatesScreen = q('#stage-gates');
    const seal = q('#btn-seal');
    const envFlap = q('.env-flap');
    const envCard = q('#env-card');
    const cardInner = q('.card-inner');
    const enterBtn = q('#btn-enter');
    const gateFrame = q('#btn-gates');
    const heroBg = q('.hero-bg img');
    const heroKicker = q('.hero-kicker');
    const names = qa('.h-name');
    const amp = q('.h-amp');
    const heroDate = q('.hero-date');
    const heroVenue = q('.hero-venue');
    const cue = q('.scroll-cue');
    let opened = false;

    /* ----- seal broken → invitation card rises ----- */
    function openEnvelope() {
      if (state.introDone || opened) return;
      opened = true;
      window.CJMusic.crack();
      seal.classList.add('breaking');
      setTimeout(() => seal.classList.add('gone'), 560);

      gsap.to(envFlap, {
        rotateX: -168,
        transformOrigin: '50% 0%',
        duration: 1.15,
        ease: 'power2.inOut',
        delay: 0.28
      });

      envCard.hidden = false;
      gsap.set(envCard, { autoAlpha: 1 });
      gsap.fromTo(cardInner,
        { scale: 0.42, yPercent: 130, rotateX: 42, autoAlpha: 0 },
        {
          scale: 1, yPercent: 0, rotateX: 0, autoAlpha: 1,
          duration: 1.1, ease: 'power3.out', delay: 0.45
        });

      const lines = Array.from(cardInner.children).filter(el => el !== enterBtn);
      gsap.set(lines, { autoAlpha: 0, y: 16 });
      gsap.to(lines, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.09, delay: 1.15 });
      gsap.fromTo(enterBtn,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.8, delay: 2.0, ease: 'power2.out' });
    }

    seal.addEventListener('click', openEnvelope);
    seal.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); }
    });

    /* ----- card → gates stage ----- */
    function toGates() {
      if (state.introDone) return;
      gsap.to(envCard, { autoAlpha: 0, scale: 0.94, duration: 0.5, ease: 'power2.in', onComplete: () => { envCard.hidden = true; } });
      gsap.to(envScreen, {
        autoAlpha: 0, duration: 0.7, delay: 0.25, ease: 'power2.inOut',
        onComplete: () => { envScreen.hidden = true; }
      });
      gatesScreen.hidden = false;
      gsap.fromTo(gatesScreen, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, delay: 0.35 });
      gateFrame.focus({ preventScroll: true });
    }
    enterBtn.addEventListener('click', toGates);

    /* ----- gates open → cinematic camera through → hero ----- */
    function openGates() {
      if (state.introDone) return;
      state.introDone = true;
      window.CJMusic.door();
      startMusic();

      const glow = q('.gate-threshold');
      const doorL = q('.door-left');
      const doorR = q('.door-right');
      gsap.set(glow, { autoAlpha: 0 });

      const tl = gsap.timeline();
      tl.to(glow, { autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, 0.15)
        .to(doorL, { rotationY: -112, x: -18, z: 6, duration: 1.7, ease: 'power3.inOut' }, 0.25)
        .to(doorR, { rotationY: 112,  x: 18,  z: 6, duration: 1.7, ease: 'power3.inOut' }, 0.37)
        .to(gatesScreen, {
          scale: 1.35, filter: 'blur(6px)', autoAlpha: 0, duration: 1.4,
          ease: 'power2.in', delay: 1.1
        });
      tl.eventCallback('onComplete', () => {
        gatesScreen.hidden = true;
        gsap.set(gatesScreen, { clearProps: 'all' });
        ScrollTrigger.refresh();
        revealHero();
      });
    }
    gateFrame.addEventListener('click', openGates);
    gateFrame.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGates(); }
    });

    /* ----- hero entrance ----- */
    function revealHero() {
      unlockPage();
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(heroBg, { scale: 1.16, y: '-4%' }, { scale: 1, y: '0%', duration: 2.8, ease: 'power2.out' }, 0)
        .fromTo(heroKicker, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 0.55)
        .fromTo(names, { autoAlpha: 0, y: 46, letterSpacing: '0.06em' }, { autoAlpha: 1, y: 0, letterSpacing: '0.015em', duration: 1.5, ease: 'power3.out', stagger: 0.22 }, 0.8)
        .fromTo(amp, { autoAlpha: 0, scale: 0.5, rotation: -12 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 1.1, ease: 'back.out(1.6)' }, 1.6)
        .fromTo(heroDate, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }, 1.7)
        .fromTo(heroVenue, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }, 1.9)
        .fromTo(cue, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, 2.3);

      if (!reduced) setupDust();
    }

    /* ----- reduced-motion / fallback: skip the film opening ----- */
    if (reduced || !window.CJMusic) {
      envScreen.hidden = true;
      gatesScreen.hidden = true;
      unlockPage();
      gsap.set([names, amp, heroDate, heroVenue, cue, heroKicker], { autoAlpha: 1 });
      gsap.set('.reveal, .reveal-chapter, .reveal-event', { autoAlpha: 1, y: 0 });
      qa('.word').forEach(w => w.classList.add('lit'));
    }
  }

  function startMusic() {
    if (state.music) return;
    state.music = true;
    window.CJMusic.play();
    const btn = q('#btn-music');
    btn.classList.add('btn-playing');
    btn.classList.remove('btn-muted');
    btn.setAttribute('aria-pressed', 'true');
    btn.title = 'Pause the music';
  }

  /* ============================================================
   SCROLL NARRATIVE — dust · letter · curtains · story · events · countdown
   ============================================================ */

  /* ---------- floating golden dust (canvas) ---------- */
  function setupDust() {
    const canvas = q('#hero-dust');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, raf;
    const N = window.innerWidth < 640 ? 34 : 62;
    const parts = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      r: 0.7 + Math.random() * 1.9,
      vx: (Math.random() - 0.5) * 0.06,
      vy: -(0.02 + Math.random() * 0.07),
      a: 0.12 + Math.random() * 0.35,
      tw: Math.random() * Math.PI * 2
    }));

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    let visible = true;
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      onToggle: self => { visible = self.isActive; }
    });

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.x += p.vx * 0.02;
        p.y += p.vy * 0.02;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        if (p.x > 1.02) p.x = -0.02;
        const twinkle = 0.55 + 0.45 * Math.sin(p.tw += 0.008);
        const alpha = p.a * twinkle;
        const px = p.x * W, py = p.y * H;
        const g = ctx.createRadialGradient(px, py, 0, px, py, p.r * 5);
        g.addColorStop(0, `rgba(236, 212, 158, ${alpha})`);
        g.addColorStop(1, 'rgba(236, 212, 158, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, p.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    requestAnimationFrame(frame);
  }

  /* ---------- the letter: golden ink word-by-word ---------- */
  function setupLetter() {
    const el = q('[data-words]');
    if (!el) return;
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    const spans = words.map(w => {
      const s = document.createElement('span');
      s.className = 'word';
      s.textContent = w;
      el.appendChild(s);
      return s;
    });
    if (reduced) { spans.forEach(s => s.classList.add('lit')); return; }

    gsap.set(spans, { autoAlpha: 0.32, filter: 'blur(3px)' });
    let lit = 0;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      end: 'bottom 30%',
      scrub: 0.6,
      onUpdate: self => {
        const target = Math.floor(self.progress * spans.length);
        if (target === lit) return;
        lit = target;
        spans.forEach((s, i) => s.classList.toggle('lit', i < lit));
      }
    });
    // guarantee the tail of the paragraph finishes readable
    ScrollTrigger.create({
      trigger: el,
      start: 'top 30%',
      end: 'top 10%',
      onEnter: () => spans.forEach(s => s.classList.add('lit'))
    });
  }

  /* ---------- curtain wipes between light & dark chapters ---------- */
  function setupCurtains() {
    if (reduced) { qa('[data-curtain]').forEach(c => gsap.set(c, { autoAlpha: 0 })); return; }
    qa('[data-curtain]').forEach(curtain => {
      const section = curtain.closest('section');
      if (!section) return;
      // rsvp sits on ivory paper; the story sits in maroon
      gsap.set(curtain, { yPercent: 100, visibility: 'visible', background: section.id === 'rsvp' ? 'var(--paper)' : 'var(--maroon-deep)' });
      gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 64%', end: 'top 4%', scrub: 0.7 }
      }).to(curtain, { yPercent: -100, ease: 'none' });
    });
  }

  /* ---------- generic entrance reveals ---------- */
  function setupReveals() {
    if (reduced) {
      qa('.reveal, .reveal-chapter, .reveal-event').forEach(el => gsap.set(el, { autoAlpha: 1, y: 0 }));
      return;
    }
    qa('.reveal').forEach(el => {
      gsap.fromTo(el, { autoAlpha: 0, y: 26 }, {
        autoAlpha: 1, y: 0, duration: 1.1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
      });
    });
    qa('.reveal-chapter').forEach(el => {
      gsap.fromTo(el, { autoAlpha: 0, y: 40 }, {
        autoAlpha: 1, y: 0, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none reverse' }
      });
    });
    qa('.reveal-event').forEach(el => {
      gsap.fromTo(el, { autoAlpha: 0, y: 30 }, {
        autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
      });
    });
  }

  /* ---------- story: drifting plates + thread ---------- */
  function setupStory() {
    if (reduced) return;
    qa('.story-chapter').forEach((chapter, i) => {
      const photo = chapter.querySelector('.story-photo');
      const img = photo.querySelector('img');
      const year = chapter.querySelector('.story-year');
      gsap.fromTo(img,
        { yPercent: -9 },
        { yPercent: 9, ease: 'none',
          scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo(photo,
        { y: 18 - i * 6 },
        { y: -18 + i * 6, ease: 'none',
          scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo(year,
        { y: 90 },
        { y: -90, ease: 'none',
          scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    gsap.to('.story-thread', {
      width: '100%', ease: 'none',
      scrollTrigger: { trigger: '.story', start: 'top 70%', end: 'bottom 60%', scrub: true }
    });

    // gentle 3D tilt on desktop
    if (isDesktop() && window.matchMedia('(hover: hover)').matches) {
      qa('.story-photo').forEach(photo => {
        photo.addEventListener('mousemove', e => {
          const r = photo.getBoundingClientRect();
          const rx = ((e.clientY - r.top) / r.height - 0.5) * -9;
          const ry = ((e.clientX - r.left) / r.width - 0.5) * 9;
          gsap.to(photo, { rotationX: rx, rotationY: ry, duration: 0.7, ease: 'power2.out', transformPerspective: 900 });
        });
        photo.addEventListener('mouseleave', () => {
          gsap.to(photo, { rotationX: 0, rotationY: 0, duration: 0.9, ease: 'power3.out' });
        });
      });
    }
  }

  /* ---------- the weekend: horizontal scroll-narrated rail ---------- */
  function setupEvents() {
    const rail = q('#events-rail');
    const list = q('.events-list');
    if (!rail || !list || !isDesktop() || reduced) return;
    gsap.to(list, {
      x: () => -(list.scrollWidth - rail.clientWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: '#events',
        start: 'top 25%',
        end: () => '+=' + Math.max(400, (list.scrollWidth - rail.clientWidth) * 0.55 + window.innerHeight),
        scrub: 0.6,
        invalidateOnRefresh: true
      }
    });
  }

  /* ---------- countdown ---------- */
  function setupCountdown() {
    const TARGET = new Date('2027-06-05T16:00:00+02:00');
    const els = { d: q('#cd-days'), h: q('#cd-hours'), m: q('#cd-mins'), s: q('#cd-secs') };
    const pad = (n, l) => String(n).padStart(l, '0');
    const setNum = (el, val, len) => {
      const v = pad(val, len);
      if (!el || el.textContent === v) return v;
      gsap.fromTo(el,
        { yPercent: 16, autoAlpha: 0.45 },
        { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      el.textContent = v;
      return v;
    };
    function tick() {
      const diff = Math.max(0, TARGET - Date.now());
      setNum(els.d, Math.floor(diff / 86400000), 3);
      setNum(els.h, Math.floor(diff / 3600000) % 24, 2);
      setNum(els.m, Math.floor(diff / 60000) % 60, 2);
      setNum(els.s, Math.floor(diff / 1000) % 60, 2);
    }
    tick();
    setInterval(tick, 275);
  }

  /* ---------- venue parallax ---------- */
  function setupVenue() {
    if (reduced) return;
    const img = q('.venue-photo img');
    if (!img) return;
    gsap.fromTo(img,
      { yPercent: -8 },
      { yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: '.venue-photo', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ---------- gallery: drift + lightbox ---------- */
  function setupGallery() {
    const items = qa('.gitem');
    if (!items.length) return;

    if (!reduced) {
      items.forEach((item, i) => {
        const img = item.querySelector('img');
        const depth = (i % 3) - 1;
        gsap.fromTo(img,
          { yPercent: -4 - depth * 3 },
          { yPercent: 4 + depth * 3, ease: 'none',
            scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    }

    const lb = q('#lightbox');
    const lbImg = q('#lb-img');
    const lbCap = q('#lb-cap');
    const lbCounter = q('#lb-counter');
    let idx = 0;

    function open(i) {
      idx = (i + items.length) % items.length;
      const item = items[idx];
      const img = item.querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      lbCap.textContent = item.getAttribute('data-cap') || '';
      lbCounter.textContent = (idx + 1) + ' / ' + items.length;
      lb.hidden = false;
      requestAnimationFrame(() => lb.classList.add('open'));
    }
    function close() {
      lb.classList.remove('open');
      setTimeout(() => { lb.hidden = true; }, 450);
    }
    const next = () => open(idx + 1);
    const prev = () => open(idx - 1);

    items.forEach((item, i) => {
      item.addEventListener('click', () => open(i));
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', 'View larger: ' + (item.getAttribute('data-cap') || ''));
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });

    q('#lb-close').addEventListener('click', close);
    q('#lb-prev').addEventListener('click', prev);
    q('#lb-next').addEventListener('click', next);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
    let sx = null;
    lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 48) (dx < 0 ? next() : prev());
      sx = null;
    }, { passive: true });
  }

  /* ---------- RSVP ---------- */
  function setupRsvp() {
    const form = q('#rsvp-form');
    const noteEl = q('#form-note');
    const done = q('#rsvp-done');
    const doneHead = q('#done-heading');
    const doneBody = q('#done-body');
    const guestsField = q('#field-guests');
    const guests = q('#f-guests');

    qa('input[name="attendance"]').forEach(r => {
      r.addEventListener('change', () => {
        const accepts = r.value === 'accepts' && r.checked;
        guestsField.classList.toggle('hidden', !accepts);
        if (!accepts) guests.removeAttribute('required');
        else guests.setAttribute('required', '');
      });
    });

    // if the guest has already replied, show the sealed state
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem('cj-rsvp') || 'null'); } catch (e) {}
    if (saved && saved.attendance) {
      form.hidden = true;
      done.hidden = false;
      doneHead.textContent = saved.attendance === 'accepts'
        ? 'Your answer is sealed.'
        : 'Your answer is sealed.';
      doneBody.innerHTML = saved.attendance === 'accepts'
        ? 'Thank you, dear ' + escapeHtml(saved.names || 'friends') + ' — Camille and Julian are writing your name into the seating plan as we speak. A small confirmation is on its way to your inbox; if it goes astray, simply write to <a href="mailto:rsvp@camilleandjulian.love">rsvp@camilleandjulian.love</a>.'
        : 'Thank you — we will raise a glass to you from across the lake. Should anything change before the first of May, write to <a href="mailto:rsvp@camilleandjulian.love">rsvp@camilleandjulian.love</a> and we will open a place for you at the table.';
      return;
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const names = (data.names || '').trim();
      const email = (data.email || '').trim();
      const attendance = data.attendance;
      let err = '';
      if (!names) err = 'Please tell us your name(s) — flattering versions welcome.';
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) err = 'That email looks a little smudged — could you check it?';
      else if (!attendance) err = 'Please choose “joyfully accepts” or “regretfully declines”.';

      if (err) {
        noteEl.textContent = err;
        noteEl.hidden = false;
        gsap.fromTo(noteEl, { x: 0 }, { x: 8, duration: 0.09, repeat: 5, yoyo: true, clearProps: 'x' });
        return;
      }
      noteEl.hidden = true;

      const payload = { names, email, attendance, guests: data.guests || '1', song: data.song || '', diet: data.diet || '', at: new Date().toISOString() };
      try { localStorage.setItem('cj-rsvp', JSON.stringify(payload)); } catch (x) {}

      gsap.to(form, {
        autoAlpha: 0, y: -14, duration: 0.6, ease: 'power2.in',
        onComplete: () => {
          form.hidden = true;
          gsap.set(form, { clearProps: 'all' });
          done.hidden = false;
          const declining = attendance === 'declines';
          doneHead.textContent = declining ? 'We will think of you at the toast.' : 'Your answer is sealed.';
          doneBody.innerHTML = declining
            ? 'Thank you for letting us know — we will raise a glass to you from across the lake. Should anything change before the first of May, write to <a href="mailto:rsvp@camilleandjulian.love">rsvp@camilleandjulian.love</a> and we will make room at the table.'
            : 'Thank you, ' + escapeHtml(names) + ' — Camille and Julian are writing your name into the seating plan as we speak. A small confirmation is on its way to your inbox; if it goes astray, simply write to <a href="mailto:rsvp@camilleandjulian.love">rsvp@camilleandjulian.love</a>.';
          gsap.fromTo('.done-seal', { scale: 0.3, rotation: -14 }, { scale: 1, rotation: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)' });
          gsap.fromTo(done.children, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, delay: 0.35 });
        }
      });
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ---------- add to calendar ---------- */
  function setupCalendar() {
    const EVENTS = [
      { title: 'Aperitivo al Limone',
        start: '20270604T183000', end: '20270604T203000',
        location: 'Lemon Garden, Villa Serenissima, Via del Lago 12, 22016 Lenno, Lake Como, Italy',
        desc: 'Welcome drinks with Camille & Julian — the weekend begins. Summery garden attire.' },
      { title: 'The Wedding of Camille & Julian',
        start: '20270605T160000', end: '20270605T183000',
        location: 'Wisteria Terrace, Villa Serenissima, Via del Lago 12, 22016 Lenno, Lake Como, Italy',
        desc: 'The ceremony, then dinner and dancing in the Limonaia until the last ferry. RSVP at camilleandjulian.love' },
      { title: 'Dinner & Dancing at the Limonaia',
        start: '20270605T183000', end: '20270606T003000',
        location: 'Villa Serenissima, Via del Lago 12, 22016 Lenno, Lake Como, Italy',
        desc: 'A candlelit dinner of ten tables and dancing until the last ferry.' },
      { title: 'The Morning After — Garden Brunch',
        start: '20270606T103000', end: '20270606T123000',
        location: 'The Great Lawn, Villa Serenissima, Lenno, Lake Como, Italy',
        desc: 'Bloody Marys, cold prosecco, warm pastries and spilled stories. Come as you danced.' }
    ];

    const toUtc = s => {
      // local wall time is Europe/Rome summer (CEST, +02:00)
      const d = new Date(s.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6+02:00'));
      return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };

    const googleUrl = () => {
      const c = EVENTS[1];
      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: c.title,
        dates: toUtc(c.start) + '/' + toUtc(c.end),
        details: c.desc,
        location: c.location
      });
      return 'https://calendar.google.com/calendar/render?' + params.toString();
    };

    q('#btn-cal-google').addEventListener('click', () => window.open(googleUrl(), '_blank', 'noopener'));
    q('#btn-cal-google-2').addEventListener('click', () => window.open(googleUrl(), '_blank', 'noopener'));

    q('#btn-cal-ics').addEventListener('click', () => {
      const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      let ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//CJWedding//CamilleAndJulian//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'X-WR-CALNAME:Camille & Julian — Lake Como',
        'X-WR-TIMEZONE:Europe/Rome'
      ];
      EVENTS.forEach((ev, i) => {
        ics = ics.concat([
          'BEGIN:VEVENT',
          'UID:cj-wedding-' + i + '@camilleandjulian.love',
          'DTSTAMP:' + now + 'Z',
          'DTSTART:' + toUtc(ev.start) + 'Z',
          'DTEND:' + toUtc(ev.end) + 'Z',
          'SUMMARY:' + ev.title,
          'LOCATION:' + ev.location,
          'DESCRIPTION:' + ev.desc.replace(/\n/g, ' '),
          'STATUS:CONFIRMED',
          'END:VEVENT'
        ]);
      });
      ics.push('END:VCALENDAR');
      const blob = new Blob([ics.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'camille-and-julian-lake-como.ics';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 800);
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    if (!window.gsap || !window.ScrollTrigger || !window.CJMusic) {
      // graceful no-GSAP fallback: everything is readable & scrollable
      document.body.classList.remove('intro-locked');
      const h = q('#site-header'); if (h) h.hidden = false;
      ['#stage-envelope', '#stage-gates'].forEach(sel => {
        const el = q(sel); if (el) el.hidden = true;
      });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    setupTheme();
    setupChrome();
    setupNav();
    setupMusic();
    setupIntro();
    setupLetter();
    setupCurtains();
    setupReveals();
    setupStory();
    setupEvents();
    setupCountdown();
    setupVenue();
    setupGallery();
    setupRsvp();
    setupCalendar();

    window.addEventListener('resize', () => ScrollTrigger.refresh());
    document.addEventListener('visibilitychange', () => ScrollTrigger.refresh());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();