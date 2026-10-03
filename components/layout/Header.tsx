import BrandLogo from "@/components/common/BrandLogo";
import Container from "@/components/common/Container";
import DesktopNav from "@/components/layout/DesktopNav";
import MobileMenu from "@/components/layout/MobileMenu";
import WaitlistLinkButton from "@/components/layout/WaitlistLinkButton";
import { AppStrings } from "@/constants/app_strings";

/** Overlays the first (dark) section of every page; the mobile menu drops down below it. */
export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <Container className="flex h-20 items-center justify-between gap-4 lg:h-24">
        <BrandLogo priority className="w-[clamp(8.5rem,6rem+8vw,13rem)]" />
        <DesktopNav />
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <WaitlistLinkButton shape="rounded" className="px-6">
              {AppStrings.navigation.joinWaitlist}
            </WaitlistLinkButton>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
