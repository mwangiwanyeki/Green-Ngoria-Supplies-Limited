import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = 'web/public/images/gallery';
const text = fs.readFileSync('web/src/config/gallery.ts', 'utf8');
const entries = [...text.matchAll(/"src":\s*"\/images\/gallery\/([^"]+)"/g)].map(m => m[1]);

async function main() {
  const greenFiles = entries.filter(f => f.startsWith('greenngoria'));
  const otherFiles = entries.filter(f => !f.startsWith('greenngoria'));

  const greenThumbs = {};
  for (const name of greenFiles) {
    greenThumbs[name] = await sharp(path.join(dir, name)).resize(64, 64, { fit: 'fill' }).raw().toBuffer();
  }

  const otherThumbs = {};
  for (const name of otherFiles) {
    otherThumbs[name] = await sharp(path.join(dir, name)).resize(64, 64, { fit: 'fill' }).raw().toBuffer();
  }

  console.log(`Comparing ${greenFiles.length} greenngoria photos against ${otherFiles.length} others...`);
  for (const g of greenFiles) {
    const b1 = greenThumbs[g];
    const matches = [];
    for (const o of otherFiles) {
      const b2 = otherThumbs[o];
      let diff = 0;
      for (let k = 0; k < b1.length; k++) diff += Math.abs(b1[k] - b2[k]);
      diff /= b1.length;
      if (diff < 40) {
        matches.push({ o, diff });
      }
    }
    matches.sort((a, b) => a.diff - b.diff);
    if (matches.length > 0) {
      console.log(`\n${g} matches:`);
      for (const m of matches.slice(0, 3)) {
        console.log(`  -> ${m.o} (diff=${m.diff.toFixed(2)})`);
      }
    } else {
      console.log(`\n${g} has no close matches (unique).`);
    }
  }
}

main();
