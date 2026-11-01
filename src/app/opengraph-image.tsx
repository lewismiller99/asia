import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { logoArtElements, LOGO_ASPECT, LOGO_VIEWBOX } from "@/components/brand/logo";
import { siteConfig } from "@/lib/site-config";

export const alt = "Brand It China. Your Brand. Built at Source.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoWidth = 520;
  // Archivo semi expanded, the site's headline face, so the share image
  // matches the page. Read from the repo's brand fonts at build time.
  const archivo = await readFile(join(process.cwd(), "brand/fonts/archivo-600-semiexp.woff"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "Archivo",
        }}
      >
        <svg viewBox={LOGO_VIEWBOX} width={logoWidth} height={Math.round(logoWidth / LOGO_ASPECT)}>
          {logoArtElements({ ink: "#ffffff" })}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 600, lineHeight: 0.92, letterSpacing: -2, textTransform: "uppercase" }}>
            Your brand.
          </div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 600, lineHeight: 0.92, letterSpacing: -2, textTransform: "uppercase" }}>
            Built at source.
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#b8b4ae" }}>
            {siteConfig.positioning}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: archivo, weight: 600, style: "normal" }] }
  );
}
