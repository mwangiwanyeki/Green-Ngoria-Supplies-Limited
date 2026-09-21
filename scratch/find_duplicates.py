import os
import glob
from PIL import Image

gallery_dir = r'web/public/images/gallery'
manifest_path = r'web/src/config/gallery.ts'

with open(manifest_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Extract list of filenames from manifest in order
import re
entries = re.findall(r'"src":\s*"/images/gallery/([^"]+)"', text)
print(f'Total manifest entries in order: {len(entries)}')

# Load 64x64 RGB thumbnails and 64x64 grayscale
thumbs_rgb = {}
thumbs_gray = {}

for name in entries:
    p = os.path.join(gallery_dir, name)
    with Image.open(p) as img:
        img_rgb = img.convert('RGB').resize((64, 64), Image.Resampling.BILINEAR)
        thumbs_rgb[name] = list(img_rgb.getdata())
        img_gray = img.convert('L').resize((64, 64), Image.Resampling.BILINEAR)
        thumbs_gray[name] = list(img_gray.getdata())

# Compute pairwise difference
pairs = []
for i in range(len(entries)):
    for j in range(i + 1, len(entries)):
        f1, f2 = entries[i], entries[j]
        # Compare RGB pixels
        p1 = thumbs_rgb[f1]
        p2 = thumbs_rgb[f2]
        diff = sum(abs(r1-r2) + abs(g1-g2) + abs(b1-b2) for (r1,g1,b1), (r2,g2,b2) in zip(p1, p2)) / (64 * 64 * 3)
        if diff < 42:
            pairs.append((diff, f1, f2, i, j))

pairs.sort()
print(f'Total candidate pairs with diff < 42: {len(pairs)}')

# Group into connected components (clusters of duplicates)
adj = {}
for name in entries:
    adj[name] = []

for diff, f1, f2, i, j in pairs:
    adj[f1].append((f2, diff))
    adj[f2].append((f1, diff))

# Generate HTML report showing all candidate duplicate pairs side by side
html = '''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Duplicate Viewpoints Comparison</title>
<style>
  body { font-family: -apple-system, sans-serif; background: #0f172a; color: #f8fafc; padding: 20px; }
  h1 { margin-bottom: 20px; }
  .pair { display: flex; align-items: center; background: #1e293b; border: 1px solid #334155; border-radius: 8px; margin-bottom: 16px; padding: 12px; gap: 20px; }
  .img-box { width: 360px; text-align: center; }
  .img-box img { width: 100%; height: 240px; object-fit: contain; background: #000; border-radius: 4px; }
  .info { font-size: 13px; margin-top: 6px; font-family: monospace; }
  .diff { font-size: 16px; font-weight: bold; color: #f59e0b; }
</style>
</head>
<body>
<h1>Potential Duplicate Pairs (Ranked by Visual Similarity)</h1>
'''

for diff, f1, f2, i, j in pairs:
    html += f'''
    <div class="pair">
      <div class="img-box">
        <img src="../web/public/images/gallery/{f1}">
        <div class="info">#{i+1}: {f1}</div>
      </div>
      <div>
        <div class="diff">Diff: {diff:.2f}</div>
        <div style="font-size: 12px; color: #94a3b8;">Lower = more identical viewpoint</div>
      </div>
      <div class="img-box">
        <img src="../web/public/images/gallery/{f2}">
        <div class="info">#{j+1}: {f2}</div>
      </div>
    </div>
    '''

html += '</body></html>'

with open('scratch/duplicate_pairs.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Wrote scratch/duplicate_pairs.html')
