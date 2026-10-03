import type { StorageAsset } from "@/types";

/** Paths inside the public Supabase Storage bucket. Resolve with `getAssetUrl`. */
export const AppAssets = {
  hero: {
    background: { path: "hero/hero-friends-dining.webp", width: 1672, height: 941 },
    handwritten: { path: "decorations/hero-handwritten-text.png", width: 1254, height: 1254 },
  },

  solution: {
    phones: { path: "solution/app-phone-mockups.webp", width: 1254, height: 1254 },
  },

  safety: {
    background: { path: "safety/friends-sunset.webp", width: 1672, height: 941 },
    handwritten: { path: "decorations/safety-handwritten-text.png", width: 1254, height: 1254 },
  },

  decorations: {
    foodPattern: { path: "decorations/orange-food-pattern.png", width: 1254, height: 1254 },
  },

  branding: {
    icon: { path: "branding/chef-hat-logo.png", width: 1254, height: 1254 },
    logo: { path: "branding/food-o-friend-logo.png", width: 2172, height: 724 },
  },

  avatars: [
    { path: "avatars/avatar-01.webp", width: 1254, height: 1254 },
    { path: "avatars/avatar-02.webp", width: 1254, height: 1254 },
    { path: "avatars/avatar-03.webp", width: 1254, height: 1254 },
    { path: "avatars/avatar-04.webp", width: 1254, height: 1254 },
  ],
} as const satisfies Record<string, Record<string, StorageAsset> | readonly StorageAsset[]>;
