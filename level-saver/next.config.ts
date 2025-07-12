import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    '*': ['.next/cache/**/*']
  }
};

export default nextConfig;
