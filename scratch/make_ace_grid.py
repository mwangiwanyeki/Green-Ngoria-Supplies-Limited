import os
import re
from PIL import Image, ImageDraw

gallery_dir = r'web/public/images/gallery'

with open('web/src/config/gallery.ts', 'r', encoding='utf-8') as f:
    text = f.read()

entries = re.findall(r'"src":\s*"/images/gallery/([^"]+)"', text)
ace_entries = [e for e in entries if e.startswith('ace')]
print(f"Total ACE entries: {len(ace_entries)}")

# Split ACE into 2 sheets
for sheet_num, chunk in enumerate([ace_entries[:32], ace_entries[32:]]):
    cols = 4
    rows = (len(chunk) + cols - 1) // cols
    W, H = 280, 210
    canvas = Image.new('RGB', (W * cols + 20, H * rows + 20), (15, 23, 42))
    draw = ImageDraw.Draw(canvas)
    for idx, f in enumerate(chunk):
        c = idx % cols
        r = idx // cols
        x = c * W + 10
        y = r * H + 10
        p = os.path.join(gallery_dir, f)
        im = Image.open(p).convert('RGB')
        im.thumbnail((W - 10, H - 25))
        # center thumbnail
        im_x = x + (W - 10 - im.width) // 2
        im_y = y + 22 + (H - 25 - im.height) // 2
        canvas.paste(im, (im_x, im_y))
        draw.text((x + 5, y + 5), f"{idx+1+sheet_num*32}: {f}", fill=(255, 255, 255))
    canvas.save(f'scratch/all_ace_overview_{sheet_num+1}.jpg', quality=85)
    print(f"Saved scratch/all_ace_overview_{sheet_num+1}.jpg")
