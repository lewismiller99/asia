#!/usr/bin/env node
/*
 * Media build for Brand It China.
 *
 * Reads the master photographs in media-source/photos, applies the house
 * colour grade, and writes web-ready JPEGs to public/images in the sizes
 * the site needs. Also produces the hero film posters.
 *
 * Requires ImageMagick (`convert`) on the PATH. Run with: npm run media:build
 *
 * To replace a photograph: drop the new master into media-source/photos with
 * the same file name (or add a new entry below) and run the script again.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const src = resolve(root, "media-source/photos");
const out = resolve(root, "public/images");
mkdirSync(out, { recursive: true });

/** House grades: restrained saturation, lifted blacks, warm neutral shadows. */
const grades = {
  // Night cities and harbour: keep the warmth, pull the saturation back.
  night: ["-modulate", "96,78,100", "-level", "2%,100%,0.95", "-brightness-contrast", "-4x10"],
  // Daylight architecture: cool, cinematic, slightly underexposed.
  city: ["-modulate", "98,66,100", "-fill", "#141418", "-colorize", "5%", "-level", "3%,100%,0.96", "-brightness-contrast", "-3x14"],
  // Interiors: desaturated with warm shadows.
  interior: ["-modulate", "104,55,100", "-fill", "#2b2420", "-colorize", "6%", "-level", "3%,100%,1.05", "-brightness-contrast", "2x14"],
  // Industrial: heavy desaturation with a warm overlay so machinery reads neutral.
  industrial: [
    "-modulate", "100,30,100",
    "(", "+clone", "-fill", "#8c7a66", "-colorize", "100", ")", "-compose", "Overlay", "-composite",
    "-level", "5%,100%,0.88", "-brightness-contrast", "-10x12",
  ],
  // Portraits are left untouched apart from resizing.
  none: [],
};

/**
 * name:     output base name
 * source:   file in media-source/photos
 * grade:    one of the recipes above
 * widths:   output widths (the first is the "full" size used by next/image)
 * crops:    optional named crops as [aspectW, aspectH, gravity]
 */
const photos = [
  { name: "arrival", source: "suvarnabhumi-airport.jpg", grade: "interior", crops: { portrait: [4, 5, "Center"] } },
  { name: "shanghai", source: "shanghai-skyline.jpg", grade: "city", crops: { portrait: [4, 5, "East"] } },
  { name: "shanghai-tower", source: "shanghai-tower.jpg", grade: "city" },
  { name: "harbour-night", source: "hongkong-harbour.jpg", grade: "night", crops: { portrait: [4, 5, "Center"] } },
  { name: "harbour-day", source: "hongkong-skyline.jpg", grade: "city" },
  { name: "city-night", source: "bangkok-hero.jpg", grade: "night" },
  { name: "production-line", source: "technology-factory.jpg", grade: "industrial", crops: { portrait: [4, 5, "West"], square: [1, 1, "West"] } },
  { name: "founder", source: "founder.jpg", grade: "none", width: 1200 },
];

function convert(args) {
  execFileSync("convert", args, { stdio: "inherit" });
}

for (const photo of photos) {
  const input = resolve(src, photo.source);
  if (!existsSync(input)) {
    console.warn(`skip ${photo.name}: ${photo.source} not found`);
    continue;
  }
  const width = photo.width ?? 2000;
  const base = ["-auto-orient", "-strip", ...grades[photo.grade], "-resize", `${width}x>`];
  const encode = ["-sampling-factor", "4:2:0", "-interlace", "JPEG", "-quality", "80"];

  convert([input, ...base, ...encode, resolve(out, `${photo.name}.jpg`)]);
  console.log(`wrote ${photo.name}.jpg`);

  for (const [cropName, [aw, ah, gravity]] of Object.entries(photo.crops ?? {})) {
    convert([
      input,
      ...base,
      "-gravity", gravity,
      "-crop", `${aw}:${ah}`,
      "+repage",
      ...encode,
      resolve(out, `${photo.name}-${cropName}.jpg`),
    ]);
    console.log(`wrote ${photo.name}-${cropName}.jpg`);
  }
}

console.log("done");
