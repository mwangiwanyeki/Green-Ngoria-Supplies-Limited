import os
import re
from PIL import Image

gallery_dir = r'web/public/images/gallery'

with open(r'web/src/config/gallery.ts', 'r', encoding='utf-8') as f:
    text = f.read()

entries = re.findall(r'"src":\s*"/images/gallery/([^"]+)"', text)

# Let's inspect the exact image content of candidate duplicate groups
groups = {
    "Greenngoria Processing Tanks Burst (04, 05, 07)": ["greenngoria-04.webp", "greenngoria-05.webp", "greenngoria-07.webp"],
    "Greenngoria Slurry / Leaching (03, 06)": ["greenngoria-03.webp", "greenngoria-06.webp"],
    "Greenngoria Cyanide / Agitation (10, 11)": ["greenngoria-10.webp", "greenngoria-11.webp"],
    "Greenngoria Plant Structure (12, 13)": ["greenngoria-12.webp", "greenngoria-13.webp"],
    "Greenngoria Site Overhead (15, 16)": ["greenngoria-15.webp", "greenngoria-16.webp"],
    "DJI Drone High Angle Tanks (0314, 0315, 0316, 0317, 0318, 0319)": ["dji-0314.webp", "dji-0315.webp", "dji-0316.webp", "dji-0317.webp", "dji-0318.webp", "dji-0319.webp"],
    "DJI Drone Plant Overview (0326, 0327, 0328, 0329)": ["dji-0326.webp", "dji-0327.webp", "dji-0328.webp", "dji-0329.webp"],
    "DJI Drone Oblique / Wide (0333, 0338)": ["dji-0333.webp", "dji-0338.webp"],
    "ACE Conveyor / Feed (4067, 4068, 4069, 4108, 4109)": ["ace4067.webp", "ace4068.webp", "ace4069.webp", "ace4108.webp", "ace4109.webp"],
    "ACE Tank Base / Piping (4073, 4074, 4075, 4076)": ["ace4073.webp", "ace4074.webp", "ace4075.webp", "ace4076.webp"],
    "ACE Mill / Motor (4094, 4095, 4096, 4097)": ["ace4094.webp", "ace4095.webp", "ace4096.webp", "ace4097.webp"],
    "ACE Flotation / Vat (4101, 4102, 4103)": ["ace4101.webp", "ace4102.webp", "ace4103.webp"],
    "ACE Structural Framing (4133, 4134)": ["ace4133.webp", "ace4134.webp"]
}

for title, files in groups.items():
    print(f"\n=======================================================")
    print(f"{title}")
    print(f"=======================================================")
    for f in files:
        p = os.path.join(gallery_dir, f)
        stat = os.stat(p)
        im = Image.open(p)
        print(f"  {f:22s} | Size: {im.size} | Bytes: {stat.st_size:>8d} | File #{entries.index(f)+1 if f in entries else 'N/A'}")
