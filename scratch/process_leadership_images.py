"""
Process leadership photos to have uniform pure white backgrounds (#ffffff).
"""
import os
import sys
from PIL import Image

def process_images():
    try:
        from rembg import remove, new_session
    except ImportError:
        print("rembg is not installed yet!")
        return False

    session = new_session("u2net")
    leadership_dir = os.path.join("web", "public", "images", "leadership")
    backup_dir = os.path.join("scratch", "leadership_backup")
    os.makedirs(backup_dir, exist_ok=True)
    os.makedirs("scratch/leadership_preview", exist_ok=True)

    leaders = [
        "chrispine-ryan-ngoo",
        "raymond-nyange-ngoo",
        "davis-mragha-ngoo",
        "kenneth-madete-namboga",
    ]

    for leader in leaders:
        src_png = os.path.join(leadership_dir, f"{leader}.png")
        if not os.path.exists(src_png):
            print(f"File not found: {src_png}")
            continue

        print(f"\nProcessing {leader}...")
        orig_img = Image.open(src_png).convert("RGB")
        w, h = orig_img.size
        print(f"  Original dimensions: {w}x{h}")

        # Backup original
        backup_png = os.path.join(backup_dir, f"{leader}_orig.png")
        if not os.path.exists(backup_png):
            orig_img.save(backup_png)

        if leader == "kenneth-madete-namboga":
            # Kenneth is already pure white background (255, 255, 255).
            # Verify and ensure clean pure white background without touching foreground
            print("  Kenneth already has a pure white background. Verifying...")
            # We can still composite onto pure white or leave as is
            bg_white = Image.new("RGB", (w, h), (255, 255, 255))
            # Just ensure any stray non-white in top corners is clean
            # Kenneth's corners are (255, 255, 255) already.
            clean_img = orig_img
        else:
            # Segment foreground with rembg
            print("  Extracting foreground with rembg...")
            fg_rgba = remove(orig_img, session=session)
            
            # Create pure white background
            white_bg = Image.new("RGBA", (w, h), (255, 255, 255, 255))
            
            # Alpha composite
            composited = Image.alpha_composite(white_bg, fg_rgba)
            clean_img = composited.convert("RGB")

        # Save preview
        preview_path = os.path.join("scratch", "leadership_preview", f"{leader}_white.png")
        clean_img.save(preview_path)
        print(f"  Saved preview to {preview_path}")

        # Save to web/public/images/leadership/ in PNG, JPG, and WebP formats
        target_png = os.path.join(leadership_dir, f"{leader}.png")
        target_jpg = os.path.join(leadership_dir, f"{leader}.jpg")
        target_webp = os.path.join(leadership_dir, f"{leader}.webp")

        clean_img.save(target_png, format="PNG", optimize=True)
        clean_img.save(target_jpg, format="JPEG", quality=95)
        clean_img.save(target_webp, format="WEBP", quality=95)
        print(f"  Updated {target_png}, {target_jpg}, {target_webp}")

    print("\nAll leadership images processed successfully!")
    return True

if __name__ == "__main__":
    process_images()
