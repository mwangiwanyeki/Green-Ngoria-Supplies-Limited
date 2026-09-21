import fs from 'fs';
import path from 'path';

const manifest = JSON.parse(
  fs.readFileSync('web/src/config/gallery.ts', 'utf8').match(/\[\s*\{[\s\S]*\}\s*\]/)[0]
);

let html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Gallery Review</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; margin: 0; }
  h1 { margin-bottom: 8px; }
  p { color: #94a3b8; margin-top: 0; margin-bottom: 24px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
  .card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; }
  .img-wrap { width: 100%; aspect-ratio: 4/3; background: #000; overflow: hidden; position: relative; }
  img { width: 100%; height: 100%; object-fit: contain; }
  .meta { padding: 10px; font-size: 13px; line-height: 1.4; }
  .name { font-weight: 700; color: #38bdf8; font-family: monospace; }
  .dim { color: #94a3b8; font-size: 11px; }
</style>
</head>
<body>
<h1>Gallery Review (${manifest.length} images)</h1>
<p>Inspect all images sequentially to identify duplicate viewpoints.</p>
<div class="grid">
${manifest.map((img, idx) => {
  const base = path.basename(img.src);
  return `<div class="card">
    <div class="img-wrap">
      <img src="../web/public${img.src}" loading="lazy" alt="${base}">
    </div>
    <div class="meta">
      <div class="name">#${idx + 1}: ${base}</div>
      <div class="dim">${img.width} &times; ${img.height}</div>
    </div>
  </div>`;
}).join('\n')}
</div>
</body>
</html>`;

fs.mkdirSync('scratch', { recursive: true });
fs.writeFileSync('scratch/gallery_review.html', html);
console.log('Successfully wrote scratch/gallery_review.html with', manifest.length, 'images.');
