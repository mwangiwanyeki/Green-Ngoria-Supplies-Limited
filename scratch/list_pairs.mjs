import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = 'web/public/images/gallery';
const text = fs.readFileSync('web/src/config/gallery.ts', 'utf8');
const entries = [...text.matchAll(/"src":\s*"\/images\/gallery\/([^"]+)"/g)].map(m => m[1]);

async function main() {
  const thumbs = {};
  for (const name of entries) {
    const p = path.join(dir, name);
    const buf = await sharp(p).resize(64, 64, { fit: 'fill' }).raw().toBuffer();
    thumbs[name] = buf;
  }

  const pairs = [];
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const f1 = entries[i], f2 = entries[j];
      const b1 = thumbs[f1], b2 = thumbs[f2];
      let diff = 0;
      for (let k = 0; k < b1.length; k++) {
        diff += Math.abs(b1[k] - b2[k]);
      }
      diff /= b1.length;
      if (diff < 36) {
        pairs.push({ diff, f1, f2 });
      }
    }
  }

  pairs.sort((a, b) => a.diff - b.diff);
  console.log(`=== Pairs with diff < 36 (${pairs.length} pairs) ===`);
  for (const p of pairs) {
    console.log(`${p.diff.toFixed(2).padStart(5)} : ${p.f1.padEnd(22)} <--> ${p.f2}`);
  }
}

main();
