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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        <svg viewBox="0 0 100 100" width="120" height="120">
          <rect width="100" height="100" rx="8" fill="#C8102E" />
          <path d="M30,16 H70 V38 H30 Z M50,6 V50" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="square" />
          <path
            d="M20,56 H80 V94 H20 Z M34,65 H66 M34,75 H66 M34,85 H66 M50,65 V85 M66,80 l3,3"
            fill="none"
            stroke="#fff"
            strokeWidth="7"
            strokeLinecap="square"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
