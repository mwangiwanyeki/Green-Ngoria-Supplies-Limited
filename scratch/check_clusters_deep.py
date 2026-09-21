import os
import re
from PIL import Image

gallery_dir = r'web/public/images/gallery'

# Let's inspect each sequence
with open(r'web/src/config/gallery.ts', 'r', encoding='utf-8') as f:
    text = f.read()

entries = re.findall(r'"src":\s*"/images/gallery/([^"]+)"', text)

print(f"Total entries: {len(entries)}")

# Let's define the clusters we suspect and inspect their exact properties
clusters = [
    ("Greenngoria 04, 05, 07", ["greenngoria-04.webp", "greenngoria-05.webp", "greenngoria-07.webp"]),
    ("Greenngoria 03, 06", ["greenngoria-03.webp", "greenngoria-06.webp"]),
    ("Greenngoria 10, 11", ["greenngoria-10.webp", "greenngoria-11.webp"]),
    ("Greenngoria 12, 13", ["greenngoria-12.webp", "greenngoria-13.webp"]),
    ("Greenngoria 15, 16", ["greenngoria-15.webp", "greenngoria-16.webp"]),
    ("DJI 0314 through 0319", ["dji-0314.webp", "dji-0315.webp", "dji-0316.webp", "dji-0317.webp", "dji-0318.webp", "dji-0319.webp"]),
    ("DJI 0326 through 0329", ["dji-0326.webp", "dji-0327.webp", "dji-0328.webp", "dji-0329.webp"]),
    ("DJI 0333, 0338", ["dji-0333.webp", "dji-0338.webp"]),
    ("ACE 4036, 4037", ["ace4036.webp", "ace4037.webp"]),
    ("ACE 4042, 4043", ["ace4042.webp", "ace4043.webp"]),
    ("ACE 4044, 4045", ["ace4044.webp", "ace4045.webp"]),
    ("ACE 4048, 4049, 4050", ["ace4048.webp", "ace4049.webp", "ace4050.webp"]),
    ("ACE 4054, 4055", ["ace4054.webp", "ace4055.webp"]),
    ("ACE 4067, 4068, 4069, 4108, 4109", ["ace4067.webp", "ace4068.webp", "ace4069.webp", "ace4108.webp", "ace4109.webp"]),
    ("ACE 4073, 4074, 4075, 4076", ["ace4073.webp", "ace4074.webp", "ace4075.webp", "ace4076.webp"]),
    ("ACE 4082, 4083, 4088", ["ace4082.webp", "ace4083.webp", "ace4088.webp"]),
    ("ACE 4085, 4086, 4087", ["ace4085.webp", "ace4086.webp", "ace4087.webp"]),
    ("ACE 4094, 4095, 4096, 4097", ["ace4094.webp", "ace4095.webp", "ace4096.webp", "ace4097.webp"]),
    ("ACE 4101, 4102, 4103", ["ace4101.webp", "ace4102.webp", "ace4103.webp"]),
    ("ACE 4111 through 4118", [f"ace411{k}.webp" for k in range(1, 9)]),
    ("ACE 4130 through 4134", [f"ace413{k}.webp" for k in range(0, 5)])
]

for name, files in clusters:
    print(f"\n==================== {name} ====================")
    for f in files:
        p = os.path.join(gallery_dir, f)
        if not os.path.exists(p):
            print(f"  {f}: NOT FOUND")
            continue
        with Image.open(p) as img:
            print(f"  {f:22s}: size={img.size}, mode={img.mode}")
