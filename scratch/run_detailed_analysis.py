import os
from PIL import Image, ImageChops, ImageStat

gallery_dir = r'web/public/images/gallery'

def analyze_set(files, title):
    print(f"\n=======================================================")
    print(f"ANALYSIS OF: {title}")
    print(f"=======================================================")
    
    # Load all images in set
    images = {}
    for f in files:
        p = os.path.join(gallery_dir, f)
        images[f] = Image.open(p)
    
    # Compare all pairs in set
    for i in range(len(files)):
        for j in range(i + 1, len(files)):
            f1, f2 = files[i], files[j]
            im1, im2 = images[f1], images[f2]
            
            # Check orientation
            ar1 = im1.width / im1.height
            ar2 = im2.width / im2.height
            
            # Normalize to 256x256 RGB
            r1 = im1.convert('RGB').resize((256, 256), Image.Resampling.BILINEAR)
            r2 = im2.convert('RGB').resize((256, 256), Image.Resampling.BILINEAR)
            
            diff = ImageChops.difference(r1, r2)
            stat = ImageStat.Stat(diff)
            mean_val = sum(stat.mean) / 3.0
            rms_val = sum(stat.rms) / 3.0
            
            # Check 9 sub-grid patches (3x3 grid)
            patch_diffs = []
            for row in range(3):
                for col in range(3):
                    box = (col*85, row*85, (col+1)*85, (row+1)*85)
                    pdiff = ImageChops.difference(r1.crop(box), r2.crop(box))
                    pstat = ImageStat.Stat(pdiff)
                    patch_diffs.append(sum(pstat.mean) / 3.0)
            
            max_patch = max(patch_diffs)
            min_patch = min(patch_diffs)
            
            status = "UNKNOWN"
            if mean_val < 15 and max_patch < 25:
                status = "IDENTICAL / BURST SHOT"
            elif mean_val < 32 and max_patch < 45:
                status = "VERY SIMILAR VIEWPOINT"
            elif mean_val < 38:
                status = "SIMILAR VIEWPOINT"
            else:
                status = "DIFFERENT VIEWPOINT / ANGLE"
                
            print(f"{f1:20s} vs {f2:20s} -> Mean={mean_val:5.2f}, MaxPatch={max_patch:5.2f}, ARs=({ar1:.2f}, {ar2:.2f}) [{status}]")

# Let's run for all clusters
clusters = [
    (["greenngoria-04.webp", "greenngoria-05.webp", "greenngoria-07.webp"], "Greenngoria 04, 05, 07"),
    (["greenngoria-03.webp", "greenngoria-06.webp"], "Greenngoria 03, 06"),
    (["greenngoria-10.webp", "greenngoria-11.webp"], "Greenngoria 10, 11"),
    (["greenngoria-12.webp", "greenngoria-13.webp"], "Greenngoria 12, 13"),
    (["greenngoria-15.webp", "greenngoria-16.webp"], "Greenngoria 15, 16"),
    (["dji-0314.webp", "dji-0315.webp", "dji-0316.webp", "dji-0317.webp", "dji-0318.webp", "dji-0319.webp"], "DJI 0314-0319"),
    (["dji-0326.webp", "dji-0327.webp", "dji-0328.webp", "dji-0329.webp"], "DJI 0326-0329"),
    (["dji-0333.webp", "dji-0338.webp"], "DJI 0333, 0338"),
    (["ace4036.webp", "ace4037.webp"], "ACE 4036, 4037"),
    (["ace4042.webp", "ace4043.webp"], "ACE 4042, 4043"),
    (["ace4044.webp", "ace4045.webp"], "ACE 4044, 4045"),
    (["ace4048.webp", "ace4049.webp", "ace4050.webp"], "ACE 4048, 4049, 4050"),
    (["ace4054.webp", "ace4055.webp"], "ACE 4054, 4055"),
    (["ace4067.webp", "ace4068.webp", "ace4069.webp", "ace4108.webp", "ace4109.webp"], "ACE 4067, 4068, 4069, 4108, 4109"),
    (["ace4073.webp", "ace4074.webp", "ace4075.webp", "ace4076.webp"], "ACE 4073, 4074, 4075, 4076"),
    (["ace4082.webp", "ace4083.webp", "ace4088.webp"], "ACE 4082, 4083, 4088"),
    (["ace4085.webp", "ace4086.webp", "ace4087.webp"], "ACE 4085, 4086, 4087"),
    (["ace4094.webp", "ace4095.webp", "ace4096.webp", "ace4097.webp"], "ACE 4094, 4095, 4096, 4097"),
    (["ace4101.webp", "ace4102.webp", "ace4103.webp"], "ACE 4101, 4102, 4103"),
    (["ace4111.webp", "ace4112.webp", "ace4113.webp", "ace4114.webp", "ace4115.webp", "ace4116.webp", "ace4117.webp", "ace4118.webp"], "ACE 4111-4118"),
    (["ace4130.webp", "ace4131.webp", "ace4132.webp", "ace4133.webp", "ace4134.webp"], "ACE 4130-4134")
]

for files, title in clusters:
    analyze_set(files, title)
