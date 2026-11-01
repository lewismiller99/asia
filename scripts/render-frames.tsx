/*
 * Renders static HTML frames for the hero film and the social templates
 * from the same React components the website uses, then screenshots them
 * with Playwright. Run through tsx: `npx tsx scripts/render-frames.tsx`.
 *
 * Output: media-source/frames/*.png (film frames) and brand/social/*.png.
 */
import { renderToStaticMarkup } from "react-dom/server";
import { chromium } from "playwright";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import React from "react";
import { Logo, Seal, Wordmark } from "../src/components/brand/logo";
import { AmpouleSet, CreamJar, RetailBox, SerumDropper, SupplementJar, PumpBottle } from "../src/components/products/renders";

const root = resolve(import.meta.dirname, "..");
const fonts = resolve(root, "brand/fonts");

const css = `
@font-face { font-family: "Archivo"; font-weight: 800; src: url("file://${fonts}/archivo-800.woff") format("woff"); }
@font-face { font-family: "Archivo"; font-weight: 500; src: url("file://${fonts}/archivo-500.woff") format("woff"); }
@font-face { font-family: "Archivo"; font-weight: 300; src: url("file://${fonts}/archivo-300.woff") format("woff"); }
@font-face { font-family: "ArchivoExp"; font-weight: 500; src: url("file://${fonts}/archivo-500-exp.woff") format("woff"); }
@font-face { font-family: "ArchivoSemi"; font-weight: 600; src: url("file://${fonts}/archivo-600-semiexp.woff") format("woff"); }
@font-face { font-family: "Instrument"; font-style: italic; src: url("file://${fonts}/iserif-italic.woff") format("woff"); }
* { box-sizing: border-box; margin: 0; }
html, body { width: 100%; height: 100%; background: #0a0a0a; color: #fff; font-family: "Archivo", sans-serif; -webkit-font-smoothing: antialiased; }
svg { display: block; }
.frame { position: relative; width: 100%; height: 100%; overflow: hidden; }
.display { font-family: "ArchivoSemi", "Archivo", sans-serif; font-weight: 600; text-transform: uppercase; letter-spacing: -0.02em; line-height: 0.92; }
.eyebrow { font-family: "ArchivoExp", "Archivo", sans-serif; font-weight: 500; font-size: 20px; letter-spacing: 0.3em; text-transform: uppercase; }
.serif { font-family: "Instrument", serif; font-style: italic; }
.grain { position:absolute; inset:0; opacity:.06; mix-blend-mode: overlay; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
`;

type Frame = { name: string; width: number; height: number; body: React.ReactElement; out: string };

const darkStage = (vertical: boolean): React.CSSProperties => ({
  position: "absolute",
  inset: 0,
  background: vertical
    ? "radial-gradient(90% 55% at 50% 42%, #2a2a2a 0%, #0a0a0a 70%)"
    : "radial-gradient(60% 90% at 50% 45%, #2a2a2a 0%, #0a0a0a 70%)",
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
  // Scene 5: close views of glass and packaging, a tight studio composition.
  return (
    <div className="frame">
      <div style={darkStage(vertical)} />
      <div style={floor(vertical ? "62%" : "70%")} />
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: vertical ? "16%" : "6%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "flex-end",
          gap: vertical ? 0 : 10,
          width: vertical ? "118%" : "100%",
          justifyContent: "center",
        }}
      >
        <AmpouleSet className="" />
        <SerumDropper className="" />
        <CreamJar className="" />
      </div>
      <style>{`.frame svg { width: ${vertical ? 38 : 34}%; height: auto; }`}</style>
      <div className="grain" />
    </div>
  );
}

function FinishedBrand({ vertical }: { vertical: boolean }) {
  // Scene 6: the product reveal with the approved mark.
  return (
    <div className="frame">
      <div style={darkStage(vertical)} />
      <div style={floor(vertical ? "60%" : "68%")} />
      <div
        style={{
          position: "absolute",
          left: vertical ? "50%" : "58%",
          bottom: vertical ? "24%" : "4%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "flex-end",
          gap: 0,
          width: vertical ? "110%" : "64%",
          justifyContent: "center",
        }}
      >
        <RetailBox className="" />
        <SerumDropper className="" />
      </div>
      <style>{`.frame > div > svg { width: ${vertical ? 50 : 50}%; height: auto; }`}</style>
      <div
        style={{
          position: "absolute",
          left: vertical ? 64 : 110,
          top: vertical ? 160 : undefined,
          bottom: vertical ? undefined : 110,
          width: vertical ? "calc(100% - 128px)" : 520,
          display: "grid",
          gap: vertical ? 40 : 34,
        }}
      >
        <Logo tone="light" className="" />
        <style>{`.frame > div:last-of-type > svg { width: 100%; height: auto; }`}</style>
        <p className="serif" style={{ fontSize: vertical ? 64 : 44, lineHeight: 1.05, color: "rgba(255,255,255,0.92)" }}>
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
    <div className="frame" style={{ display: "grid", placeItems: "center", background: "#0a0a0a" }}>
      <div style={{ display: "grid", justifyItems: "center", gap: vertical ? 56 : 44, width: vertical ? "76%" : "40%" }}>
        <Seal size={vertical ? 150 : 120} />
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
    <div className="frame" style={{ background: "#0a0a0a" }}>
      <div style={{ position: "absolute", left: 72, right: 72, top: vertical ? 140 : 90 }}>
        <Logo tone="light" className="" />
        <style>{`.frame svg[aria-label="Brand It China"] { width: ${vertical ? "72%" : "30%"}; height: auto; }`}</style>
      </div>
      <div style={{ position: "absolute", left: 72, right: 72, bottom: vertical ? 160 : 90 }}>
        <p className="eyebrow" style={{ color: "#c8102e", marginBottom: 28 }}>From China</p>
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
        <div style={{ width: 6, height: 150, background: "#c8102e" }} />
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
      <div style={{ background: "#0a0a0a", padding: "28px 44px", display: "grid", gap: 14, maxWidth: "84%" }}>
        <p className="eyebrow" style={{ color: "#c8102e", fontSize: 18 }}>Factory visit, Guangdong</p>
        <p className="display" style={{ fontSize: 72, color: "#fff" }}>What a private label serum actually costs</p>
      </div>
    </div>
  );
}

