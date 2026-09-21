import os
import re
from PIL import Image, ImageChops, ImageStat

gallery_dir = r'web/public/images/gallery'
manifest_path = r'web/src/config/gallery.ts'

with open(manifest_path, 'r', encoding='utf-8') as f:
    text = f.read()

entries = re.findall(r'"src":\s*"/images/gallery/([^"]+)"', text)

dup_to_remove = {
    "greenngoria-05.webp",
    "greenngoria-07.webp",
    "greenngoria-03.webp",
    "greenngoria-11.webp",
    "greenngoria-13.webp",
    "greenngoria-16.webp",
    "dji-0315.webp",
    "dji-0316.webp",
    "dji-0317.webp",
    "dji-0319.webp",
    "dji-0326.webp",
    "dji-0327.webp",
    "dji-0329.webp",
    "dji-0338.webp",
    "ace4048.webp",
    "ace4074.webp",
    "ace4076.webp",
    "ace4083.webp",
    "ace4092.webp",
    "ace4095.webp",
    "ace4103.webp",
    "ace4108.webp",
    "ace4120.webp",
    "ace4134.webp"
}

remaining = [e for e in entries if e not in dup_to_remove]
print(f"Remaining entries count: {len(remaining)}")

# Load thumbnails for remaining
thumbs = {}
for name in remaining:
    p = os.path.join(gallery_dir, name)
    with Image.open(p) as img:
        thumbs[name] = img.convert('RGB').resize((64, 64), Image.Resampling.BILINEAR)

close_pairs = []
for i in range(len(remaining)):
    for j in range(i + 1, len(remaining)):
        f1, f2 = remaining[i], remaining[j]
        diff_img = ImageChops.difference(thumbs[f1], thumbs[f2])
        mean_diff = sum(ImageStat.Stat(diff_img).mean) / 3.0
        if mean_diff < 32:
            close_pairs.append((mean_diff, f1, f2))

close_pairs.sort()
print(f"\nRemaining pairs with diff < 32 ({len(close_pairs)} found):")
for diff, f1, f2 in close_pairs:
    print(f"  {diff:5.2f} : {f1:22s} <--> {f2}")
