import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: { optimizePackageImports: ["lucide-react"], useTypeScriptCli: false },
  turbopack: { root: process.cwd() },
};

export default nextConfig;
