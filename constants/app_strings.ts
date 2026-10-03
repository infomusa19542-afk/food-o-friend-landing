import { AppLegalStrings } from "@/constants/app_legal_strings";
import type { IdeaJourneyKey } from "@/constants/app_idea_content";
import type { AgeRange, FoodInterest, MeetupType, SocialInterest, YesNoValue } from "@/constants/app_options";

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
      "Meet new people through shared food experiences, discover dining meetups, and build meaningful connections around great food.",
    ogImageAlt: "Food O Friend — Great Food, Greater Friends",
  },

  notFound: {
    metadataTitle: "Page Not Found",
    eyebrow: "404",
    title: "We couldn't find that page",
    description: "The page you're looking for doesn't exist or may have moved.",
    action: "Back to homepage",
  },

  errorPage: {
    eyebrow: "SOMETHING WENT WRONG",
    title: "Sorry, this page didn't load",
    description: "Please try again. If the problem continues, come back a little later.",
    retry: "Try again",
    home: "Back to homepage",
  },

  accessibility: {
    skipToContent: "Skip to main content",
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
    restaurants: "For Restaurants",
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
    restaurantPrompt: "Are you a restaurant owner?",
    restaurantLink: "Partner with us",
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

  idea: {
    metadata: {
      title: "The Idea",
      description:
        "See how Food O Friend brings people together through shared meals, from discovering a group dinner to meeting new people and settling the bill together.",
    },
    hero: {
      eyebrow: "THE IDEA",
      title: "From a shared table",
      titleAccent: "to new friendships",
      description:
        "Take a look inside the Food O Friend app — from finding a group dinner nearby to meeting new people and settling the bill together.",
      disclaimer: "These are design previews of the app we're building, so details may change before launch.",
    },
    journeys: {
      account_onboarding: {
        eyebrow: "STEP 1",
        description: "Getting started takes a few screens: what Food O Friend is, how your privacy works and setting up your account.",
      },
      discover_profile: {
        eyebrow: "STEP 2",
        description: "Find group meals near you, check the details before you join, and keep track of your meetups and the people you meet.",
      },
      meetup: {
        eyebrow: "STEP 3",
        description: "From reserving a seat to meeting the group and splitting the bill — every step of a Food O Friend meetup.",
      },
    } satisfies Record<IdeaJourneyKey, { eyebrow: string; description: string }>,
    carousel: {
      screen: "Screen",
      actionsHeading: "What you can do",
      noteLabel: "Still being finalised",
      previous: "Previous screen",
      next: "Next screen",
      pagination: "Choose a screen",
      goTo: (number: number, title: string) => `Show screen ${number}: ${title}`,
      position: (current: number, total: number, title: string) => `Screen ${current} of ${total}: ${title}`,
      keyboardHint: "Use the left and right arrow keys to move between screens.",
      previewUnavailable: "Preview unavailable",
    },
  },

  registration: {
    metadata: {
      title: "Tell Us About Yourself",
      description: "Share your food and social interests to help shape Food O Friend meetups.",
    },
    hero: {
      eyebrow: "EARLY ACCESS PROFILE",
      title: "Tell us a little about yourself",
      description: "Help us understand what kind of Food O Friend experiences you'd enjoy.",
    },
    aside: {
      title: "Why we ask",
      items: [
        "Your answers help us plan the first meetups in your city.",
        "This isn't an account — there's no password and no login.",
        "We never ask for your date of birth or exact location.",
      ],
    },
    fields: {
      fullName: "Full name",
      email: "Email",
      city: "City",
      country: "Country",
      ageRange: "Age range",
      foodInterests: "Food interests",
      socialInterests: "Social interests",
      preferredMeetupType: "Preferred meetup type",
      message: "Anything else you'd like us to know?",
      consent:
        "I agree that Food O Friend may store these details and contact me about early access, as described in the",
    },
    hints: {
      multiSelect: "Choose all that apply.",
    },
    options: {
      ageRange: {
        "18-24": "18–24",
        "25-34": "25–34",
        "35-44": "35–44",
        "45-54": "45–54",
        "55+": "55+",
      } satisfies Record<AgeRange, string>,
      foodInterests: {
        italian: "Italian",
        asian: "Asian",
        middle_eastern: "Middle Eastern",
        street_food: "Street food",
        vegetarian_vegan: "Vegetarian & vegan",
        fine_dining: "Fine dining",
        coffee_brunch: "Coffee & brunch",
        desserts: "Desserts",
      } satisfies Record<FoodInterest, string>,
      socialInterests: {
        new_friends: "Making new friends",
        networking: "Professional networking",
        language_exchange: "Language exchange",
        travel: "Travel",
        sports_fitness: "Sports & fitness",
        arts_culture: "Arts & culture",
        music: "Music",
        gaming: "Gaming",
      } satisfies Record<SocialInterest, string>,
      preferredMeetupType: {
        small_group: "Small group (3–5 people)",
        large_group: "Larger group (6+ people)",
        either: "Either is fine",
      } satisfies Record<MeetupType, string>,
    },
    submit: "Send My Details",
    success: "Thanks! We've saved your details.",
    duplicate: "We already have details for this email address.",
  },

  restaurantOwner: {
    metadata: {
      title: "For Restaurant Owners",
      description:
        "Become a Food O Friend meetup location and welcome new groups of diners who want to meet, eat and connect.",
    },
    hero: {
      eyebrow: "FOR RESTAURANT OWNERS",
      title: "Are you a restaurant owner?",
      titleAccent: "Find your next group of friends.",
      description:
        "Food O Friend helps people discover new friends through shared dining experiences — while helping restaurants welcome new groups of diners.",
      cta: "Register Your Restaurant",
      imageAlt: "A group of friends sharing pizza and drinks at a restaurant table",
    },
    pitch: {
      eyebrow: "WHERE FRIENDSHIPS BEGIN",
      title: "Turn empty tables into new connections.",
      description:
        "Our diners aren't strangers with nothing in common. Food O Friend brings people together around what they already share, so they arrive ready to connect — and your restaurant becomes the place where new friendships begin.",
      matchLabel: "We bring diners together around",
      matches: ["Food tastes", "Interests", "Age groups", "Location", "Shared experiences"],
    },
    benefits: {
      eyebrow: "WHY PARTNER WITH US",
      title: "What Food O Friend can bring to your restaurant",
      items: [
        {
          title: "Attract new groups of diners",
          description: "Welcome groups who are looking for a great place to meet.",
        },
        {
          title: "Increase dine-in discovery",
          description: "Get discovered by food lovers exploring new places in your city.",
        },
        {
          title: "Host community meetups",
          description: "Become the setting for regular, friendly community gatherings.",
        },
        {
          title: "Reach people seeking new experiences",
          description: "Connect with diners who actively want to try somewhere new.",
        },
        {
          title: "Build repeat customers",
          description: "Give groups a reason to return to the place they first met.",
        },
        {
          title: "Become a meetup location",
          description: "Be considered as a Food O Friend meetup spot when we launch near you.",
        },
      ],
      disclaimer:
        "We're still pre-launch, so we can't promise specific bookings or revenue — but we'd love to explore it with you.",
    },
    form: {
      eyebrow: "REGISTER INTEREST",
      title: "Register your restaurant",
      description: "Tell us about your restaurant and we'll be in touch as we plan meetups in your city.",
    },
    fields: {
      restaurantName: "Restaurant name",
      contactName: "Owner or contact name",
      email: "Email",
      phone: "Phone",
      city: "City",
      address: "Restaurant address",
      cuisineType: "Cuisine type",
      websiteOrInstagram: "Website or Instagram",
      seatingCapacity: "Estimated seating capacity",
      interestedInHosting: "Interested in hosting meetups?",
      message: "Message",
      consent:
        "I agree that Food O Friend may store these details and contact me about partnering, as described in the",
    },
    placeholders: {
      cuisineType: "e.g. Italian, Lebanese, Vegan",
      websiteOrInstagram: "https://… or @yourrestaurant",
      seatingCapacity: "e.g. 40",
    },
    options: {
      interestedInHosting: {
        yes: "Yes, I'm interested",
        no: "Not right now",
      } satisfies Record<YesNoValue, string>,
    },
    submit: "Register Your Restaurant",
    success: "Thank you! We've received your restaurant details and will be in touch.",
    duplicate: "We already have this restaurant registered with this email address.",
  },

  legal: AppLegalStrings,

  forms: {
    emailLabel: "Email address",
    emailPlaceholder: "Enter your email address",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    submitting: "Joining...",
    sending: "Sending...",
    honeypotLabel: "Leave this field empty",
    optional: "(optional)",
    selectPlaceholder: "Select an option",
    fixErrors: "Please check the highlighted fields.",
    backHome: "Back to homepage",
    submitAnother: "Submit another response",
  },

  waitlist: {
    success: "You're on the waitlist!",
    duplicate: "You're already on the waitlist.",
    registerPrompt: "Tell us a bit more about yourself",
  },

  validation: {
    emailRequired: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address.",
    emailTooLong: "That email address is too long.",
    required: "This field is required.",
    tooLong: (max: number) => `Please keep this under ${max} characters.`,
    invalidChoice: "Please choose one of the options.",
    selectAtLeastOne: "Please choose at least one option.",
    tooManySelections: (max: number) => `Please choose up to ${max} options.`,
    phoneInvalid: "Please enter a valid phone number.",
    urlInvalid: "Please enter a website address or an Instagram handle like @yourrestaurant.",
    wholeNumberRange: (min: number, max: number) => `Please enter a whole number between ${min} and ${max}.`,
    consentRequired: "Please confirm you agree before submitting.",
  },

  errors: {
    generic: "Something went wrong. Please try again in a moment.",
    network: "We couldn't reach the server. Please check your connection and try again.",
  },

  common: {
    loading: "Loading",
  },
} as const;
