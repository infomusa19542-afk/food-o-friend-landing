import { AppConfig } from "@/constants/app_config";
import type { StorageAsset } from "@/types";
import { supabase } from "@/lib/supabase";

const { storage } = AppConfig;

const publicUrl = (bucket: string, path: string): string =>
  supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;

/** Public URL for a file in the site assets bucket. Pure string building — no network call. */
export const getAssetUrl = (asset: StorageAsset | string): string =>
  publicUrl(storage.bucket, typeof asset === "string" ? asset : asset.path);

/** Public URL for an /idea app screenshot (paths may contain spaces; they are encoded). */
export const getIdeaImageUrl = (path: string): string => publicUrl(storage.ideaBucket, path);

const ideaBucketPrefix = publicUrl(storage.ideaBucket, "");

/** True only for URLs inside this project's idea bucket (the only ones next/image allows). */
export const isIdeaImageUrl = (url: string): boolean => url.startsWith(ideaBucketPrefix) && url.length > ideaBucketPrefix.length;
