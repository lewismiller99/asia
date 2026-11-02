import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Every quality the components ask for: hero posters, studio scenes,
    // photography and the founder portrait.
    qualities: [58, 62, 70, 72, 75, 76, 78, 80],
  },
};

export default nextConfig;
