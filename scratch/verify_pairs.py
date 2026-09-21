import os
from PIL import Image, ImageChops, ImageStat

gallery_dir = r'web/public/images/gallery'

pairs_to_verify = [
    # Greenngoria
    ('greenngoria-04.webp', 'greenngoria-05.webp'),
    ('greenngoria-04.webp', 'greenngoria-07.webp'),
    ('greenngoria-05.webp', 'greenngoria-07.webp'),
    ('greenngoria-03.webp', 'greenngoria-06.webp'),
    ('greenngoria-10.webp', 'greenngoria-11.webp'),
    ('greenngoria-12.webp', 'greenngoria-13.webp'),
    ('greenngoria-15.webp', 'greenngoria-16.webp'),

    # DJI Drone
    ('dji-0327.webp', 'dji-0328.webp'),
    ('dji-0326.webp', 'dji-0329.webp'),
    ('dji-0326.webp', 'dji-0327.webp'),
    ('dji-0328.webp', 'dji-0329.webp'),
    ('dji-0314.webp', 'dji-0315.webp'),
    ('dji-0315.webp', 'dji-0316.webp'),
    ('dji-0316.webp', 'dji-0317.webp'),
    ('dji-0317.webp', 'dji-0318.webp'),
    ('dji-0318.webp', 'dji-0319.webp'),
    ('dji-0333.webp', 'dji-0338.webp'),

    # ACE
    ('ace4067.webp', 'ace4068.webp'),
    ('ace4068.webp', 'ace4109.webp'),
    ('ace4069.webp', 'ace4108.webp'),
    ('ace4073.webp', 'ace4074.webp'),
    ('ace4074.webp', 'ace4075.webp'),
    ('ace4083.webp', 'ace4088.webp'),
    ('ace4052.webp', 'ace4088.webp'),
    ('ace4094.webp', 'ace4095.webp'),
    ('ace4102.webp', 'ace4103.webp'),
    ('ace4133.webp', 'ace4134.webp'),
]

print(f"{'Pair':40s} | {'Size Match':10s} | {'Mean Diff':10s} | {'RMS Diff':10s}")
print("-" * 75)

for f1, f2 in pairs_to_verify:
    p1 = os.path.join(gallery_dir, f1)
    p2 = os.path.join(gallery_dir, f2)
    im1 = Image.open(p1).convert('RGB')
    im2 = Image.open(p2).convert('RGB')
    
    size_match = str(im1.size == im2.size)
    
    # Resize to common small size 128x128 for precise difference
    r1 = im1.resize((128, 128), Image.Resampling.BILINEAR)
    r2 = im2.resize((128, 128), Image.Resampling.BILINEAR)
    
    diff_img = ImageChops.difference(r1, r2)
    stat = ImageStat.Stat(diff_img)
    mean_diff = sum(stat.mean) / 3.0
    rms_diff = sum(stat.rms) / 3.0
    
    print(f"{f1 + ' <-> ' + f2:40s} | {size_match:10s} | {mean_diff:10.2f} | {rms_diff:10.2f}")
