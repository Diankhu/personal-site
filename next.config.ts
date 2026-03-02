import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ needed for the Docker "standalone" runtime
  output: "standalone",

  turbopack: {
    root: __dirname,
  },

  images: {
    qualities: [75, 95],
  },
};

export default nextConfig;
