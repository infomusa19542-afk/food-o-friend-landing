"use client";

import { usePathname } from "next/navigation";
import { ActiveNavHref } from "@/constants/app_navigation";
import { AppRoutes } from "@/constants/app_routes";

/** Homepage section links are only "current" while on the homepage. */
export const useActiveNavHref = (): string | null =>
  usePathname() === AppRoutes.home ? ActiveNavHref : null;
