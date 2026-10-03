export const AppRoutes = {
  home: "/",
  idea: "/idea",
  register: "/register",
  restaurantOwner: "/restaurant-owner",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const SectionIds = {
  home: "home",
  idea: "idea",
  howItWorks: "how-it-works",
  safety: "safety",
  faq: "faq",
  waitlist: "waitlist",
} as const;

/** Anchors on standalone pages. */
export const PageSectionIds = {
  registrationForm: "registration-form",
  restaurantForm: "restaurant-form",
} as const;

export type SectionId = (typeof SectionIds)[keyof typeof SectionIds];

export const toSectionHref = (id: SectionId): string => `${AppRoutes.home}#${id}`;
