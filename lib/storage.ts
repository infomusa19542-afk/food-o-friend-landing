import { AppConfig } from "@/constants/app_config";
import type { StorageAsset } from "@/types";
import { supabase } from "@/lib/supabase";

const bucket = supabase.storage.from(AppConfig.storage.bucket);

/** Public URL for a file in the site assets bucket. Pure string building — no network call. */
export const getAssetUrl = (asset: StorageAsset | string): string => {
  const path = typeof asset === "string" ? asset : asset.path;
  return bucket.getPublicUrl(path).data.publicUrl;
};
