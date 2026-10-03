import type { MetadataRoute } from "next";
import { AppColors } from "@/constants/app_colors";
import { AppRoutes } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: AppStrings.metadata.title,
    short_name: AppStrings.brand.name,
    description: AppStrings.metadata.description,
    start_url: AppRoutes.home,
    display: "browser",
    background_color: AppColors.ink,
    theme_color: AppColors.ink,
    icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
