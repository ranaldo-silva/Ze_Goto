import type { NextConfig } from "next";
 
const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true, // ⚠️ ignora erros de TS — use com cautela
  },
};
 
export default nextConfig;