import type { MetadataRoute } from "next";
import { AppRoutes } from "@/constants/app_routes";
import { absoluteUrl } from "@/lib/site";

const PAGES: { path: string; priority: number }[] = [
  { path: AppRoutes.home, priority: 1 },
  { path: AppRoutes.register, priority: 0.7 },
  { path: AppRoutes.restaurantOwner, priority: 0.7 },
  { path: AppRoutes.privacy, priority: 0.3 },
  { path: AppRoutes.terms, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, priority }) => ({ url: absoluteUrl(path), changeFrequency: "monthly", priority }));
}
