import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "garlickygrill.com" },
      {hostname: "img.cdn4dd.com"},
      {hostname: "plus.unsplash.com"},
      {hostname:"res.cloudinary.com"}
    ],
  },
  reactCompiler: true,
 };

export default nextConfig;