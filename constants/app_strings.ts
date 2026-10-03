/**
 * All static, user-facing copy. Sections that also exist in Supabase `site_content`
 * act as fallbacks when remote content can't be loaded.
 */
export const AppStrings = {
  brand: {
    name: "Food O Friend",
    tagline: "Great Food, Greater Friends",
  },

  metadata: {
    title: "Food O Friend — Great Food, Greater Friends",
    description:
      "Food o Friend helps you meet new people and share meals based on your interests, location and vibe.",
  },

  navigation: {
    home: "Home",
    idea: "The Idea",
    howItWorks: "How It Works",
    safety: "Safety",
    faq: "FAQ",
    joinWaitlist: "Join Waitlist",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainLabel: "Main navigation",
  },

  hero: {
    eyebrow: "GOOD FOOD BRINGS PEOPLE TOGETHER",
    titlePrimary: "Great Food",
    titleAccent: "Greater Friends",
    description:
      "Food o Friend helps you meet new people and share meals based on your interests, location and vibe.",
    waitlistButton: "Join Waitlist",
    imageAlt: "Friends sharing a meal together at a restaurant table",
  },

  socialProof: {
    text: "food lovers already joined the waitlist",
  },

  features: [
    { title: "Meet Real People" },
    { title: "Share Amazing Meals" },
    { title: "Discover Your City" },
    { title: "Build Meaningful Connections" },
  ],

  problem: {
    eyebrow: "THE PROBLEM",
    title: "Great food is better when shared, but...",
    items: [
      "It is hard to find people with similar taste and vibe.",
      "Many people eat alone even though they want company.",
      "Existing platforms are not focused on food meetups.",
    ],
  },

  solution: {
    eyebrow: "OUR SOLUTION",
    title: "A community built around good food.",
    description:
      "Food o Friend connects people who love food and want to meet new friends for dine-in experiences.",
    imageAlt: "Food O Friend app screens on two phones",
  },

  howItWorks: {
    title: "Simple Steps to Meet Food Friends",
    steps: [
      {
        title: "Create Your Profile",
        description: "Tell us your food preferences, interests and vibe.",
      },
      {
        title: "Find or Create a Meetup",
        description: "Join existing food meetups or create your own.",
      },
      {
        title: "Dine, Connect, Repeat",
        description: "Meet new people, enjoy great food and build real friendships.",
      },
    ],
  },

  safety: {
    eyebrow: "YOUR SAFETY COMES FIRST",
    title: "A Safe and Respectful Community",
    items: [
      "Your personal information is always private",
      "Meetups are based on age group and interests",
      "You control what you share and when",
      "We promote a respectful and healthy environment",
    ],
    imageAlt: "Friends laughing together outdoors at sunset",
  },

  cta: {
    eyebrow: "BE A PART OF SOMETHING DELICIOUS",
    title: "Join the Food o Friend Waitlist",
    description: "Get early access, exclusive updates and be part of our launch community.",
    buttonText: "Join Waitlist",
  },

  faq: {
    title: "Frequently Asked Questions",
  },

  footer: {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    copyright: (year: number) => `© ${year} Food O Friend. All rights reserved.`,
  },

  forms: {
    emailLabel: "Email address",
    emailPlaceholder: "Enter your email",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    submitting: "Submitting...",
  },

  waitlist: {
    success: "You're on the list! We'll be in touch soon.",
    duplicate: "You're already on the waitlist.",
  },

  validation: {
    emailRequired: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address.",
    emailTooLong: "That email address is too long.",
    nameTooLong: "That name is too long.",
  },

  errors: {
    generic: "Something went wrong. Please try again in a moment.",
    network: "We couldn't reach the server. Please check your connection and try again.",
  },

  common: {
    loading: "Loading",
  },
} as const;
