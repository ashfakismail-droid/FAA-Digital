/* ============================================================
   Aurora Charts — tiny dependency-free canvas chart library
   Supports: line, bar, doughnut
   Usage: AuroraCharts.line(canvasEl, {labels, datasets, ...})
   ============================================================ */
(function (global) {
  'use strict';

  const COLORS = {
    gold: '#c9a24b',
    goldSoft: 'rgba(201,162,75,0.18)',
    navy: '#0f1b2d',
    blue: '#4f8cff',
    green: '#3ecf8e',
    red: '#ff6b6b',
    text: '#9fb0c3',
    grid: 'rgba(255,255,255,0.06)'
  };

  function setupHiDPI(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || canvas.clientWidth || 600;
    const h = rect.height || canvas.clientHeight || 300;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  function niceMax(v) {
    if (v <= 0) return 10;
    const pow = Math.pow(10, Math.floor(Math.log10(v)));
    const n = v / pow;
    let step;
    if (n <= 1) step = 1;
    else if (n <= 2) step = 2;
    else if (n <= 5) step = 5;
    else step = 10;
    return step * pow;
  }

  function line(canvas, opts) {
    const { ctx, w, h } = setupHiDPI(canvas);
    const pad = { t: 20, r: 20, b: 36, l: 48 };
    const labels = opts.labels || [];
    const datasets = opts.datasets || [];
    const series = datasets.map((d) => d.data);
    const allVals = series.flat();
    const maxV = niceMax(Math.max(...allVals, 1));
    const plotW = w - pad.l - pad.r;
    const plotH = h - pad.t - pad.b;
    const xStep = labels.length > 1 ? plotW / (labels.length - 1) : plotW;
    const y = (v) => pad.t + plotH - (v / maxV) * plotH;

    ctx.clearRect(0, 0, w, h);

    // grid + y labels
    ctx.strokeStyle = COLORS.grid;
    ctx.fillStyle = COLORS.text;
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const ticks = 5;
    for (let i = 0; i <= ticks; i++) {
      const val = (maxV / ticks) * i;
      const yy = y(val);
      ctx.beginPath();
      ctx.moveTo(pad.l, yy);
      ctx.lineTo(w - pad.r, yy);
      ctx.stroke();
      ctx.fillText(formatNum(val), pad.l - 8, yy);
    }

    // x labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    labels.forEach((lb, i) => {
      ctx.fillText(lb, pad.l + xStep * i, h - pad.b + 8);
    });

    // lines
    datasets.forEach((d) => {
      const color = d.color || COLORS.gold;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      d.data.forEach((v, i) => {
        const xx = pad.l + xStep * i;
        const yy = y(v);
        if (i === 0) ctx.moveTo(xx, yy);
        else ctx.lineTo(xx, yy);
      });
      ctx.stroke();

      // area fill
      if (d.fill !== false) {
        const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + plotH);
        grad.addColorStop(0, hexA(color, 0.28));
        grad.addColorStop(1, hexA(color, 0));
        ctx.fillStyle = grad;
        ctx.lineTo(pad.l + xStep * (d.data.length - 1), pad.t + plotH);
        ctx.lineTo(pad.l, pad.t + plotH);
        ctx.closePath();
        ctx.fill();
      }

      // points
      ctx.fillStyle = color;
      d.data.forEach((v, i) => {
        ctx.beginPath();
        ctx.arc(pad.l + xStep * i, y(v), 3, 0, Math.PI * 2);
        ctx.fill();
      });
    });
  }

  function bar(canvas, opts) {
    const { ctx, w, h } = setupHiDPI(canvas);
    const pad = { t: 20, r: 20, b: 36, l: 48 };
    const labels = opts.labels || [];
    const datasets = opts.datasets || [];
    const allVals = datasets.map((d) => d.data).flat();
    const maxV = niceMax(Math.max(...allVals, 1));
    const plotW = w - pad.l - pad.r;
    const plotH = h - pad.t - pad.b;
    const y = (v) => pad.t + plotH - (v / maxV) * plotH;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = COLORS.grid;
    ctx.fillStyle = COLORS.text;
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const ticks = 5;
    for (let i = 0; i <= ticks; i++) {
      const val = (maxV / ticks) * i;
      const yy = y(val);
      ctx.beginPath();
      ctx.moveTo(pad.l, yy);
      ctx.lineTo(w - pad.r, yy);
      ctx.stroke();
      ctx.fillText(formatNum(val), pad.l - 8, yy);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const groupW = plotW / labels.length;
    const barW = Math.min(28, groupW / (datasets.length + 1));

    labels.forEach((lb, i) => {
      const cx = pad.l + groupW * i + groupW / 2;
      ctx.fillText(lb, cx, h - pad.b + 8);
      datasets.forEach((d, di) => {
        const v = d.data[i] || 0;
        const bx = cx - (datasets.length * barW) / 2 + di * barW;
        const by = y(v);
        const grad = ctx.createLinearGradient(0, by, 0, pad.t + plotH);
        grad.addColorStop(0, d.color || COLORS.gold);
        grad.addColorStop(1, hexA(d.color || COLORS.gold, 0.35));
        ctx.fillStyle = grad;
        roundRect(ctx, bx, by, barW - 4, pad.t + plotH - by, 4);
        ctx.fill();
      });
    });
  }

  function doughnut(canvas, opts) {
    const { ctx, w, h } = setupHiDPI(canvas);
    const data = opts.data || [];
    const colors = opts.colors || [COLORS.gold, COLORS.blue, COLORS.green, COLORS.red];
    const total = data.reduce((a, b) => a + b, 0) || 1;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) / 2 - 10;
    const inner = r * 0.62;

    ctx.clearRect(0, 0, w, h);
    let start = -Math.PI / 2;
    data.forEach((v, i) => {
      const ang = (v / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, start + ang);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      start += ang;
    });
    // hole
    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, Math.PI * 2);
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--card') || '#13233b';
    ctx.fill();

    if (opts.centerText) {
      ctx.fillStyle = '#fff';
      ctx.font = '600 20px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(opts.centerText, cx, cy);
    }
  }

  /* ---------- helpers ---------- */
  function roundRect(ctx, x, y, w, h, r) {
    if (h < 0) return;
    r = Math.min(r, h / 2, w / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function hexA(hex, a) {
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function formatNum(n) {
    if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'k';
    return Math.round(n).toString();
  }

  global.AuroraCharts = { line, bar, doughnut, COLORS };
})(window);
