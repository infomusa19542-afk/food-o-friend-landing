import Link from "next/link";
import BrandLogo from "@/components/common/BrandLogo";
import Container from "@/components/common/Container";
import MobileMenu from "@/components/layout/MobileMenu";
import WaitlistLinkButton from "@/components/layout/WaitlistLinkButton";
import { ActiveNavHref, MainNavItems } from "@/constants/app_navigation";
import { AppStrings } from "@/constants/app_strings";
import { cn } from "@/utils/classnames";

const { navigation } = AppStrings;

/** Overlays the hero image; the mobile menu drops down below it. */
export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <Container className="flex h-20 items-center justify-between gap-4 lg:h-24">
        <BrandLogo priority className="w-[clamp(8.5rem,6rem+8vw,13rem)]" />

        <nav aria-label={navigation.mainLabel} className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-10">
            {MainNavItems.map((item) => {
              const isActive = item.href === ActiveNavHref;
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

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <WaitlistLinkButton shape="rounded" className="px-6">
              {navigation.joinWaitlist}
            </WaitlistLinkButton>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
