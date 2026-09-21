import os
from PIL import Image

gallery_dir = r'web/public/images/gallery'

groups = [
    ('Greenngoria 04, 05, 07', ['greenngoria-04.webp', 'greenngoria-05.webp', 'greenngoria-07.webp']),
    ('Greenngoria 03, 06', ['greenngoria-03.webp', 'greenngoria-06.webp']),
    ('Greenngoria 10, 11', ['greenngoria-10.webp', 'greenngoria-11.webp']),
    ('Greenngoria 12, 13', ['greenngoria-12.webp', 'greenngoria-13.webp']),
    ('Greenngoria 15, 16', ['greenngoria-15.webp', 'greenngoria-16.webp']),
    ('DJI 0326-0329', ['dji-0326.webp', 'dji-0327.webp', 'dji-0328.webp', 'dji-0329.webp']),
    ('DJI 0314-0319', ['dji-0314.webp', 'dji-0315.webp', 'dji-0316.webp', 'dji-0317.webp', 'dji-0318.webp', 'dji-0319.webp']),
    ('DJI 0333, 0338', ['dji-0333.webp', 'dji-0338.webp']),
    ('ACE 4036, 4037', ['ace4036.webp', 'ace4037.webp']),
    ('ACE 4042, 4043', ['ace4042.webp', 'ace4043.webp']),
    ('ACE 4044, 4045', ['ace4044.webp', 'ace4045.webp']),
    ('ACE 4048-4050', ['ace4048.webp', 'ace4049.webp', 'ace4050.webp']),
    ('ACE 4054, 4055', ['ace4054.webp', 'ace4055.webp']),
    ('ACE 4067-4069, 4108, 4109', ['ace4067.webp', 'ace4068.webp', 'ace4069.webp', 'ace4108.webp', 'ace4109.webp']),
    ('ACE 4073-4076', ['ace4073.webp', 'ace4074.webp', 'ace4075.webp', 'ace4076.webp']),
    ('ACE 4082, 4083, 4088', ['ace4082.webp', 'ace4083.webp', 'ace4088.webp']),
    ('ACE 4085-4087', ['ace4085.webp', 'ace4086.webp', 'ace4087.webp']),
    ('ACE 4094-4097', ['ace4094.webp', 'ace4095.webp', 'ace4096.webp', 'ace4097.webp']),
    ('ACE 4101-4103', ['ace4101.webp', 'ace4102.webp', 'ace4103.webp']),
    ('ACE 4111-4118', ['ace4111.webp', 'ace4112.webp', 'ace4113.webp', 'ace4114.webp', 'ace4115.webp', 'ace4116.webp', 'ace4117.webp', 'ace4118.webp']),
    ('ACE 4130-4134', ['ace4130.webp', 'ace4131.webp', 'ace4132.webp', 'ace4133.webp', 'ace4134.webp']),
]

for title, fnames in groups:
    print(f'\n=== {title} ===')
    for i in range(len(fnames)):
        for j in range(i+1, len(fnames)):
            f1, f2 = fnames[i], fnames[j]
            p1 = os.path.join(gallery_dir, f1)
            p2 = os.path.join(gallery_dir, f2)
            with Image.open(p1) as im1, Image.open(p2) as im2:
                # Compare aspect ratio
                ar1 = im1.width / im1.height
                ar2 = im2.width / im2.height
                
                # Compare 64x64 grayscale
                t1 = list(im1.convert('L').resize((64, 64)).getdata())
                t2 = list(im2.convert('L').resize((64, 64)).getdata())
                diff = sum(abs(a - b) for a, b in zip(t1, t2)) / 4096.0
                print(f'  {f1} vs {f2}: diff={diff:.2f}, AR={ar1:.2f} vs {ar2:.2f}, size={im1.size} vs {im2.size}')
