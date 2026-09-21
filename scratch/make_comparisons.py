import os
from PIL import Image, ImageChops, ImageDraw, ImageFont

os.makedirs('scratch/comparisons', exist_ok=True)
gallery_dir = r'web/public/images/gallery'

pairs = [
    # Greenngoria
    ('greenngoria-04.webp', 'greenngoria-05.webp', 'Greenngoria 04 vs 05'),
    ('greenngoria-04.webp', 'greenngoria-07.webp', 'Greenngoria 04 vs 07'),
    ('greenngoria-03.webp', 'greenngoria-06.webp', 'Greenngoria 03 vs 06'),
    ('greenngoria-10.webp', 'greenngoria-11.webp', 'Greenngoria 10 vs 11'),
    ('greenngoria-12.webp', 'greenngoria-13.webp', 'Greenngoria 12 vs 13'),
    ('greenngoria-15.webp', 'greenngoria-16.webp', 'Greenngoria 15 vs 16'),
    
    # DJI
    ('dji-0314.webp', 'dji-0315.webp', 'DJI 0314 vs 0315'),
    ('dji-0315.webp', 'dji-0316.webp', 'DJI 0315 vs 0316'),
    ('dji-0316.webp', 'dji-0317.webp', 'DJI 0316 vs 0317'),
    ('dji-0318.webp', 'dji-0319.webp', 'DJI 0318 vs 0319'),
    ('dji-0326.webp', 'dji-0327.webp', 'DJI 0326 vs 0327'),
    ('dji-0327.webp', 'dji-0328.webp', 'DJI 0327 vs 0328'),
    ('dji-0328.webp', 'dji-0329.webp', 'DJI 0328 vs 0329'),
    ('dji-0333.webp', 'dji-0338.webp', 'DJI 0333 vs 0338'),
    
    # ACE
    ('ace4068.webp', 'ace4109.webp', 'ACE 4068 vs 4109'),
    ('ace4073.webp', 'ace4074.webp', 'ACE 4073 vs 4074'),
    ('ace4075.webp', 'ace4076.webp', 'ACE 4075 vs 4076'),
    ('ace4082.webp', 'ace4083.webp', 'ACE 4082 vs 4083'),
    ('ace4094.webp', 'ace4095.webp', 'ACE 4094 vs 4095'),
    ('ace4102.webp', 'ace4103.webp', 'ACE 4102 vs 4103'),
    ('ace4133.webp', 'ace4134.webp', 'ACE 4133 vs 4134')
]

for f1, f2, label in pairs:
    p1 = os.path.join(gallery_dir, f1)
    p2 = os.path.join(gallery_dir, f2)
    
    im1 = Image.open(p1).convert('RGB')
    im2 = Image.open(p2).convert('RGB')
    
    # Resize to common 400x300 for side-by-side
    r1 = im1.resize((400, 300))
    r2 = im2.resize((400, 300))
    diff = ImageChops.difference(r1, r2)
    
    comp = Image.new('RGB', (1220, 340), (15, 23, 42))
    comp.paste(r1, (10, 30))
    comp.paste(r2, (420, 30))
    comp.paste(diff, (830, 30))
    
    draw = ImageDraw.Draw(comp)
    draw.text((10, 8), f"{f1} (Original)", fill=(255, 255, 255))
    draw.text((420, 8), f"{f2} (Candidate Duplicate)", fill=(255, 255, 255))
    draw.text((830, 8), "Difference (Darker = More Identical)", fill=(255, 200, 0))
    
    out_name = f"{f1.split('.')[0]}_vs_{f2.split('.')[0]}.jpg"
    comp.save(os.path.join('scratch/comparisons', out_name), quality=85)

print(f"Generated {len(pairs)} comparison images in scratch/comparisons/")
