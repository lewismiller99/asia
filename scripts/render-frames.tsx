/*
 * Renders static HTML frames for the hero film and the social templates
 * from the same React components the website uses, then screenshots them
 * with Playwright. Run through tsx: `npx tsx scripts/render-frames.tsx`.
 *
 * Output: media-source/frames/*.png (film frames) and brand/social/*.png.
 */
import { renderToStaticMarkup } from "react-dom/server";
import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import React from "react";
import { Logo, Seal, Wordmark } from "../src/components/brand/logo";
import { scenes } from "../src/components/products/scenes";

const root = resolve(import.meta.dirname, "..");
const fonts = resolve(root, "src/fonts");
const fontData = (file: string) => `data:font/ttf;base64,${readFileSync(resolve(fonts, file)).toString("base64")}`;

const css = `
@font-face { font-family: "Jakarta"; font-weight: 200 800; src: url("${fontData("PlusJakartaSans.ttf")}") format("truetype"); }
@font-face { font-family: "Inter"; font-weight: 100 900; src: url("${fontData("Inter.ttf")}") format("truetype"); }
* { box-sizing: border-box; margin: 0; }
html, body { width: 100%; height: 100%; background: #202020; color: #fff; font-family: "Inter", sans-serif; -webkit-font-smoothing: antialiased; }
svg { display: block; }
.frame { position: relative; width: 100%; height: 100%; overflow: hidden; }
.display { font-family: "Jakarta", sans-serif; font-weight: 800; letter-spacing: -0.03em; line-height: 0.96; }
.eyebrow { font-family: "Inter", sans-serif; font-weight: 600; font-size: 20px; letter-spacing: 0.3em; text-transform: uppercase; }
.serif { font-family: "Jakarta", sans-serif; font-weight: 800; letter-spacing: -0.02em; }
.grain { position:absolute; inset:0; opacity:.06; mix-blend-mode: overlay; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
`;

type Frame = { name: string; width: number; height: number; body: React.ReactElement; out: string };

const darkStage = (vertical: boolean): React.CSSProperties => ({
  position: "absolute",
  inset: 0,
  background: vertical
    ? "radial-gradient(90% 55% at 50% 42%, #2a2a2a 0%, #202020 70%)"
    : "radial-gradient(60% 90% at 50% 45%, #2a2a2a 0%, #202020 70%)",
});

const floor = (y: string): React.CSSProperties => ({
  position: "absolute",
  left: "-20%",
  right: "-20%",
  top: y,
  bottom: 0,
  background: "radial-gradient(50% 60% at 50% 0%, rgba(255,255,255,0.07) 0%, rgba(0,0,0,0) 70%)",
});

/** Inline a local image as a data URI so Playwright can render it from setContent. */
const dataUri = (path: string) => `data:image/jpeg;base64,${readFileSync(path).toString("base64")}`;

function ProductCreation({ vertical }: { vertical: boolean }) {
  const Art = vertical ? scenes.skincare : scenes.creation;
  return (
    <div className="frame">
      <Art className="" />
      <style>{`.frame > svg { position: absolute; inset: 0; width: 100%; height: 100%; }`}</style>
    </div>
  );
}

function FinishedBrand({ vertical }: { vertical: boolean }) {
  const Art = vertical ? scenes.custom : scenes.reveal;
  return (
    <div className="frame">
      <Art className="" />
      <style>{`.frame > svg { position: absolute; inset: 0; width: 100%; height: 100%; }`}</style>
      <div style={{ position: "absolute", inset: 0, background: vertical ? "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 45%)" : "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 55%)" }} />
      <div
        style={{
          position: "absolute",
          left: vertical ? 64 : 110,
          top: vertical ? 150 : undefined,
          bottom: vertical ? undefined : 110,
          width: vertical ? "calc(100% - 128px)" : 560,
          display: "grid",
          gap: vertical ? 36 : 30,
        }}
      >
        <div style={{ width: vertical ? "72%" : "70%" }}>
          <Logo tone="light" className="" />
        </div>
        <style>{`.frame svg[aria-label="Brand It China"] { width: 100%; height: auto; }`}</style>
        <p className="serif" style={{ fontSize: vertical ? 60 : 44, lineHeight: 1.02, color: "#fff" }}>
          Your brand. Built at source.
        </p>
      </div>
      <div className="grain" />
    </div>
  );
}

