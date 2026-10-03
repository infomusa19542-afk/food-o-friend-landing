import type { NextConfig } from "next";
import { AppConfig } from "./constants/app_config";

const supabaseHost = AppConfig.supabase.url ? new URL(AppConfig.supabase.url).hostname : undefined;

const nextConfig: NextConfig = {
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
