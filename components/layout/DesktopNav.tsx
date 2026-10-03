"use client";

import Link from "next/link";
import { MainNavItems } from "@/constants/app_navigation";
import { AppStrings } from "@/constants/app_strings";
import { useActiveNavHref } from "@/hooks/useActiveNavHref";
import { cn } from "@/utils/classnames";

export default function DesktopNav() {
  const activeHref = useActiveNavHref();

  return (
    <nav aria-label={AppStrings.navigation.mainLabel} className="hidden lg:block">
      <ul className="flex items-center gap-7 xl:gap-10">
        {MainNavItems.map((item) => {
          const isActive = item.href === activeHref;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-11 items-center rounded-md text-[0.95rem] font-medium transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                  isActive
                    ? "text-brand after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-brand"
                    : "text-white",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