function ClosingFrame({ vertical }: { vertical: boolean }) {
  // Video closing graphic: seal, wordmark, domain.
  return (
    <div className="frame" style={{ display: "grid", placeItems: "center", background: "#202020" }}>
      <div style={{ display: "grid", justifyItems: "center", gap: vertical ? 56 : 44, width: vertical ? "80%" : "44%" }}>
        <Seal size={vertical ? 170 : 130} />
        <Logo tone="light" className="" />
        <style>{`.frame svg[aria-label="Brand It China"] { width: 100%; height: auto; }`}</style>
        <p className="eyebrow" style={{ color: "rgba(255,255,255,0.6)", fontSize: vertical ? 26 : 20 }}>branditchina.com</p>
      </div>
      <div className="grain" />
    </div>
  );
}

function OpeningFrame({ vertical }: { vertical: boolean }) {
  return (
    <div className="frame" style={{ background: "#202020" }}>
      <div style={{ position: "absolute", left: 72, right: 72, top: vertical ? 140 : 90 }}>
        <Logo tone="light" className="" />
        <style>{`.frame svg[aria-label="Brand It China"] { width: ${vertical ? "78%" : "34%"}; height: auto; }`}</style>
      </div>
      <div style={{ position: "absolute", left: 72, right: 72, bottom: vertical ? 160 : 90 }}>
        <p className="eyebrow" style={{ color: "#E63329", marginBottom: 28 }}>From China</p>
        <p className="display" style={{ fontSize: vertical ? 132 : 150, color: "#fff" }}>
          Your brand.
          <br />
          Built at source.
        </p>
      </div>
      <div className="grain" />
    </div>
  );
}

function LowerThird() {
  return (
    <div className="frame" style={{ background: "transparent" }}>
      <div style={{ position: "absolute", left: 80, bottom: 120, display: "flex", alignItems: "center", gap: 28 }}>
        <div style={{ width: 6, height: 150, background: "#E63329" }} />
        <div style={{ display: "grid", gap: 10 }}>
          <p className="display" style={{ fontSize: 64, color: "#fff" }}>Lewis Miller</p>
          <p className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>Founder, Brand It China</p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10 }}>
            <Wordmark tone="light" className="" />
            <style>{`.frame svg[aria-label="Brand It China"] { height: 72px; width: auto; }`}</style>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaptionCard() {
  return (
    <div className="frame" style={{ background: "transparent", display: "grid", placeItems: "center" }}>
      <div style={{ background: "#202020", padding: "28px 44px", display: "grid", gap: 14, maxWidth: "84%" }}>
        <p className="eyebrow" style={{ color: "#E63329", fontSize: 18 }}>Factory visit, Guangdong</p>
        <p className="display" style={{ fontSize: 72, color: "#fff" }}>What a private label serum actually costs</p>
      </div>
    </div>
  );
}

function ProfileImage() {
  return (
    <div className="frame" style={{ background: "#202020", display: "grid", placeItems: "center" }}>
      <Seal size={640} />
    </div>
  );
}

function ProfileImageWordmark() {
  return (
    <div className="frame" style={{ background: "#202020", display: "grid", placeItems: "center" }}>
      <Wordmark tone="light" className="" />
      <style>{`.frame svg { width: 70%; height: auto; }`}</style>
    </div>
  );
}

