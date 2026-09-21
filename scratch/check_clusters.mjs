import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = 'web/public/images/gallery';

async function checkSpecificPairs() {
  const groups = [
    // Greenngoria series
    ['greenngoria-04.webp', 'greenngoria-05.webp', 'greenngoria-07.webp'],
    ['greenngoria-03.webp', 'greenngoria-06.webp'],
    ['greenngoria-10.webp', 'greenngoria-11.webp'],
    ['greenngoria-12.webp', 'greenngoria-13.webp'],
    ['greenngoria-15.webp', 'greenngoria-16.webp'],

    // DJI drone series
    ['dji-0326.webp', 'dji-0327.webp', 'dji-0328.webp', 'dji-0329.webp'],
    ['dji-0314.webp', 'dji-0315.webp', 'dji-0316.webp', 'dji-0317.webp', 'dji-0318.webp', 'dji-0319.webp'],
    ['dji-0333.webp', 'dji-0338.webp'],

    // ACE ground series
    ['ace4036.webp', 'ace4037.webp'],
    ['ace4042.webp', 'ace4043.webp'],
    ['ace4044.webp', 'ace4045.webp'],
    ['ace4048.webp', 'ace4049.webp', 'ace4050.webp'],
    ['ace4054.webp', 'ace4055.webp'],
    ['ace4067.webp', 'ace4068.webp', 'ace4069.webp', 'ace4108.webp', 'ace4109.webp'],
    ['ace4073.webp', 'ace4074.webp', 'ace4075.webp', 'ace4076.webp'],
    ['ace4082.webp', 'ace4083.webp', 'ace4088.webp'],
    ['ace4085.webp', 'ace4086.webp', 'ace4087.webp'],
    ['ace4094.webp', 'ace4095.webp', 'ace4096.webp', 'ace4097.webp'],
    ['ace4101.webp', 'ace4102.webp', 'ace4103.webp'],
    ['ace4111.webp', 'ace4112.webp', 'ace4113.webp', 'ace4114.webp', 'ace4115.webp', 'ace4116.webp', 'ace4117.webp', 'ace4118.webp'],
    ['ace4130.webp', 'ace4131.webp', 'ace4132.webp', 'ace4133.webp', 'ace4134.webp']
  ];

  let html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: sans-serif; background: #0f172a; color: #fff; padding: 20px; }
  .group { background: #1e293b; border: 1px solid #334155; border-radius: 8px; margin-bottom: 24px; padding: 16px; }
  h2 { margin-top: 0; color: #38bdf8; font-size: 16px; }
  .row { display: flex; flex-wrap: wrap; gap: 16px; }
  .item { width: 300px; }
  img { width: 100%; height: 200px; object-fit: cover; border-radius: 4px; border: 1px solid #475569; }
  .name { font-size: 12px; margin-top: 4px; font-family: monospace; }
</style>
</head>
<body>
<h1>Cluster Inspection for Same Viewpoints</h1>`;

  for (let i = 0; i < groups.length; i++) {
    const grp = groups[i];
    html += `<div class="group"><h2>Group ${i+1}: ${grp.join(', ')}</h2><div class="row">`;
    for (const f of grp) {
      const p = path.join(dir, f);
      if (fs.existsSync(p)) {
        html += `<div class="item"><img src="../web/public/images/gallery/${f}"><div class="name">${f}</div></div>`;
      }
    }
    html += `</div></div>`;
  }

  html += `</body></html>`;
  fs.writeFileSync('scratch/cluster_inspection.html', html);
  console.log('Wrote scratch/cluster_inspection.html');
}

checkSpecificPairs();
