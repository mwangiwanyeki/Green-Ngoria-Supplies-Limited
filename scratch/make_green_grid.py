import os
import re
from PIL import Image, ImageDraw

gallery_dir = r'web/public/images/gallery'

with open('web/src/config/gallery.ts', 'r', encoding='utf-8') as f:
    text = f.read()

entries = re.findall(r'"src":\s*"/images/gallery/([^"]+)"', text)
green_entries = [e for e in entries if e.startswith('greenngoria')]

cols = 4
rows = (len(green_entries) + cols - 1) // cols
W, H = 280, 210
canvas = Image.new('RGB', (W * cols + 20, H * rows + 20), (15, 23, 42))
draw = ImageDraw.Draw(canvas)

for idx, f in enumerate(green_entries):
    c = idx % cols
    r = idx // cols
    x = c * W + 10
    y = r * H + 10
    im = Image.open(os.path.join(gallery_dir, f)).convert('RGB')
    im.thumbnail((W - 10, H - 25))
    im_x = x + (W - 10 - im.width) // 2
    im_y = y + 22 + (H - 25 - im.height) // 2
    canvas.paste(im, (im_x, im_y))
    draw.text((x + 5, y + 5), f, fill=(255, 255, 255))

canvas.save('scratch/all_greenngoria_overview.jpg', quality=85)
print('Saved scratch/all_greenngoria_overview.jpg')