function CoverPortrait({ title, kicker, image }: { title: string; kicker: string; image: string }) {
  // 9:16 video cover with an image slot behind.
  return (
    <div className="frame">
      <img src={image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.15) 40%, rgba(10,10,10,0.92) 100%)" }} />
      <div style={{ position: "absolute", left: 72, right: 72, top: 110 }}>
        <Logo tone="light" className="" />
        <style>{`.frame svg[aria-label="Brand It China"] { width: 54%; height: auto; }`}</style>
      </div>
      <div style={{ position: "absolute", left: 72, right: 72, bottom: 150, display: "grid", gap: 30 }}>
        <p className="eyebrow" style={{ color: "#E63329", fontSize: 24 }}>{kicker}</p>
        <p className="display" style={{ fontSize: 116, color: "#fff" }}>{title}</p>
      </div>
      <div className="grain" />
    </div>
  );
}

function ProductShowcaseTemplate() {
  // 4:5 Instagram product showcase on a studio scene.
  const Art = scenes.supplements;
  return (
    <div className="frame">
      <Art className="" />
      <style>{`.frame > svg { position: absolute; inset: 0; width: 100%; height: 100%; }`}</style>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.75) 100%)" }} />
      <div style={{ position: "absolute", left: 64, right: 64, top: 72, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ width: 240 }}>
          <Wordmark tone="light" className="" />
        </div>
        <style>{`.frame svg[aria-label="Brand It China"] { width: 100%; height: auto; }`}</style>
        <p className="eyebrow" style={{ color: "rgba(255,255,255,0.7)", fontSize: 18 }}>Illustrative concept</p>
      </div>
      <div style={{ position: "absolute", left: 64, right: 64, bottom: 72, display: "grid", gap: 18 }}>
        <p className="display" style={{ fontSize: 84, color: "#fff" }}>Private label supplements</p>
        <p style={{ fontSize: 30, color: "rgba(255,255,255,0.8)", fontFamily: "Inter, sans-serif" }}>Developed and filled at source.</p>
      </div>
      <div className="grain" />
    </div>
  );
}

function FounderTemplate() {
  // 4:5 founder post template with a portrait slot.
  const portrait = dataUri(resolve(root, "public/images/founder.jpg"));
  return (
    <div className="frame" style={{ background: "#f2f2f2" }}>
      <img src={portrait} alt="" style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "72%", objectFit: "cover", objectPosition: "top" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "30%", background: "#f2f2f2", padding: "56px 64px", display: "grid", gap: 20, alignContent: "start" }}>
        <p className="eyebrow" style={{ color: "#E63329", fontSize: 18 }}>Your man on the ground in Asia</p>
        <p className="display" style={{ fontSize: 72, color: "#202020" }}>Lewis Miller, Founder</p>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 8 }}>
          <Logo tone="dark" className="" />
          <style>{`.frame svg[aria-label="Brand It China"] { height: 64px; width: auto; }`}</style>
        </div>
      </div>
    </div>
  );
}

const framesDir = resolve(root, "media-source/frames");
const scenesDir = resolve(root, "public/images/scenes");
mkdirSync(scenesDir, { recursive: true });

function SceneFrame({ art: Art }: { art: (p: { className?: string }) => React.ReactElement }) {
  return (
    <div className="frame">
      <Art className="" />
      <style>{`.frame > svg { position: absolute; inset: 0; width: 100%; height: 100%; }`}</style>
    </div>
  );
}

const landscapeScenes = new Set(["reveal", "creation", "macro"]);
const lightScenes = ["skincare", "haircare", "supplements", "weight", "accessories", "custom"] as const;
const sceneFrames: Frame[] = [
  ...(Object.keys(scenes) as (keyof typeof scenes)[]).map((key) => ({
    name: `scene-${key}`,
    width: landscapeScenes.has(key) ? 1800 : 1200,
    height: landscapeScenes.has(key) ? 1125 : 1500,
    body: <SceneFrame art={scenes[key]} />,
    out: scenesDir,
  })),
  ...lightScenes.map((key) => {
    const Art = scenes[key];
    const Light = (p: { className?: string }) => <Art {...p} set="light" />;
    return { name: `scene-${key}-light`, width: 1200, height: 1500, body: <SceneFrame art={Light} />, out: scenesDir };
  }),
];
const socialDir = resolve(root, "brand/social");
mkdirSync(framesDir, { recursive: true });
mkdirSync(socialDir, { recursive: true });

