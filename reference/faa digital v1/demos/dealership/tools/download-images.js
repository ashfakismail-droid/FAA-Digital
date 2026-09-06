/*
 * Prestige Motors — Real Image Downloader (Openverse)
 * Downloads model-matched, royalty-free JPG photos from Openverse
 * (aggregates Flickr / Wikimedia / CC licensed images). Filters to
 * commercial-friendly licenses (CC-BY family). One search per model;
 * downloads up to 2 real photos and reuses across the 5 gallery slots
 * for that vehicle (same model = allowed reuse).
 * Saves as assets/img/vehicles/v{id}_{angle}.jpg and rewrites data files.
 * Idempotent: skips files that already exist, so re-running fills gaps.
 * Rate-limit aware: backs off on empty API responses and 429s.
 *
 * Run:  node tools/download-images.js [limit]
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IMG = path.join(ROOT, 'assets', 'img', 'vehicles');
const DATA = path.join(ROOT, 'assets', 'data');
const UA = { 'User-Agent': 'Mozilla/5.0 (PrestigeMotorsPortfolio/1.0)' };

global.window = {};
require(path.join(DATA, 'vehicles.js'));
require(path.join(DATA, 'blog.js'));
const vehicles = global.window.PRESTIGE_VEHICLES;
const blog = global.window.PRESTIGE_BLOG;

const sleep = ms => new Promise(r => setTimeout(r, ms));
let cooldownUntil = 0;
async function waitCooldown() { const n = Date.now(); if (n < cooldownUntil) await sleep(cooldownUntil - n); }

function getOnce(url) {
  return new Promise((res, rej) => {
    const r = https.get(url, { headers: UA }, resp => {
      if (resp.statusCode >= 300 && resp.statusCode < 400 && resp.headers.location) { resp.destroy(); return getOnce(resp.headers.location).then(res, rej); }
      if (resp.statusCode === 429) { resp.destroy(); cooldownUntil = Date.now() + 30000; return sleep(30000).then(() => rej(new Error('429'))); }
      let d = ''; resp.on('data', c => d += c); resp.on('end', () => res({ status: resp.statusCode, body: d }));
    });
    r.on('error', rej); r.setTimeout(15000, () => { r.destroy(); rej(new Error('timeout')); });
  });
}

// Search with backoff: Openverse rate-limits, so retry empty/invalid responses.
async function openverseSearch(query) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await waitCooldown();
      const r = await getOnce(`https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&page_size=12&license_type=commercial&mature=false`);
      if (r.status !== 200) { cooldownUntil = Date.now() + 20000; await sleep(20000); continue; }
      let j; try { j = JSON.parse(r.body); } catch (e) { cooldownUntil = Date.now() + 20000; await sleep(20000); continue; }
      const out = [];
      for (const it of (j.results || [])) { if (it.url && /\.(jpe?g)$/i.test(it.url)) out.push(it.url); }
      if (out.length) return out;
      cooldownUntil = Date.now() + 15000; await sleep(15000); // empty results => likely throttled
    } catch (e) { await sleep(5000); }
  }
  return [];
}

const ANGLES = ['exterior-front', 'exterior-side', 'rear-view', 'interior', 'detail'];
const modelCache = {};
let downloaded = 0, failed = 0;
const failLog = [];

async function getModelUrls(v) {
  const key = v.brand + ' ' + v.model;
  if (modelCache[key]) return modelCache[key];
  let urls = [];
  const queries = [`${v.brand} ${v.model}`, `${v.brand} ${v.bodyType}`, v.model, `${v.brand} car`];
  for (const q of queries) { urls = await openverseSearch(q); if (urls.length) break; }
  modelCache[key] = urls;
  return urls;
}

(async () => {
  const LIMIT = process.argv[2] ? parseInt(process.argv[2], 10) : vehicles.length;
  const START = process.argv[3] ? parseInt(process.argv[3], 10) : 0; // skip first N vehicles
  let processed = 0;
  for (const v of vehicles) {
    if (processed < START) { processed++; continue; }
    if (processed >= START + LIMIT) break;
    const haveAll = ANGLES.every(a => fs.existsSync(path.join(IMG, `v${v.id}_${a}.jpg`)));
    if (haveAll) { processed++; continue; }

    const urls = await getModelUrls(v);
    if (!urls.length) { failed++; failLog.push(`${v.brand} ${v.model} (${v.year})`); console.log(`x ${v.brand} ${v.model}: NO IMAGES`); processed++; await sleep(2000); continue; }

    const photos = [];
    for (const u of urls) {
      if (photos.length >= 2) break;
      const tmp = path.join(IMG, `v${v.id}_tmp${photos.length}.jpg`);
      try { await waitCooldown(); const r = await getOnce(u); if (r.status === 200 && r.body && r.body.length >= 5000) { fs.writeFileSync(tmp, r.body); photos.push(tmp); } }
      catch (e) { /* next url */ }
    }
    if (!photos.length) { failed++; failLog.push(`${v.brand} ${v.model} (${v.year})`); console.log(`x ${v.brand} ${v.model}: DOWNLOAD FAILED`); processed++; await sleep(2000); continue; }

    const gallery = [];
    for (let i = 0; i < ANGLES.length; i++) {
      const dest = path.join(IMG, `v${v.id}_${ANGLES[i]}.jpg`);
      if (fs.existsSync(dest)) { gallery.push(`assets/img/vehicles/v${v.id}_${ANGLES[i]}.jpg`); continue; }
      fs.copyFileSync(photos[i % photos.length], dest);
      gallery.push(`assets/img/vehicles/v${v.id}_${ANGLES[i]}.jpg`);
      downloaded++;
    }
    photos.forEach(p => { try { fs.unlinkSync(p); } catch (e) {} });
    v.gallery = gallery;
    console.log(`+ ${v.brand} ${v.model} (${v.year}) — ${gallery.length} imgs`);
    processed++;
    await sleep(3000);
  }

  const toJS = (name, data) => `/* AUTO-GENERATED — real images. Do not edit by hand */\nwindow.${name} = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(path.join(DATA, 'vehicles.js'), toJS('PRESTIGE_VEHICLES', vehicles));
  blog.forEach((p, i) => { const src = vehicles[i % vehicles.length]; p.image = (src && src.gallery && src.gallery[1]) || 'assets/img/vehicles/v1_exterior-side.jpg'; });
  fs.writeFileSync(path.join(DATA, 'blog.js'), toJS('PRESTIGE_BLOG', blog));
  fs.readdirSync(IMG).forEach(f => { if (/v\d+_.*\.svg$/.test(f)) fs.unlinkSync(path.join(IMG, f)); });

  console.log(`\n=== DONE ===\nDownloaded this run: ${downloaded} | Vehicles w/o images: ${failed}`);
  if (failLog.length) console.log('Failures:\n' + failLog.join('\n'));
})();
