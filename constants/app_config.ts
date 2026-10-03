export const AppConfig = {
  supabase: {
    // Must be read with direct `process.env.NEXT_PUBLIC_*` access so Next.js can inline them.
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  },

  storage: {
    bucket: "site-assets",
  },

  database: {
    tables: {
      waitlist: "waitlist",
      siteContent: "site_content",
      faqItems: "faq_items",
    },
    rpc: {
      waitlistCount: "get_waitlist_count",
    },
    errorCodes: {
      uniqueViolation: "23505",
    },
  },

  waitlist: {
    source: "landing_page",
  },

  validation: {
    emailMaxLength: 254,
    nameMaxLength: 80,
    textMaxLength: 500,
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
