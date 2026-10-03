export const AppConfig = {
  supabase: {
    // Must be read with direct `process.env.NEXT_PUBLIC_*` access so Next.js can inline them.
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  },

  storage: {
    bucket: "site-assets",
    /** App screenshots for the /idea page. */
    ideaBucket: "idea-assets",
  },

  /**
   * Business details shown on legal pages.
   * TODO(before launch): set the registered legal entity and a monitored contact email.
   */
  company: {
    displayName: "Food O Friend",
    legalEntityName: null as string | null,
    contactEmail: null as string | null,
    legalLastUpdated: "4 October 2026",
  },

  database: {
    tables: {
      waitlist: "waitlist",
      siteContent: "site_content",
      faqItems: "faq_items",
      userRegistrations: "user_registrations",
      restaurantOwners: "restaurant_owners",
      ideaScreens: "idea_screens",
    },
    rpc: {
      waitlistCount: "get_waitlist_count",
    },
    errorCodes: {
      uniqueViolation: "23505",
    },
    /** Abort slow Supabase requests so the page falls back instead of hanging. */
    timeoutMs: 8000,
  },

  forms: {
    /** Hidden spam-trap field name. Deliberately not a common autofill name. */
    honeypotField: "company_site",
  },

  waitlist: {
    source: "website",
    inputIds: {
      hero: "hero-waitlist-email",
      cta: "cta-waitlist-email",
    },
  },

  /** Mirrored by CHECK constraints in supabase/*.sql. */
  validation: {
    emailMaxLength: 254,
    nameMaxLength: 80,
    shortTextMaxLength: 120,
    addressMaxLength: 200,
    messageMaxLength: 1000,
    phoneMaxLength: 20,
    phoneMinDigits: 7,
    urlMaxLength: 200,
    maxSelections: 8,
    seatingCapacity: { min: 1, max: 2000 },
  },

  // Placeholder profile URLs until the official accounts are live.
  social: {
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
    facebook: "https://www.facebook.com/",
    youtube: "https://www.youtube.com/",
    x: "https://x.com/",
  },

  locale: "en-US",
} as const;
