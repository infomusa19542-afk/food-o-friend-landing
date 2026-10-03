import Link from "next/link";
import BrandLogo from "@/components/common/BrandLogo";
import Container from "@/components/common/Container";
import Icon from "@/components/common/Icon";
import { FooterNavItems, LegalNavItems, SocialLinks } from "@/constants/app_navigation";
import { AppStrings } from "@/constants/app_strings";
import { currentYear } from "@/utils/formatters";

const { navigation, footer } = AppStrings;

const LINK_CLASSES =
  "inline-flex min-h-11 items-center rounded-md transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink text-white">
      <Container className="flex flex-col gap-6 py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <BrandLogo className="w-40" />

          <nav aria-label={navigation.footerLabel}>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-1 text-sm text-white/80">
              {FooterNavItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={LINK_CLASSES}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul aria-label={footer.socialLabel} className="flex items-center gap-1">
            {SocialLinks.map((link) => (
              <li key={link.icon}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
                >
                  <Icon name={link.icon} className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col-reverse items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>{footer.copyright(currentYear())}</p>
          <nav aria-label={navigation.legalLabel}>
            <ul className="flex items-center gap-4">
              {LegalNavItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={LINK_CLASSES}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
