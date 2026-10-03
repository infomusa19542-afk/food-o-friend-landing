import { AppConfig } from "@/constants/app_config";
import { AppRoutes, SectionIds, toSectionHref } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";
import type { NavItem } from "@/types";

const { navigation, footer, social } = AppStrings;

export const MainNavItems: readonly NavItem[] = [
  { label: navigation.home, href: toSectionHref(SectionIds.home) },
  { label: navigation.idea, href: AppRoutes.idea },
  { label: navigation.howItWorks, href: toSectionHref(SectionIds.howItWorks) },
  { label: navigation.safety, href: toSectionHref(SectionIds.safety) },
  { label: navigation.faq, href: toSectionHref(SectionIds.faq) },
];

/** Footer adds links to standalone pages after the homepage sections. */
export const FooterNavItems: readonly NavItem[] = [
  ...MainNavItems,
  { label: navigation.restaurants, href: AppRoutes.restaurantOwner },
];

/** Static highlight on the homepage until scroll-aware navigation exists. */
export const ActiveNavHref = toSectionHref(SectionIds.home);

export const WaitlistHref = toSectionHref(SectionIds.waitlist);

export const LegalNavItems: readonly NavItem[] = [
  { label: footer.privacy, href: AppRoutes.privacy },
  { label: footer.terms, href: AppRoutes.terms },
];

export const SocialLinks = [
  { icon: "instagram", label: social.instagram, href: AppConfig.social.instagram },
  { icon: "tiktok", label: social.tiktok, href: AppConfig.social.tiktok },
  { icon: "facebook", label: social.facebook, href: AppConfig.social.facebook },
  { icon: "youtube", label: social.youtube, href: AppConfig.social.youtube },
  { icon: "x", label: social.x, href: AppConfig.social.x },
] as const;