function ProfileImage() {
  return (
    <div className="frame" style={{ background: "#0a0a0a", display: "grid", placeItems: "center" }}>
      <Seal size={640} />
    </div>
  );
}

function ProfileImageWordmark() {
  return (
    <div className="frame" style={{ background: "#0a0a0a", display: "grid", placeItems: "center" }}>
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
        <p className="eyebrow" style={{ color: "#c8102e", fontSize: 24 }}>{kicker}</p>
        <p className="display" style={{ fontSize: 116, color: "#fff" }}>{title}</p>
      </div>
      <div className="grain" />
    </div>
  );
}

function ProductShowcaseTemplate() {
  // 4:5 Instagram product showcase.
  return (
    <div className="frame">
      <div style={darkStage(true)} />
      <div style={{ position: "absolute", left: "50%", bottom: "18%", transform: "translateX(-50%)", width: "70%", display: "flex", justifyContent: "center", gap: 10, alignItems: "flex-end" }}>
        <SupplementJar className="" />
        <PumpBottle className="" />
      </div>
      <style>{`.frame > div > svg { width: 56%; height: auto; }`}</style>
      <div style={{ position: "absolute", left: 64, right: 64, top: 72, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Wordmark tone="light" className="" />
        <style>{`.frame svg[aria-label="Brand It China"] { height: 60px; width: auto; }`}</style>
        <p className="eyebrow" style={{ color: "rgba(255,255,255,0.6)", fontSize: 18 }}>Illustrative concept</p>
      </div>
      <div style={{ position: "absolute", left: 64, right: 64, bottom: 72, display: "grid", gap: 18 }}>
        <p className="display" style={{ fontSize: 84, color: "#fff" }}>Private label supplements</p>
        <p className="serif" style={{ fontSize: 40, color: "rgba(255,255,255,0.8)" }}>Developed and filled at source.</p>
      </div>
      <div className="grain" />
    </div>
  );
}

function FounderTemplate() {
  // 4:5 founder post template with a portrait slot.
  const portrait = dataUri(resolve(root, "public/images/founder.jpg"));
  return (
    <div className="frame" style={{ background: "#f3f0ea" }}>
      <img src={portrait} alt="" style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "72%", objectFit: "cover", objectPosition: "top" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "30%", background: "#f3f0ea", padding: "56px 64px", display: "grid", gap: 20, alignContent: "start" }}>
        <p className="eyebrow" style={{ color: "#c8102e", fontSize: 18 }}>Your man on the ground in Asia</p>
        <p className="display" style={{ fontSize: 72, color: "#0a0a0a" }}>Lewis Miller, Founder</p>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 8 }}>
          <Logo tone="dark" className="" />
          <style>{`.frame svg[aria-label="Brand It China"] { height: 64px; width: auto; }`}</style>
        </div>
      </div>
    </div>
  );
}

const framesDir = resolve(root, "media-source/frames");
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

async function main() {
  const browser = await chromium.launch();
  for (const frame of frames) {
    const page = await browser.newPage({ viewport: { width: frame.width, height: frame.height }, deviceScaleFactor: 1 });
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}${transparent.has(frame.name) ? "html,body{background:transparent}" : ""}</style></head><body>${renderToStaticMarkup(frame.body)}</body></html>`;
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    const path = resolve(frame.out, `${frame.name}.png`);
    await page.screenshot({ path, omitBackground: transparent.has(frame.name) });
    console.log("wrote", path);
    await page.close();
  }
  await browser.close();

  // Static SVG logo exports for designers and video editors.
  const logoDir = resolve(root, "brand/logo");
  mkdirSync(logoDir, { recursive: true });
  const svg = (el: React.ReactElement) =>
    `<?xml version="1.0" encoding="UTF-8"?>\n` + renderToStaticMarkup(el).replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  writeFileSync(resolve(logoDir, "branditchina-logo-black.svg"), svg(<Logo tone="dark" />));
  writeFileSync(resolve(logoDir, "branditchina-logo-white.svg"), svg(<Logo tone="light" />));
  writeFileSync(resolve(logoDir, "branditchina-wordmark-black.svg"), svg(<Wordmark tone="dark" />));
  writeFileSync(resolve(logoDir, "branditchina-wordmark-white.svg"), svg(<Wordmark tone="light" />));
  writeFileSync(resolve(logoDir, "branditchina-seal.svg"), svg(<Seal size={400} />));
  // The seal colour token must be literal in standalone files.
  for (const f of ["branditchina-logo-black.svg", "branditchina-logo-white.svg", "branditchina-seal.svg"]) {
    const p = resolve(logoDir, f);
    writeFileSync(p, readFileSync(p, "utf8").replaceAll("var(--color-seal, #C8102E)", "#C8102E"));
  }
  console.log("wrote logo SVGs");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
