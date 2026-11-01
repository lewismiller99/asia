import { ImageResponse } from "next/og";
import { sealArtElements, SEAL_RATIO, SEAL_VIEWBOX } from "@/components/brand/logo";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// The standalone seal from the brand pack is the favicon, on charcoal.
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
