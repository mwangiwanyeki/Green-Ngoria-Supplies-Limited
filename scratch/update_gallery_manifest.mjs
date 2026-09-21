import fs from 'fs';
import path from 'path';

const duplicatesToRemove = new Set([
  'greenngoria-05.webp',
  'greenngoria-06.webp',
  'greenngoria-07.webp',
  'greenngoria-11.webp',
  'greenngoria-13.webp',
  'greenngoria-16.webp',
  'dji-0315.webp',
  'dji-0316.webp',
  'dji-0317.webp',
  'dji-0319.webp',
  'dji-0326.webp',
  'dji-0327.webp',
  'dji-0329.webp',
  'dji-0333.webp',
  'dji-0338.webp',
  'ace4074.webp',
  'ace4076.webp',
  'ace4095.webp',
  'ace4103.webp',
  'ace4109.webp',
  'ace4134.webp'
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

const filteredImages = originalImages.filter(img => {
  const filename = path.basename(img.src);
  return !duplicatesToRemove.has(filename);
});

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
