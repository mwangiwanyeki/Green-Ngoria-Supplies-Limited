import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const duplicatesToRemove = new Set([
  // Greenngoria series
  'greenngoria-03.webp', // Duplicate viewpoint of greenngoria-06 (03 has blue pipe obstruction in corner)
  'greenngoria-05.webp', // Exact tripod burst duplicate of greenngoria-04 (crushing station)
  'greenngoria-07.webp', // Exact tripod burst duplicate of greenngoria-04 (crushing station)
  'greenngoria-11.webp', // Exact tripod burst duplicate of greenngoria-10 (ball mill circuit)
  'greenngoria-13.webp', // Exact tripod burst duplicate of greenngoria-12 (leaching tanks)
  'greenngoria-16.webp', // Continuous burst duplicate of greenngoria-15 (workers digging)

  // DJI drone aerial series
  'dji-0315.webp', // High-altitude aerial duplicate of dji-0314 (full plant overview)
  'dji-0316.webp', // High-altitude aerial duplicate of dji-0314 (full plant overview)
  'dji-0317.webp', // High-altitude aerial duplicate of dji-0314 (full plant overview)
  'dji-0319.webp', // Aerial duplicate viewpoint of dji-0318 (tailings retention pond)
  'dji-0326.webp', // Drone hover duplicate of dji-0328 (excavator loading dump truck)
  'dji-0327.webp', // Drone hover duplicate of dji-0328 (excavator loading dump truck)
  'dji-0329.webp', // Drone hover duplicate of dji-0328 (excavator loading dump truck)
  'dji-0338.webp', // Vertical top-down plant duplicate of dji-0333 (hero overview)

  // ACE ground photography series
  'ace4048.webp', // Blue blower in shed duplicate of ace4049 (4048 obstructed by pole)
  'ace4074.webp', // Exact tripod burst duplicate of ace4073 (elution cell, 4074 washed out)
  'ace4076.webp', // Duplicate viewpoint of ace4075 (twin vertical slurry pumps)
  'ace4083.webp', // Duplicate close-up of concrete vat rings (ace4088 has full wide context)
  'ace4092.webp', // Redundant close-up bumper shot of water tanker truck (ace4090 is complete vehicle)
  'ace4095.webp', // Continuous shutter burst duplicate of ace4094 (Bobcat loader with operator)
  'ace4103.webp', // Exact tripod burst duplicate of ace4102 (tipper dump truck)
  'ace4108.webp', // Duplicate tight vertical crop of ace4109 (jaw crusher & conveyor)
  'ace4120.webp', // Cropped vertical portrait burst duplicate of ace4121 (complete team photo)
  'ace4134.webp', // Exact shutter burst duplicate of ace4133 (site engineers on walkway)
]);

const manifestPath = 'web/src/config/gallery.ts';
const content = fs.readFileSync(manifestPath, 'utf8');

const match = content.match(/export const galleryImages: GalleryImage\[\] = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Failed to parse galleryImages in gallery.ts');
  process.exit(1);
}

const originalImages = JSON.parse(match[1]);
console.log(`Original gallery image count: ${originalImages.length}`);

const filteredImages = originalImages
  .filter((img) => {
    const filename = path.basename(img.src);
    return !duplicatesToRemove.has(filename);
  })
  .map((img, idx) => ({
    ...img,
    alt: `Green Ngoria Supplies — Photograph ${idx + 1}`,
  }));

console.log(`Filtered gallery image count: ${filteredImages.length}`);
console.log(`Removed: ${originalImages.length - filteredImages.length} duplicate images.`);

const newContent = `/**
 * Gallery manifest — the photographs shown on /gallery.
 * Sourced from https://joseacestudios56.pixieset.com/greenngoria/.
 * Filtered to remove redundant burst shots and identical viewpoints.
 */

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  category?: string;
}

export const galleryImages: GalleryImage[] = ${JSON.stringify(filteredImages, null, 2)};
`;

fs.writeFileSync(manifestPath, newContent, 'utf8');
console.log(`Successfully updated ${manifestPath}`);
