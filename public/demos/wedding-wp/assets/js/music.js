/* ============================================================
   Camille & Julian — generative ambient score
   A soft, romantic piano-and-pad piece synthesized with the
   Web Audio API (no audio files, fully offline & self-contained).
   Progression (6 bars, ~64 bpm): Fmaj7 · Am7 · Dm7 · Bbmaj7 · Gm7 · Cadd9
   ============================================================ */
(function () {
  'use strict';
  const API = window.CJMusic = {};
  let ctx = null;
  let master = null, musicBus = null, padBus = null;
  let scheduler = null;
  let playing = false;
  let step = 0;                 // current eighth-note step
  let bar = 0;
  let nextTime = 0;

  const BPM = 64;
  const STEP = 60 / BPM / 2;    // eighth-note duration (s)
  const BARS_PER_LOOP = 6;

  // Chord tones as MIDI offsets above the bass root
  const CHORDS = [
    { root: 41, tones: [0, 4, 7, 11], high: 24 },   // Fmaj7
    { root: 45, tones: [0, 3, 7, 10], high: 24 },   // Am7
    { root: 38, tones: [0, 3, 7, 10], high: 31 },   // Dm7
    { root: 46, tones: [0, 3, 7, 10], high: 24 },   // Bbmaj7
    { root: 43, tones: [0, 3, 7, 10], high: 24 },   // Gm7
    { root: 48, tones: [0, 4, 7, 14], high: 26 }    // Cadd9
  ];

  const mtof = n => 440 * Math.pow(2, (n - 69) / 12);

  /* ---------- audio graph ---------- */
  function buildGraph() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0;

    const warm = ctx.createBiquadFilter();
    warm.type = 'lowpass';
    warm.frequency.value = 4600;
    warm.Q.value = 0.4;

    // space: two feedback delays, slightly different lengths
    const dL = ctx.createDelay(2), dR = ctx.createDelay(2);
    dL.delayTime.value = 0.29;
    dR.delayTime.value = 0.43;
    const fbL = ctx.createGain(), fbR = ctx.createGain();
    fbL.gain.value = 0.36;
    fbR.gain.value = 0.36;
    const dLp = ctx.createBiquadFilter(), dRp = ctx.createBiquadFilter();
    dLp.type = dRp.type = 'lowpass';
    dLp.frequency.value = dRp.frequency.value = 2400;
    const panL = ctx.createStereoPanner(), panR = ctx.createStereoPanner();
    panL.pan.value = -0.55;
    panR.pan.value = 0.55;
    const wet = ctx.createGain();
    wet.gain.value = 0.55;

    dL.connect(dLp); dLp.connect(fbL); fbL.connect(dL);
    dR.connect(dRp); dRp.connect(fbR); fbR.connect(dR);
    dL.connect(panL); dR.connect(panR);
    panL.connect(wet); panR.connect(wet);
    wet.connect(master);

    musicBus = ctx.createGain();
    musicBus.connect(warm);
    warm.connect(master);
    warm.connect(dL);
    warm.connect(dR);
    master.connect(ctx.destination);

    padBus = ctx.createGain();
    padBus.connect(musicBus);
  }

  /* ---------- voices ---------- */
  function pianoNote(midi, time, vel, dur) {
    const t0 = ctx.currentTime + time;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const g = ctx.createGain();
    const f = mtof(midi);
    osc.type = 'triangle'; osc.detune.value = -3;
    osc2.type = 'sine';    osc2.detune.value = 4; osc2.frequency.value = f * 2;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vel, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.frequency.value = f;
    osc.connect(g); osc2.connect(g);
    g.connect(musicBus);
    osc.start(t0); osc2.start(t0);
    osc.stop(t0 + dur + 0.1); osc2.stop(t0 + dur + 0.1);
  }

  function padNote(midi, time, dur, vel) {
    const t0 = ctx.currentTime + time;
    [0, 2.5].forEach(dt => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 1100 + vel * 900;
      osc.type = 'triangle';
      osc.detune.value = dt;
      osc.frequency.value = mtof(midi);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(vel * 0.055, t0 + Math.min(1.4, dur * 0.5));
      g.gain.linearRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(lp); lp.connect(g); g.connect(padBus);
      osc.start(t0); osc.stop(t0 + dur + 0.1);
    });
  }

  function bassNote(midi, time, dur, vel) {
    const t0 = ctx.currentTime + time;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = mtof(midi);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(vel * 0.14, t0 + 0.08);
    g.gain.setValueAtTime(vel * 0.14, t0 + dur * 0.7);
    g.gain.linearRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g); g.connect(musicBus);
    osc.start(t0); osc.stop(t0 + dur + 0.1);
  }

  /* ---------- note scheduling ---------- */
  function scheduleStep(absTime, chord) {
    const vel = () => 0.08 + Math.random() * 0.13;
    const stepInBar = step % 8;

    // piano arpeggio — one gentle note per eighth, resting a beat every 4 bars
    if (stepInBar !== 5 || (bar % 4) !== 3) {
      const idx = Math.floor(Math.random() * chord.tones.length);
      const midi = chord.root + 24 + chord.tones[idx];
      let d = 3.2 + Math.random();
      if (stepInBar === 0) d = 4.4;
      pianoNote(midi, absTime, vel() + (stepInBar === 0 ? 0.05 : 0), d);
    }

    // bass — root on beat 1, low root again on beat 3
    if (stepInBar === 0) bassNote(chord.root, absTime, STEP * 6, 0.8);
    if (stepInBar === 4) bassNote(chord.root - 12, absTime, STEP * 3, 0.4);

    // high sparkle, rarely
    if ((bar % 4) === 3 && stepInBar === 7 && Math.random() < 0.4) {
      pianoNote(chord.root + 12 + chord.high, absTime, 0.05, 5.5);
    }
  }

  function scheduleBar(barStart, absTime) {
    const chord = CHORDS[bar % BARS_PER_LOOP];
    for (let s = 0; s < 8; s++) {
      step = s;
      scheduleStep(absTime + s * STEP, chord);
    }
    padNote(chord.root + 12, absTime, STEP * 8 - 0.35, 0.6);
    padNote(chord.root + 12 + 4, absTime + 0.1, STEP * 8 - 0.4, 0.5);
    padNote(chord.root + 24, absTime + 0.2, STEP * 8 - 0.5, 0.42);
  }

  function schedulerTick() {
    if (!ctx || !playing) return;
    while (nextTime < ctx.currentTime + 0.9) {
      scheduleBar(bar, nextTime - ctx.currentTime);
      nextTime += STEP * 8;
      bar++;
    }
  }

  /* ---------- public controls ---------- */
  API.toggle = function () {
    if (playing) { API.pause(); return false; }
    API.play(); return true;
  };
  API.isPlaying = () => playing;

  API.play = function () {
    if (!ctx) buildGraph();
    if (ctx.state === 'suspended') ctx.resume();
    if (playing) return;
    playing = true;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.62, ctx.currentTime + 1.6);
    nextTime = ctx.currentTime + 0.15;
    scheduler = setInterval(schedulerTick, 130);
    schedulerTick();
  };

  API.pause = function () {
    if (!ctx) return;
    playing = false;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.1);
    if (scheduler) { clearInterval(scheduler); scheduler = null; }
    setTimeout(() => { if (ctx && !playing && ctx.state === 'running') ctx.suspend(); }, 1500);
  };

  /* ---------- tiny sound design for the intro ---------- */
  function ensure() { if (!ctx) buildGraph(); }

  API.crack = function () {
    ensure();
    const t = ctx.currentTime;
    const n = 0.22;
    const buf = ctx.createBuffer(1, ctx.sampleRate * n, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1600 + Math.random() * 900;
    bp.Q.value = 0.8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.16, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + n);
    src.connect(bp); bp.connect(g); g.connect(master);
    src.start(t);
  };

  API.door = function () {
    ensure();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(88, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.7);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.2, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.75);
    osc.connect(g); g.connect(master);
    osc.start(t); osc.stop(t + 0.8);

    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.9, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(400, t);
    lp.frequency.exponentialRampToValueAtTime(90, t + 0.9);
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.06, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
    src.connect(lp); lp.connect(ng); ng.connect(master);
    src.start(t);
  };
})();