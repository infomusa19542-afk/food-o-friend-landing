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
    footerLabel: "Footer navigation",
    legalLabel: "Legal",
  },

  hero: {
    eyebrow: "GOOD FOOD BRINGS PEOPLE TOGETHER",
    titlePrimary: "Great Food",
    titleAccent: "Greater Friends",
    description:
      "Food o Friend helps you meet new people and share meals based on your interests, location and vibe.",
    waitlistButton: "Join Waitlist",
    imageAlt: "Friends laughing and sharing pizza together at a restaurant",
  },

  socialProof: {
    /** Plural form; remotely editable via `site_content.social_proof.text`. */
    text: "food lovers already joined the waitlist",
    textSingular: "food lover already joined the waitlist",
    empty: "Be the first food lover to join the waitlist",
    unavailable: "Join food lovers on the waitlist",
  },

  features: {
    people: {
      title: "Meet Real People",
      description: "Find food friends with similar interests and tastes.",
    },
    meals: {
      title: "Share Amazing Meals",
      description: "Dine in together, try new places, explore cuisines.",
    },
    city: {
      title: "Discover Your City",
      description: "Explore hidden gems and local favourites.",
    },
    connections: {
      title: "Build Meaningful Connections",
      description: "Turn meals into lasting friendships.",
    },
  },

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
    eyebrow: "HOW IT WORKS",
    handwritten: ["Good Food", "Great People", "Happier You"],
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
      "Your personal info is always private",
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
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    description: "Everything you need to know before your first Food O Friend meetup.",
    /** Shown when `faq_items` is empty or unavailable. */
    fallbackItems: [
      {
        id: "what-is-food-o-friend",
        question: "What is Food O Friend?",
        answer:
          "Food o Friend helps you meet new people and share meals based on your interests, location and vibe.",
      },
      {
        id: "when-launch",
        question: "When will Food O Friend launch?",
        answer:
          "We're preparing for launch now. Join the waitlist and you'll be among the first to know when meetups open in your city.",
      },
      {
        id: "waitlist-cost",
        question: "Does it cost anything to join the waitlist?",
        answer: "No. Joining the waitlist is free and only needs your email address.",
      },
      {
        id: "safety",
        question: "How do you keep meetups safe?",
        answer:
          "Your personal info stays private, meetups are based on age group and interests, and you control what you share and when.",
      },
    ],
  },

  footer: {
    socialLabel: "Follow Food O Friend",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    copyright: (year: number) => `© ${year} Food O Friend. All rights reserved.`,
  },

  social: {
    instagram: "Instagram",
    tiktok: "TikTok",
    facebook: "Facebook",
    youtube: "YouTube",
    x: "X",
  },

  forms: {
    emailLabel: "Email address",
    emailPlaceholder: "Enter your email address",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    submitting: "Joining...",
    honeypotLabel: "Leave this field empty",
  },

  waitlist: {
    success: "You're on the waitlist!",
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
