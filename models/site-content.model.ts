/** Section keys stored in the `site_content` table. */
export type SiteContentSection =
  | "hero"
  | "social_proof"
  | "problem"
  | "solution"
  | "how_it_works"
  | "safety"
  | "cta";

/** Raw row shape of `site_content`. `content` is untrusted JSON until parsed. */
export interface SiteContentRow {
  id: number;
  section: string;
  content: unknown;
}

/** Raw row shape of `faq_items`. Fields are re-validated before use. */
export interface FaqItemRow {
  id: number;
  question: unknown;
  answer: unknown;
  sort_order: number | null;
}

export interface FaqItem {
  id: number | string;
  question: string;
  answer: string;
}

export interface HeroContent {
  eyebrow: string;
  titlePrimary: string;
  titleAccent: string;
  description: string;
  waitlistButton: string;
}

export interface SocialProofContent {
  text: string;
}

export interface ProblemContent {
  eyebrow: string;
  title: string;
  items: readonly string[];
}

export interface SolutionContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface HowItWorksStep {
  title: string;
  description: string;
}

export interface HowItWorksContent {
  title: string;
  steps: readonly HowItWorksStep[];
}

export interface SafetyContent {
  eyebrow: string;
  title: string;
  items: readonly string[];
}

export interface CtaContent {
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
}

/** Fully resolved homepage content (remote values merged over local fallbacks). */
export interface HomeContent {
  hero: HeroContent;
  socialProof: SocialProofContent;
  problem: ProblemContent;
  solution: SolutionContent;
  howItWorks: HowItWorksContent;
  safety: SafetyContent;
  cta: CtaContent;
  faq: readonly FaqItem[];
}
