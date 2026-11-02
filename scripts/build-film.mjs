#!/usr/bin/env node
/*
 * Assembles the hero film from graded stills and rendered frames.
 *
 * Sequence (brief, section 6). The arrival scene (an aircraft descending
 * towards a Chinese airport) is reserved for real or generated footage;
 * see docs/hero-film.md. Until then the film opens on international trade.
 *   1 International    "harbour-night"
 *   2 China            "shanghai"
 *   3 Manufacturing    "production-line"
 *   4 Product creation media-source/frames/scene5-product-*.png
 *   5 Finished brand   media-source/frames/scene6-brand-*.png
 *
 * Each scene gets a slow, physically plausible camera move (push in, drift,
 * pull back), scenes dissolve into each other, and the film fades through
 * black so the loop point is invisible. Two edits are produced: 16:9 for
 * desktop and 9:16 for phones, plus poster frames for both.
 *
 * Requires ffmpeg with libx264. Run: node scripts/build-film.mjs
 * To replace a scene, change the `src` paths below (any JPEG/PNG works).
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const images = resolve(root, "public/images");
const frames = resolve(root, "media-source/frames");
const out = resolve(root, "public/video");
const tmp = resolve(root, "media-source/.film-tmp");
mkdirSync(out, { recursive: true });
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });

const FPS = 30;
const SCENE_SECONDS = 4.6;
const XFADE_SECONDS = 1.1;
const FRAMES = Math.round(SCENE_SECONDS * FPS);

// Camera moves, expressed for ffmpeg's zoompan filter over `d` frames.
// `on` is the frame index. Working on a 2x oversampled source keeps the
// move smooth and free of the jitter zoompan shows on small inputs.
const moves = {
  pushIn: { z: `1+0.09*on/${FRAMES}`, x: "iw/2-(iw/zoom/2)", y: "ih/2-(ih/zoom/2)" },
  pullBack: { z: `1.11-0.09*on/${FRAMES}`, x: "iw/2-(iw/zoom/2)", y: "ih/2-(ih/zoom/2)" },
  driftRight: { z: "1.08", x: `(iw-iw/zoom)*(0.3+0.4*on/${FRAMES})`, y: "ih/2-(ih/zoom/2)" },
  driftUp: { z: "1.08", x: "iw/2-(iw/zoom/2)", y: `(ih-ih/zoom)*(0.7-0.4*on/${FRAMES})` },
};

const edits = {
  desktop: {
    size: [1920, 1080],
    scenes: [
      { src: `${images}/harbour-night.jpg`, move: "pullBack" },
      { src: `${images}/shanghai.jpg`, move: "driftRight" },
      { src: `${images}/production-line.jpg`, move: "pushIn" },
      { src: `${frames}/scene5-product-desktop.png`, move: "driftRight" },
      { src: `${frames}/scene6-brand-desktop.png`, move: "pushIn" },
    ],
  },
  mobile: {
    size: [1080, 1920],
    scenes: [
      { src: `${images}/harbour-night-portrait.jpg`, move: "pullBack" },
      { src: `${images}/shanghai-portrait.jpg`, move: "driftUp" },
      { src: `${images}/production-line-portrait.jpg`, move: "pushIn" },
      { src: `${frames}/scene5-product-mobile.png`, move: "driftUp" },
      { src: `${frames}/scene6-brand-mobile.png`, move: "pushIn" },
    ],
  },
};

function ff(args) {
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
}

for (const [name, edit] of Object.entries(edits)) {
  const [w, h] = edit.size;
  const clips = [];

  edit.scenes.forEach((scene, i) => {
    const m = moves[scene.move];
    const clip = `${tmp}/${name}-${i}.mp4`;
    // Oversample to 2x output size, cover-crop to the aspect ratio, then
    // run the camera move and apply a gentle film grade: lifted blacks,
    // slight desaturation, soft vignette.
    const vf = [
      `scale=${w * 2}:${h * 2}:force_original_aspect_ratio=increase`,
      `crop=${w * 2}:${h * 2}`,
      `zoompan=z='${m.z}':x='${m.x}':y='${m.y}':d=${FRAMES}:s=${w}x${h}:fps=${FPS}`,
      "eq=contrast=1.08:brightness=0.02:saturation=0.98",
      "vignette=angle=PI/6",
      "format=yuv420p",
    ].join(",");
    ff(["-loop", "1", "-i", scene.src, "-vf", vf, "-t", String(SCENE_SECONDS), "-c:v", "libx264", "-preset", "fast", "-crf", "16", clip]);
    clips.push(clip);
  });

  // Chain crossfades. Offsets accumulate: each scene starts XFADE seconds
  // before the previous one ends.
  const inputs = clips.flatMap((c) => ["-i", c]);
  const filters = [];
  let last = "[0:v]";
  let offset = 0;
  for (let i = 1; i < clips.length; i++) {
    offset += SCENE_SECONDS - XFADE_SECONDS;
    const label = i === clips.length - 1 ? "[xf]" : `[v${i}]`;
    filters.push(`${last}[${i}:v]xfade=transition=fade:duration=${XFADE_SECONDS}:offset=${offset.toFixed(3)}${label}`);
    last = label;
  }
  const total = offset + SCENE_SECONDS;
  // Fade from and to black so the loop is seamless.
  filters.push(`[xf]fade=t=in:st=0:d=0.8,fade=t=out:st=${(total - 0.9).toFixed(3)}:d=0.9[v]`);

  const output = `${out}/hero-${name}.mp4`;
  ff([
    ...inputs,
    "-filter_complex", filters.join(";"),
    "-map", "[v]",
    "-an",
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", name === "desktop" ? "28" : "30",
    "-profile:v", "high",
    "-level", "4.1",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    output,
  ]);
  console.log(`wrote ${output} (${total.toFixed(1)}s)`);

  // Poster: the opening frame a second in, matching what the film opens on.
  const poster = `${out}/hero-poster${name === "mobile" ? "-mobile" : ""}.jpg`;
  ff(["-ss", "1.2", "-i", output, "-frames:v", "1", "-q:v", "4", poster]);
  console.log(`wrote ${poster}`);
}

rmSync(tmp, { recursive: true, force: true });
console.log("done");
