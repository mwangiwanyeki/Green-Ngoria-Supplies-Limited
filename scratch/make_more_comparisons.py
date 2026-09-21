import os
from PIL import Image, ImageChops, ImageDraw

os.makedirs('scratch/comparisons', exist_ok=True)
gallery_dir = r'web/public/images/gallery'

candidate_pairs = [
    ('ace4120.webp', 'ace4121.webp', 'Team photo burst'),
    ('ace4083.webp', 'ace4088.webp', 'Concrete foundations'),
    ('ace4133.webp', 'ace4134.webp', 'Engineers on walkway'),
    ('ace4131.webp', 'ace4132.webp', 'Engineers on stairs'),
    ('ace4048.webp', 'ace4049.webp', 'Pump in shed'),
    ('ace4090.webp', 'ace4092.webp', 'Water truck rear'),
    ('ace4068.webp', 'ace4109.webp', 'Plant structure'),
    ('ace4085.webp', 'ace4086.webp', 'Water trailer vs pipe'),
]

for f1, f2, label in candidate_pairs:
    p1 = os.path.join(gallery_dir, f1)
    p2 = os.path.join(gallery_dir, f2)
    im1 = Image.open(p1).convert('RGB')
    im2 = Image.open(p2).convert('RGB')
    
    r1 = im1.resize((400, 300))
    r2 = im2.resize((400, 300))
    diff = ImageChops.difference(r1, r2)
    
    comp = Image.new('RGB', (1220, 340), (15, 23, 42))
    comp.paste(r1, (10, 30))
    comp.paste(r2, (420, 30))
    comp.paste(diff, (830, 30))
    
    draw = ImageDraw.Draw(comp)
    draw.text((10, 8), f"{f1} - {im1.size}", fill=(255, 255, 255))
    draw.text((420, 8), f"{f2} - {im2.size} ({label})", fill=(255, 255, 255))
    draw.text((830, 8), "Difference", fill=(255, 200, 0))
    
    out_name = f"{f1.split('.')[0]}_vs_{f2.split('.')[0]}.jpg"
    comp.save(os.path.join('scratch/comparisons', out_name), quality=85)

print("Saved candidate comparisons.")
