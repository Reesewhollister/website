#!/usr/bin/env node
/**
 * sync-airlines.cjs — pull the African Airlines encyclopedia app into this site.
 *
 * Source of truth: the colonies-to-carriers project (default below, override
 * with AIRLINES_SRC). Copies ONLY the runtime app — index.html, assets/, and
 * the generated data JSON — into public/african-airlines/, which the static
 * generator ships verbatim to dist/african-airlines/. The app uses relative
 * paths and hash routing, so it works at /african-airlines/ unchanged.
 *
 * Usage: npm run sync:airlines
 */

const fs = require('node:fs');
const path = require('node:path');

const SRC = process.env.AIRLINES_SRC
  || '/Users/reesehollister/Documents/colonies-to-carriers';
const DEST = path.join(__dirname, '..', 'public', 'african-airlines');

// Exactly what the running app needs — nothing else from the source repo.
const MANIFEST = [
  'index.html',
  'assets', // js, css, bundled echarts/fuse, fonts
  'data',   // airlines.json, stats.json, viz.json, africa.geo.json
];

function fail(msg) {
  console.error(`[sync:airlines] ERROR: ${msg}`);
  process.exit(1);
}

if (!fs.existsSync(SRC)) {
  fail(`source not found: ${SRC} (set AIRLINES_SRC to override)`);
}
for (const entry of MANIFEST) {
  if (!fs.existsSync(path.join(SRC, entry))) {
    fail(`missing in source: ${entry} — run its build (python3 build/build_data.py) first`);
  }
}
// Sanity: refuse to ship a build without the dataset.
const requiredData = ['airlines.json', 'stats.json', 'viz.json', 'africa.geo.json'];
for (const f of requiredData) {
  if (!fs.existsSync(path.join(SRC, 'data', f))) fail(`missing data file: data/${f}`);
}

// Deterministic snapshot: wipe and recopy.
fs.rmSync(DEST, { recursive: true, force: true });
fs.mkdirSync(DEST, { recursive: true });
for (const entry of MANIFEST) {
  fs.cpSync(path.join(SRC, entry), path.join(DEST, entry), { recursive: true });
}

// Report what was copied.
let files = 0;
let bytes = 0;
(function walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, item.name);
    if (item.isDirectory()) walk(p);
    else { files += 1; bytes += fs.statSync(p).size; }
  }
})(DEST);

console.log(`[sync:airlines] source : ${SRC}`);
console.log(`[sync:airlines] dest   : ${DEST}`);
console.log(`[sync:airlines] copied : ${files} files, ${(bytes / 1024 / 1024).toFixed(1)} MB`);
console.log('[sync:airlines] done — next: npm run build');
