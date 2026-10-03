/**
 * Privacy Policy and Terms copy. Exposed as `AppStrings.legal`.
 * Keep these statements accurate to how the website actually behaves — review them
 * whenever data collection, hosting, cookies or analytics change.
 */

export interface LegalSection {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
}

export interface LegalDocumentCopy {
  metadata: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly LegalSection[];
}

const privacy: LegalDocumentCopy = {
  metadata: {
    title: "Privacy Policy",
    description: "How the Food O Friend website collects and uses the information you submit.",
  },
  eyebrow: "PRIVACY",
  title: "Privacy Policy",
  intro:
    "This policy explains what information the Food O Friend website collects, why we collect it and what choices you have. Food O Friend is pre-launch, so this page describes the website as it works today.",
  sections: [
    {
      heading: "Information we collect",
      paragraphs: ["We only collect information you choose to submit through our forms:"],
      bullets: [
        "Waitlist: your email address, the date you joined and a note that you joined through the website.",
        "Early access profile: your name, email, city, country, age range, food and social interests, preferred meetup type, an optional message and your consent choice.",
        "Restaurant interest form: restaurant name, contact name, email, city, cuisine type, estimated seating capacity, whether you're interested in hosting meetups and your consent choice, plus any optional details you add (phone, address, website or Instagram, message).",
        "We don't ask for passwords, dates of birth, precise location or identity documents.",
      ],
    },
    {
      heading: "Why we collect it",
      bullets: [
        "To let you know when Food O Friend launches and share early-access updates.",
        "To plan meetups and launch cities based on the interest people share with us.",
        "To contact restaurant owners about partnering with Food O Friend.",
        "To protect our forms from spam and abuse.",
      ],
    },
    {
      heading: "Where your information is stored",
      paragraphs: [
        "Form submissions are stored in a database provided by Supabase, which we use as our infrastructure provider. Our database rules let the website add new submissions but don't let website visitors read them back. Within Food O Friend, only the people running the project can access submitted information.",
        "The website is served by a hosting provider, which may process standard technical information such as IP addresses in server logs in order to deliver and protect the site.",
      ],
    },
    {
      heading: "Cookies and analytics",
      paragraphs: [
        "The website doesn't currently use cookies, analytics, advertising or third-party tracking scripts. If that changes, we'll update this page first.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "We keep submissions while we prepare for and run Food O Friend's launch. When information is no longer needed for those purposes, or if you ask us to delete it, we'll remove it.",
      ],
    },
    {
      heading: "Your choices",
      bullets: [
        "You can ask us what information we hold about you.",
        "You can ask us to correct or delete your information.",
        "You can ask us to stop contacting you at any time.",
        "We don't sell your information.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "We'll update this page as Food O Friend develops. The date at the top shows when it last changed.",
      ],
    },
  ],
};

const terms: LegalDocumentCopy = {
  metadata: {
    title: "Terms of Service",
    description: "The terms that apply when you use the Food O Friend website.",
  },
  eyebrow: "TERMS",
  title: "Terms of Service",
  intro:
    "These terms apply to your use of the Food O Friend website. By using the site or submitting one of our forms, you agree to them.",
  sections: [
    {
      heading: "About this website",
      paragraphs: [
        "Food O Friend is a pre-launch project. This website explains the idea, lets you join the waitlist and share your interests, and lets restaurants register interest in partnering. It doesn't yet provide meetups, bookings or any other service.",
      ],
    },
    {
      heading: "Joining the waitlist",
      paragraphs: [
        "Joining the waitlist is free and doesn't create an account. It lets us contact you about Food O Friend, and you can ask to be removed at any time.",
      ],
    },
    {
      heading: "No guaranteed launch",
      paragraphs: [
        "We're working towards launch, but we can't guarantee when, where or whether Food O Friend will launch, or which features it will include. Joining the waitlist or sharing your details doesn't guarantee access.",
      ],
    },
    {
      heading: "Restaurant interest submissions",
      paragraphs: [
        "Submitting the restaurant form registers interest only. It doesn't create a partnership, contract or commitment for either side, and we can't promise bookings, customers or revenue.",
      ],
    },
    {
      heading: "Acceptable use",
      paragraphs: ["When using the website, please:"],
      bullets: [
        "Provide accurate information, and only submit your own details or details you're authorised to share.",
        "Don't send spam, automated or misleading submissions.",
        "Don't try to interfere with, overload or gain unauthorised access to the website or its systems.",
        "Don't use the website for anything unlawful.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "The Food O Friend name, logo, design, text and images on this website belong to Food O Friend or are used with permission. Please don't copy or reuse them without our permission.",
      ],
    },
    {
      heading: "Information on this website",
      paragraphs: [
        "This website provides general information about a pre-launch project. We try to keep it accurate, but it is provided “as is” and may change at any time. To the extent permitted by law, we aren't responsible for losses arising from your use of the website.",
      ],
    },
    {
      heading: "Privacy",
      paragraphs: ["Our Privacy Policy explains how we handle the information you submit."],
    },
    {
      heading: "Changes to these terms",
      paragraphs: [
        "We may update these terms as Food O Friend develops. The date at the top shows when they last changed, and continuing to use the website means you accept the updated terms.",
      ],
    },
  ],
};

export const AppLegalStrings = {
  privacy,
  terms,
  lastUpdated: "Last updated",
  providedBy: "This website is operated by",
  contact: {
    heading: "Contact",
    withEmail: "For questions or requests about your information or these terms, email",
    // Shown until AppConfig.company.contactEmail is configured.
    pending:
      "A contact email for privacy and legal requests hasn't been published yet. It will be added here before launch.",
  },
} as const;
