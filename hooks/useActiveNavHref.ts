"use client";

import { usePathname } from "next/navigation";
import { ActiveNavHref, MainNavItems } from "@/constants/app_navigation";
import { AppRoutes } from "@/constants/app_routes";

/** "Home" is current on the homepage; standalone pages (e.g. /idea) highlight their own link. */
export const useActiveNavHref = (): string | null => {
  const pathname = usePathname();
  if (pathname === AppRoutes.home) return ActiveNavHref;
  return MainNavItems.find((item) => item.href === pathname)?.href ?? null;
};
