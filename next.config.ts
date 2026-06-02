import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [60, 75, 85, 95],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
