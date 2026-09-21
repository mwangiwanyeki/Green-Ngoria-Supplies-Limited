"""
Finalize all 4 leadership photos in exact 4:5 aspect ratio with pure white backgrounds (#ffffff).
"""
import os
from PIL import Image, ImageFilter
from collections import deque

leadership_dir = os.path.join("web", "public", "images", "leadership")

def save_all_formats(name, img):
    png_path = os.path.join(leadership_dir, f"{name}.png")
    jpg_path = os.path.join(leadership_dir, f"{name}.jpg")
    webp_path = os.path.join(leadership_dir, f"{name}.webp")

    img.save(png_path, format="PNG", optimize=True)
    img.save(jpg_path, format="JPEG", quality=95)
    img.save(webp_path, format="WEBP", quality=95)
    print(f"Saved {name} in PNG, JPG, and WebP (size={img.size})")

def process_kenneth():
    print("Processing Kenneth Madete Namboga...")
    src = os.path.join(leadership_dir, "kenneth-madete-namboga.png")
    im = Image.open(src).convert("RGB")
    w, h = im.size
    pixels = im.load()

    # Flood fill any near-white background from corners
    queue = deque([(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)])
    visited = set()
    while queue:
        cx, cy = queue.popleft()
        if (cx, cy) in visited:
            continue
        visited.add((cx, cy))
        r, g, b = pixels[cx, cy]
        if min(r, g, b) >= 235:
            pixels[cx, cy] = (255, 255, 255)
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = cx + dx, cy + dy
                if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                    nr, ng, nb = pixels[nx, ny]
                    if min(nr, ng, nb) >= 235:
                        queue.append((nx, ny))

    save_all_formats("kenneth-madete-namboga", im)

def process_davis():
    print("Processing Davis Mragha Ngoo (4:5)...")
    src = os.path.join(leadership_dir, "davis-mragha-ngoo.png")
    im = Image.open(src).convert("RGB")
    w, h = im.size
    pixels = im.load()

    # Flood fill any near-white background from corners
    queue = deque([(0, 0), (w - 1, 0), (w // 2, 0), (0, h // 2), (w - 1, h // 2)])
    visited = set()
    while queue:
        cx, cy = queue.popleft()
        if (cx, cy) in visited:
            continue
        visited.add((cx, cy))
        r, g, b = pixels[cx, cy]
        if min(r, g, b) >= 230:
            pixels[cx, cy] = (255, 255, 255)
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = cx + dx, cy + dy
                if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                    nr, ng, nb = pixels[nx, ny]
                    if min(nr, ng, nb) >= 230:
                        queue.append((nx, ny))

    # Frame into 4:5 ratio
    target_w = int(h * 4 / 5) # 453
    framed = Image.new("RGB", (target_w, h), (255, 255, 255))
    offset_x = (target_w - w) // 2
    framed.paste(im, (offset_x, 0))

    save_all_formats("davis-mragha-ngoo", framed)

def process_raymond():
    print("Processing Raymond Nyange Ngoo (4:5)...")
    src = "scratch/raymond_clean.png"
    im = Image.open(src).convert("RGB")
    save_all_formats("raymond-nyange-ngoo", im)

def process_chrispine():
    print("Processing Chrispine Ryan Ngoo (4:5)...")
    src = "scratch/chrispine_restored.png"
    im = Image.open(src).convert("RGB")
    w, h = im.size
    pixels = im.load()

    # Clean left and right boundary margins outside jacket
    for y in range(h):
        for x in range(w):
            if x <= 8:
                pixels[x, y] = (255, 255, 255)
            if x <= 25 and y <= 265:
                pixels[x, y] = (255, 255, 255)
            if x <= 45 and y <= 230:
                pixels[x, y] = (255, 255, 255)
            if x >= 270 and y <= 230:
                pixels[x, y] = (255, 255, 255)

    # Frame into 4:5 ratio (300 x 375)
    target_h = int(w * 5 / 4) # 375
    framed = Image.new("RGB", (w, target_h), (255, 255, 255))
    framed.paste(im, (0, target_h - h))

    save_all_formats("chrispine-ryan-ngoo", framed)

if __name__ == "__main__":
    process_kenneth()
    process_davis()
    process_raymond()
    process_chrispine()
    print("\nAll 4 leadership images successfully standardized in 4:5 pure white format!")
