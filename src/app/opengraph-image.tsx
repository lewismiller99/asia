import { ImageResponse } from "next/og";
import { BRANDIT_PATH, CHINA_PATH } from "@/components/brand/logo-paths";
import { LOGO_VIEWBOX, LOGO_GEOMETRY as G } from "@/components/brand/logo";
import { siteConfig } from "@/lib/site-config";

export const alt = "Brand It China. Your Brand. Built at Source.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const sealScale = G.sealSize / 100;
  const sealX = G.lineEnd - G.sealSize;
  const sealY = -G.sealSize - G.lineThickness * 1.6;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <svg viewBox={LOGO_VIEWBOX} width="640" height={640 / (G.lineEnd / (G.bottom - G.top))}>
          <path d={BRANDIT_PATH} fill="#fff" />
          <g transform={`translate(2 ${G.chinaY}) scale(${G.chinaScale})`}>
            <path d={CHINA_PATH} fill="#fff" />
          </g>
          <rect x={G.lineStart} y={-G.lineThickness} width={G.lineEnd - G.lineStart} height={G.lineThickness} fill="#fff" />
          <g transform={`translate(${sealX} ${sealY}) scale(${sealScale})`}>
            <rect width="100" height="100" rx="8" fill="#C8102E" />
            <path d="M30,16 H70 V38 H30 Z M50,6 V50" fill="none" stroke="#fff" strokeWidth="7" />
            <path d="M20,56 H80 V94 H20 Z M34,65 H66 M34,75 H66 M34,85 H66 M50,65 V85 M66,80 l3,3" fill="none" stroke="#fff" strokeWidth="7" />
          </g>
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3, textTransform: "uppercase" }}>
            Your brand.
          </div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3, textTransform: "uppercase" }}>
            Built at source.
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#b8b4ae" }}>
            {siteConfig.positioning}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
