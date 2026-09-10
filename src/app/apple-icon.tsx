import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        <div style={{ fontSize: 68 }}>M&amp;P</div>
        <div style={{ fontSize: 18, letterSpacing: 6, color: "#9c8259", marginTop: 6 }}>
          ASIA
        </div>
      </div>
    ),
    { ...size }
  );
}
