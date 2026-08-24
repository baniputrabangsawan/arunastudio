import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    cpus: 4,
    optimizePackageImports: ["lucide-react"],
    staticGenerationMaxConcurrency: 4,
    staticGenerationMinPagesPerWorker: 10,
    useTypeScriptCli: false,
  },
  images: { formats: ["image/avif", "image/webp"] },
  turbopack: { root: process.cwd() },
};

export default nextConfig;
