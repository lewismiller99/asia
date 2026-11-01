import { ImageResponse } from "next/og";
import { sealArtElements, SEAL_RATIO, SEAL_VIEWBOX } from "@/components/brand/logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const h = 132;
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
          backgroundColor: "#202020",
        }}
      >
        <svg viewBox={SEAL_VIEWBOX} width={w} height={h}>
          {sealArtElements()}
        </svg>
      </div>
    ),
    { ...size }
  );
}
