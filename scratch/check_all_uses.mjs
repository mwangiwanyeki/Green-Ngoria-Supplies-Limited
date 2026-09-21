import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

const manifest = fs.readFileSync('web/src/config/gallery.ts', 'utf8');
const imgs = [...manifest.matchAll(/"src":\s*"\/images\/gallery\/([^"]+)"/g)].map(m => m[1]);

const allTs = fs.readdirSync('web/src', { recursive: true })
  .filter(f => typeof f === 'string' && (f.endsWith('.ts') || f.endsWith('.tsx')) && !f.endsWith('gallery.ts'))
  .map(f => path.join('web/src', f));

const uses = {};
for (const img of imgs) {
  uses[img] = [];
  for (const f of allTs) {
    const code = fs.readFileSync(f, 'utf8');
    if (code.includes(img)) uses[img].push(f);
  }
}

const used = Object.entries(uses).filter(([_, v]) => v.length > 0);
console.log(`${used.length} gallery images used outside gallery.ts:`);
for (const [k, v] of used) {
  console.log(`  ${k}: ${v.length} files (${v.join(', ')})`);
}
