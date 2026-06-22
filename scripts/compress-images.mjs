// One-off image optimizer. Resizes oversized images to a sane max dimension and
// re-encodes them in place, preserving the original file format/extension so no
// references in code break. Files are only overwritten when the result is smaller.
//
// Usage: node scripts/compress-images.mjs [--dry]
import sharp from 'sharp';
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOTS = ['public', 'src'];
const SKIP_DIRS = new Set(['node_modules', '.git', 'papers']);
const MAX_DIM = 1920;            // cap longest side; plenty for full-bleed web use
const JPEG_Q = 80;
const PNG_EFFORT = 10;
const DRY = process.argv.includes('--dry');

sharp.cache(false);
sharp.concurrency(Math.max(1, (await import('node:os')).cpus().length - 1));

let totalBefore = 0, totalAfter = 0, changed = 0, skipped = 0;
const savingsRows = [];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(path.join(dir, entry.name));
    } else {
      yield path.join(dir, entry.name);
    }
  }
}

async function optimize(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const input = await readFile(file);
  const beforeSize = input.length;

  let img = sharp(input, { failOn: 'none' });
  const meta = await img.metadata();

  // Downscale if larger than cap (longest side), never upscale.
  if ((meta.width ?? 0) > MAX_DIM || (meta.height ?? 0) > MAX_DIM) {
    img = img.resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true });
  }

  let output;
  if (ext === '.png') {
    output = await img.png({ compressionLevel: 9, effort: PNG_EFFORT, palette: true, quality: 90 }).toBuffer();
  } else {
    output = await img.jpeg({ quality: JPEG_Q, mozjpeg: true, progressive: true }).toBuffer();
  }

  totalBefore += beforeSize;
  if (output.length < beforeSize) {
    totalAfter += output.length;
    changed++;
    savingsRows.push([file, beforeSize, output.length]);
    if (!DRY) await writeFile(file, output);
  } else {
    totalAfter += beforeSize; // kept original
    skipped++;
  }
}

const mb = (n) => (n / 1048576).toFixed(2);
for (const root of ROOTS) {
  try { await stat(root); } catch { continue; }
  for await (const file of walk(root)) {
    try { await optimize(file); }
    catch (e) { console.error('FAIL', file, e.message); }
  }
}

// Show the 15 biggest absolute savings.
savingsRows.sort((a, b) => (b[1] - b[2]) - (a[1] - a[2]));
for (const [f, b, a] of savingsRows.slice(0, 15)) {
  console.log(`  ${mb(b)}MB -> ${mb(a)}MB  ${f}`);
}
console.log('\n========================================');
console.log(`${DRY ? '[DRY RUN] ' : ''}Optimized ${changed} images, skipped ${skipped} (already small).`);
console.log(`Total: ${mb(totalBefore)}MB -> ${mb(totalAfter)}MB  (saved ${mb(totalBefore - totalAfter)}MB)`);
console.log('========================================');
