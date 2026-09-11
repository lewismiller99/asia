import { ImageResponse } from "next/og";

export const alt = "Miller & Partners Asia | Connecting opportunity across Asia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#14130f",
          color: "#f4efe6",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 64, letterSpacing: 2 }}>
          MILLER &amp; PARTNERS
        </div>
        <div
          style={{
            fontSize: 24,
            letterSpacing: 12,
            color: "#9c8259",
            marginTop: 8,
          }}
        >
          ASIA
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#b9b3a5",
            marginTop: 36,
            letterSpacing: 2,
          }}
        >
          Investment · Advisory · Technology · Property
        </div>
      </div>
    ),
    { ...size }
  );
}
