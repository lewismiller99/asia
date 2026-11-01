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
  // Plus Jakarta Sans ExtraBold, the brand heading face. Satori cannot read
  // the supplied variable TTF, so a static ExtraBold instance of the same
  // open licensed font is kept in src/fonts/static for this route only.
  const jakarta = await readFile(join(process.cwd(), "src/fonts/static/PlusJakartaSans-ExtraBold.woff"));
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
          backgroundColor: "#202020",
          color: "#ffffff",
          fontFamily: "Jakarta",
        }}
      >
        <svg viewBox={LOGO_VIEWBOX} width={logoWidth} height={Math.round(logoWidth / LOGO_ASPECT)}>
          {logoArtElements({ ink: "#ffffff" })}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, lineHeight: 0.96, letterSpacing: -3 }}>
            Your brand.
          </div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, lineHeight: 0.96, letterSpacing: -3 }}>
            Built at source.
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#b3b3b3" }}>
            {siteConfig.positioning}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Jakarta", data: jakarta, weight: 800, style: "normal" }] }
  );
}
