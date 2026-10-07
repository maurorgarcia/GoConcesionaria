import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite compilar para verificar en otra carpeta sin pisar el .next de `npm run dev`
  distDir: process.env.NEXT_DIST_DIR || ".next",
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