const shanghaiPortrait = dataUri(resolve(root, "public/images/shanghai-portrait.jpg"));
const productionPortrait = dataUri(resolve(root, "public/images/production-line-portrait.jpg"));

const frames: Frame[] = [
  { name: "scene5-product-desktop", width: 1920, height: 1080, body: <ProductCreation vertical={false} />, out: framesDir },
  { name: "scene5-product-mobile", width: 1080, height: 1920, body: <ProductCreation vertical />, out: framesDir },
  { name: "scene6-brand-desktop", width: 1920, height: 1080, body: <FinishedBrand vertical={false} />, out: framesDir },
  { name: "scene6-brand-mobile", width: 1080, height: 1920, body: <FinishedBrand vertical />, out: framesDir },
  { name: "closing-16x9", width: 1920, height: 1080, body: <ClosingFrame vertical={false} />, out: socialDir },
  { name: "closing-9x16", width: 1080, height: 1920, body: <ClosingFrame vertical />, out: socialDir },
  { name: "opening-16x9", width: 1920, height: 1080, body: <OpeningFrame vertical={false} />, out: socialDir },
  { name: "opening-9x16", width: 1080, height: 1920, body: <OpeningFrame vertical />, out: socialDir },
  { name: "lower-third-16x9", width: 1920, height: 1080, body: <LowerThird />, out: socialDir },
  { name: "caption-card-9x16", width: 1080, height: 1920, body: <CaptionCard />, out: socialDir },
  { name: "profile-seal", width: 1080, height: 1080, body: <ProfileImage />, out: socialDir },
  { name: "profile-wordmark", width: 1080, height: 1080, body: <ProfileImageWordmark />, out: socialDir },
  { name: "video-cover-factory-9x16", width: 1080, height: 1920, body: <CoverPortrait kicker="Factory visit" title="Inside a cosmetics factory in China" image={productionPortrait} />, out: socialDir },
  { name: "video-cover-city-9x16", width: 1080, height: 1920, body: <CoverPortrait kicker="From Shanghai" title="How to start a skincare brand from Asia" image={shanghaiPortrait} />, out: socialDir },
  { name: "product-showcase-4x5", width: 1080, height: 1350, body: <ProductShowcaseTemplate />, out: socialDir },
  { name: "founder-post-4x5", width: 1080, height: 1350, body: <FounderTemplate />, out: socialDir },
];

const transparent = new Set(["lower-third-16x9", "caption-card-9x16"]);
const jpeg = new Set(sceneFrames.map((f) => f.name));

async function main() {
  const browser = await chromium.launch();
  for (const frame of [...frames, ...sceneFrames]) {
    const page = await browser.newPage({ viewport: { width: frame.width, height: frame.height }, deviceScaleFactor: 1 });
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}${transparent.has(frame.name) ? "html,body{background:transparent}" : ""}</style></head><body>${renderToStaticMarkup(frame.body)}</body></html>`;
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    const isJpeg = jpeg.has(frame.name);
    const path = resolve(frame.out, `${frame.name}.${isJpeg ? "jpg" : "png"}`);
    await page.screenshot({ path, omitBackground: transparent.has(frame.name), type: isJpeg ? "jpeg" : "png", quality: isJpeg ? 84 : undefined });
    console.log("wrote", path);
    await page.close();
  }
  await browser.close();

  console.log("logo artwork: use brand/official/SVG (official pack); nothing to export");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
