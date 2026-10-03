import type { NextConfig } from "next";
import { AppConfig } from "./constants/app_config";

const supabaseHost = AppConfig.supabase.url ? new URL(AppConfig.supabase.url).hostname : undefined;

/** Baseline security headers. (A strict CSP needs nonces for Next's inline scripts — see PRODUCTION_CHECKLIST.md.) */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Pin the workspace root to this project (a stray lockfile exists in a parent folder).
  outputFileTracingRoot: process.cwd(),
  turbopack: { root: process.cwd() },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  images: {
    remotePatterns: supabaseHost
      ? [
          {
            protocol: "https",
            hostname: supabaseHost,
            pathname: `/storage/v1/object/public/${AppConfig.storage.bucket}/**`,
          },
        ]
      : [],
  },
};

export default nextConfig;
