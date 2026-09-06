/* jsdom smoke test — loads the real site, runs the real scripts,
   simulates the intro + RSVP, and reports any uncaught errors. */
'use strict';
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const ROOT = process.cwd();
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push('jsdomError: ' + e.message));
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));

const dom = new JSDOM(html, {
  runScripts: 'outside-only',
  pretendToBeVisual: true,
  url: 'http://localhost:8124/',
  virtualConsole: vc,
  resources: undefined
});
const win = dom.window;
const doc = win.document;

/* ---- stubs ---- */
win.matchMedia = q => ({ matches: false, media: q, addEventListener() {}, addListener() {} });
win.scrollTo = () => {};
win.HTMLCanvasElement.prototype.getContext = () => ({
  clearRect() {}, beginPath() {}, arc() {}, fill() {},
  createRadialGradient: () => ({ addColorStop() {} }),
  get canvas() { return null; }
});
(function audioStub() {
  const param = () => ({ value: 0, setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {}, cancelScheduledValues() {}, setTargetAtTime() {} });
  const node = () => new Proxy({}, {
    get(t, k) {
      if (typeof k === 'symbol') return undefined;
      if (k in t) return t[k];
      if (k === 'gain' || k === 'frequency' || k === 'detune' || k === 'delayTime' || k === 'pan') { t[k] = param(); return t[k]; }
      if (k === 'destination') { t[k] = {}; return t[k]; }
      return () => 0;   // any method (connect/start/stop/resume/...)
    }
  });
  win.AudioContext = class AudioContext {
    constructor() { this.currentTime = 0; this.state = 'running'; this.destination = {}; this.sampleRate = 44100; }
    createGain() { return node(); } createOscillator() { return node(); }
    createBiquadFilter() { return node(); } createDelay() { return node(); }
    createStereoPanner() { return node(); }
    createBuffer() { return { getChannelData: () => new Float32Array(44100) }; }
    createBufferSource() { return node(); }
    resume() { this.state = 'running'; } suspend() { this.state = 'suspended'; }
  };
  win.webkitAudioContext = win.AudioContext;
})();
win.URL.createObjectURL = () => 'blob:fake';
win.HTMLAnchorElement.prototype.click = function () { /* no navigation in jsdom */ };

/* ---- load scripts in real order ---- */
const files = ['vendor/gsap.min.js', 'vendor/ScrollTrigger.min.js', 'assets/js/music.js', 'assets/js/app.js'];
for (const f of files) {
  const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
  try { win.eval(code); } catch (e) { errors.push('eval ' + f + ': ' + e.stack); }
}

const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  try {
    // intro: break the seal
    doc.querySelector('#btn-seal').click();
    await wait(400);
    if (doc.querySelector('#stage-envelope').hidden) errors.push('envelope hidden too early');

    // card -> gates
    doc.querySelector('#btn-enter').click();
    await wait(700);
    if (doc.querySelector('#stage-gates').hidden) errors.push('gates never appeared');

    // open gates
    doc.querySelector('#btn-gates').click();
    await wait(3200);

    // RSVP validation path
    const form = doc.querySelector('#rsvp-form');
    doc.querySelector('#f-names').value = 'Annabel & Hugo';
    doc.querySelector('#f-email').value = 'not-an-email';
    form.dispatchEvent(new win.Event('submit', { bubbles: true, cancelable: true }));
    await wait(200);
    if (doc.querySelector('#form-note').hidden) errors.push('invalid email did not show a note');
    doc.querySelector('#f-email').value = 'annabel@example.com';
    doc.querySelector('input[name="attendance"][value="accepts"]').checked = true;
    form.dispatchEvent(new win.Event('submit', { bubbles: true, cancelable: true }));
    await wait(1100);
    if (doc.querySelector('#rsvp-done').hidden) errors.push('rsvp success state never shown');

    // calendar button should build an ics without throwing
    doc.querySelector('#btn-cal-ics').dispatchEvent(new win.Event('click'));

    // mobile drawer + theme toggle
    doc.querySelector('#btn-menu').click();
    if (!doc.querySelector('#drawer').classList.contains('open')) errors.push('drawer did not open');
    doc.querySelector('#btn-theme').click();
    if (doc.documentElement.getAttribute('data-theme') !== 'night') errors.push('theme did not toggle');

    // countdown numbers should be populated (0-padded length)
    const cd = doc.querySelector('#cd-days').textContent;
    if (!/^\d{3}$/.test(cd)) errors.push('countdown days not formatted: ' + cd);

    if (errors.length) { console.log('FAIL'); errors.forEach(e => console.log('  -', e)); process.exit(1); }
    console.log('OK — intro, gates, hero reveal, RSVP, calendar and countdown all exercised without errors.');
    process.exit(0);
  } catch (e) {
    console.log('FAIL — exception during interaction:', e.stack);
    process.exit(1);
  }
})();
setTimeout(() => { console.log('TIMEOUT'); process.exit(2); }, 20000);