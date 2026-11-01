import { ImageResponse } from "next/og";
import { sealArtElements, SEAL_RATIO } from "@/components/brand/logo";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// The seal alone is the favicon: 创 inside the red stamp on black.
export default function Icon() {
  const h = 52;
  const w = h * SEAL_RATIO;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
          {sealArtElements({ width: w, height: h })}
        </svg>
      </div>
    ),
    { ...size }
  );
}
