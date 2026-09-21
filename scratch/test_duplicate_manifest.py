import os
import re
import json

manifest_path = r'web/src/config/gallery.ts'
with open(manifest_path, 'r', encoding='utf-8') as f:
    text = f.read()

entries = re.findall(r'"src":\s*"/images/gallery/([^"]+)"', text)

# Comprehensive list of duplicates of the same viewpoint
# For each duplicate, we document the keeper and the exact reason:
duplicate_analysis = [
    {
        "duplicate": "greenngoria-05.webp",
        "keeper": "greenngoria-04.webp",
        "reason": "Exact tripod burst shot of primary crushing station and rock stockpiles. Frame 4 is the cleanest composition."
    },
    {
        "duplicate": "greenngoria-07.webp",
        "keeper": "greenngoria-04.webp",
        "reason": "Exact tripod burst shot of primary crushing station. Identical viewpoint to 04."
    },
    {
        "duplicate": "greenngoria-03.webp",
        "keeper": "greenngoria-06.webp",
        "reason": "Same viewpoint of secondary screening and conveyor system. 03 has a distracting blue pipe cutting across the bottom-left corner; 06 is unobstructed with worker."
    },
    {
        "duplicate": "greenngoria-11.webp",
        "keeper": "greenngoria-10.webp",
        "reason": "Exact tripod burst shot of the dual ball mill circuit (blue and cream). 10 is used across marketing pages and is retained."
    },
    {
        "duplicate": "greenngoria-13.webp",
        "keeper": "greenngoria-12.webp",
        "reason": "Exact tripod burst shot of CIP/CIL green leaching tanks with operator in red shirt on top walkway."
    },
    {
        "duplicate": "greenngoria-16.webp",
        "keeper": "greenngoria-15.webp",
        "reason": "Continuous shutter burst of workers digging earth with shovels. 15 has the worker upright with shovel in action."
    },
    {
        "duplicate": "dji-0315.webp",
        "keeper": "dji-0314.webp",
        "reason": "High-altitude drone aerial shot of entire processing plant and access roads. 0314 is the master wide-angle frame."
    },
    {
        "duplicate": "dji-0316.webp",
        "keeper": "dji-0314.webp",
        "reason": "High-altitude drone aerial shot of plant. Redundant duplicate of 0314."
    },
    {
        "duplicate": "dji-0317.webp",
        "keeper": "dji-0314.webp",
        "reason": "High-altitude drone aerial shot of plant. Redundant duplicate of 0314."
    },
    {
        "duplicate": "dji-0319.webp",
        "keeper": "dji-0318.webp",
        "reason": "High-altitude drone aerial shot of tailings retention dam / reservoir. Exact duplicate viewpoint of 0318 (which is featured on homepage)."
    },
    {
        "duplicate": "dji-0326.webp",
        "keeper": "dji-0328.webp",
        "reason": "Drone overhead hover shot of yellow excavator loading white dump truck. 0328 captures the excavator actively digging into the bank."
    },
    {
        "duplicate": "dji-0327.webp",
        "keeper": "dji-0328.webp",
        "reason": "Drone overhead hover shot of excavator and dump truck. Virtually identical to 0328."
    },
    {
        "duplicate": "dji-0329.webp",
        "keeper": "dji-0328.webp",
        "reason": "Drone overhead hover shot of excavator and dump truck. Redundant burst frame."
    },
    {
        "duplicate": "dji-0338.webp",
        "keeper": "dji-0333.webp",
        "reason": "Vertical top-down drone aerial of the plant, tanks, and milling circuits. 0333 is the hero image and perfectly centered; 0338 is redundant in the gallery."
    },
    {
        "duplicate": "ace4048.webp",
        "keeper": "ace4049.webp",
        "reason": "Shot of blue blower / compressor in shed. 4048 is severely obstructed by a blue pole in the foreground; 4049 is clearer."
    },
    {
        "duplicate": "ace4074.webp",
        "keeper": "ace4073.webp",
        "reason": "Exact tripod duplicate shot of electrowinning / elution cell. 4073 is crisp and properly exposed; 4074 is washed out."
    },
    {
        "duplicate": "ace4076.webp",
        "keeper": "ace4075.webp",
        "reason": "Exact duplicate viewpoint of twin vertical slurry pumps with black motors against teal wall. 4075 is cleanly framed."
    },
    {
        "duplicate": "ace4083.webp",
        "keeper": "ace4088.webp",
        "reason": "Ground view of circular concrete vat leaching foundations. 4088 provides the complete wide context with road and earthworks."
    },
    {
        "duplicate": "ace4092.webp",
        "keeper": "ace4090.webp",
        "reason": "Rear view of clean water tanker truck parked at site building. 4090 is the complete 3/4 vehicle shot; 4092 is an unneeded close-up of the rear bumper."
    },
    {
        "duplicate": "ace4095.webp",
        "keeper": "ace4094.webp",
        "reason": "Shutter burst of orange Bobcat skid-steer loader with operator in green overalls. 4094 is the active operating shot."
    },
    {
        "duplicate": "ace4103.webp",
        "keeper": "ace4102.webp",
        "reason": "Exact tripod duplicate of white tipper dump truck tipping its bed. 4102 has clean composition."
    },
    {
        "duplicate": "ace4108.webp",
        "keeper": "ace4109.webp",
        "reason": "Jaw crusher and inclined feed conveyor. 4108 is a tight vertical crop; 4109 is the proper full landscape photograph."
    },
    {
        "duplicate": "ace4120.webp",
        "keeper": "ace4121.webp",
        "reason": "Staff group portrait at the plant. 4120 is an awkward portrait crop that cuts off feet and side workers; 4121 is the complete landscape team photo."
    },
    {
        "duplicate": "ace4134.webp",
        "keeper": "ace4133.webp",
        "reason": "Exact burst duplicate of two site engineers in PPE on the elevated walkway. 4133 is the superior pose and expression."
    }
]

print(f"Identified {len(duplicate_analysis)} duplicate images to remove.")
dup_set = {d["duplicate"] for d in duplicate_analysis}

remaining = [e for e in entries if e not in dup_set]
print(f"Original count: {len(entries)}")
print(f"Duplicates to remove: {len(dup_set)}")
print(f"Remaining unique photos: {len(remaining)}")

for item in duplicate_analysis:
    print(f"  REMOVE: {item['duplicate']:20s} -> KEEP: {item['keeper']:20s} ({item['reason']})")
