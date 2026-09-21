import os
from PIL import Image

gallery_dir = r'web/public/images/gallery'

pairs = [
    # DJI drone cluster
    ('dji-0314.webp', 'dji-0315.webp'),
    ('dji-0315.webp', 'dji-0316.webp'),
    ('dji-0316.webp', 'dji-0317.webp'),
    ('dji-0318.webp', 'dji-0319.webp'),
    ('dji-0326.webp', 'dji-0327.webp'),
    ('dji-0327.webp', 'dji-0328.webp'),
    ('dji-0328.webp', 'dji-0329.webp'),
    ('dji-0333.webp', 'dji-0338.webp'),

    # Greenngoria cluster
    ('greenngoria-04.webp', 'greenngoria-05.webp'),
    ('greenngoria-04.webp', 'greenngoria-07.webp'),
    ('greenngoria-03.webp', 'greenngoria-06.webp'),
    ('greenngoria-10.webp', 'greenngoria-11.webp'),
    ('greenngoria-12.webp', 'greenngoria-13.webp'),
    ('greenngoria-15.webp', 'greenngoria-16.webp'),

    # ACE cluster
    ('ace4068.webp', 'ace4109.webp'),
    ('ace4073.webp', 'ace4074.webp'),
    ('ace4083.webp', 'ace4088.webp'),
    ('ace4094.webp', 'ace4095.webp'),
    ('ace4102.webp', 'ace4103.webp'),
    ('ace4133.webp', 'ace4134.webp'),
]

# For each pair, crop 4 corners + center (5 patches) and compute correlation
print(f"{'Pair':35s} | {'Corner1':8s} | {'Corner2':8s} | {'Center':8s} | {'Corner3':8s} | {'Corner4':8s} | {'Verdict'}")
print("-" * 90)

for f1, f2 in pairs:
    im1 = Image.open(os.path.join(gallery_dir, f1)).convert('L').resize((100, 100))
    im2 = Image.open(os.path.join(gallery_dir, f2)).convert('L').resize((100, 100))
    
    # 5 zones: top-left, top-right, center, bottom-left, bottom-right
    zones = [
        (0, 0, 40, 40),
        (60, 0, 100, 40),
        (30, 30, 70, 70),
        (0, 60, 40, 100),
        (60, 60, 100, 100)
    ]
    diffs = []
    for box in zones:
        p1 = list(im1.crop(box).getdata())
        p2 = list(im2.crop(box).getdata())
        d = sum(abs(a - b) for a, b in zip(p1, p2)) / len(p1)
        diffs.append(d)
    
    avg_diff = sum(diffs) / len(diffs)
    is_dup = avg_diff < 35
    verdict = "SAME VIEWPOINT (DUPLICATE)" if is_dup else "DIFFERENT VIEW"
    
    d_str = " | ".join(f"{d:8.1f}" for d in diffs)
    print(f"{f1 + ' <-> ' + f2:35s} | {d_str} | {verdict}")
