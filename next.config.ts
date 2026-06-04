import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No rewrites needed — the Route Handler at
  // src/app/api/backend/[...path]/route.ts handles all /api/backend/* requests.
  // Having both a rewrite AND a route handler for the same path causes conflicts.
};

export default nextConfig;
