import os
import re
from PIL import Image, ImageChops, ImageStat

gallery_dir = r'web/public/images/gallery'
manifest_path = r'web/src/config/gallery.ts'

with open(manifest_path, 'r', encoding='utf-8') as f:
    text = f.read()

entries = re.findall(r'"src":\s*"/images/gallery/([^"]+)"', text)
print(f"Total images in gallery.ts: {len(entries)}")

thumbs = {}
sizes = {}

for name in entries:
    p = os.path.join(gallery_dir, name)
    with Image.open(p) as img:
        sizes[name] = img.size
        thumbs[name] = img.convert('RGB').resize((64, 64), Image.Resampling.BILINEAR)

similar_pairs = []
for i in range(len(entries)):
    for j in range(i + 1, len(entries)):
        f1, f2 = entries[i], entries[j]
        diff_img = ImageChops.difference(thumbs[f1], thumbs[f2])
        stat = ImageStat.Stat(diff_img)
        mean_diff = sum(stat.mean) / 3.0
        rms_diff = sum(stat.rms) / 3.0

        if mean_diff < 36:
            similar_pairs.append({
                'f1': f1,
                'f2': f2,
                'mean_diff': mean_diff,
                'rms_diff': rms_diff,
                'size1': sizes[f1],
                'size2': sizes[f2],
                'i': i,
                'j': j
            })

similar_pairs.sort(key=lambda x: x['mean_diff'])
print(f"\nFound {len(similar_pairs)} pairs with mean_diff < 36:")
for p in similar_pairs:
    print(f"  {p['f1']:20s} (#{p['i']+1}) <--> {p['f2']:20s} (#{p['j']+1}) | mean={p['mean_diff']:5.2f} | rms={p['rms_diff']:5.2f}")
