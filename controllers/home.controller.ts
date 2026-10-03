import "server-only";

import { AppStrings } from "@/constants/app_strings";
import type {
  FaqItem,
  FaqItemRow,
  HomeContent,
  HowItWorksStep,
  SiteContentRow,
  SiteContentSection,
} from "@/models/site-content.model";
import { fetchActiveFaqItems, fetchSiteContentRows } from "@/services/content.service";
import { logSafeError } from "@/utils/errors";
import { isRecord, readRecordArray, readString, readStringArray, type JsonRecord } from "@/utils/parsers";

type SectionMap = Partial<Record<SiteContentSection, JsonRecord>>;

const toSectionMap = (rows: SiteContentRow[]): SectionMap =>
  Object.fromEntries(
    rows.filter((row) => isRecord(row.content)).map((row) => [row.section, row.content]),
  );

const toSteps = (source: JsonRecord): readonly HowItWorksStep[] => {
  const fallback = AppStrings.howItWorks.steps;
  const steps = readRecordArray(source, "steps").map((step, index) => ({
    title: readString(step, "title", fallback[index]?.title ?? ""),
    description: readString(step, "description", fallback[index]?.description ?? ""),
  }));
  return steps.length > 0 ? steps : fallback;
};

const toFaqItems = (rows: FaqItemRow[]): FaqItem[] =>
  rows.map(({ id, question, answer }) => ({ id, question, answer }));

/** Merges remote `site_content` values over local fallbacks from AppStrings. */
const buildHomeContent = (sections: SectionMap, faq: readonly FaqItem[]): HomeContent => {
  const { hero, socialProof, problem, solution, howItWorks, safety, cta } = AppStrings;
  const remote = (key: SiteContentSection): JsonRecord => sections[key] ?? {};

  return {
    hero: {
      eyebrow: readString(remote("hero"), "eyebrow", hero.eyebrow),
      titlePrimary: readString(remote("hero"), "titleWhite", hero.titlePrimary),
      titleAccent: readString(remote("hero"), "titleOrange", hero.titleAccent),
      description: readString(remote("hero"), "description", hero.description),
      waitlistButton: readString(remote("hero"), "buttonText", hero.waitlistButton),
    },
    socialProof: {
      text: readString(remote("social_proof"), "text", socialProof.text),
    },
    problem: {
      eyebrow: readString(remote("problem"), "eyebrow", problem.eyebrow),
      title: readString(remote("problem"), "title", problem.title),
      items: readStringArray(remote("problem"), "items", problem.items),
    },
    solution: {
      eyebrow: readString(remote("solution"), "eyebrow", solution.eyebrow),
      title: readString(remote("solution"), "title", solution.title),
      description: readString(remote("solution"), "description", solution.description),
    },
    howItWorks: {
      title: readString(remote("how_it_works"), "title", howItWorks.title),
      steps: toSteps(remote("how_it_works")),
    },
    safety: {
      eyebrow: readString(remote("safety"), "eyebrow", safety.eyebrow),
      title: readString(remote("safety"), "title", safety.title),
      items: readStringArray(remote("safety"), "items", safety.items),
    },
    cta: {
      eyebrow: readString(remote("cta"), "eyebrow", cta.eyebrow),
      title: readString(remote("cta"), "title", cta.title),
      description: readString(remote("cta"), "description", cta.description),
      buttonText: readString(remote("cta"), "buttonText", cta.buttonText),
    },
    faq,
  };
};

/** Never throws: any failed source falls back to local content. */
export const getHomeContent = async (): Promise<HomeContent> => {
  const [contentResult, faqResult] = await Promise.allSettled([
    fetchSiteContentRows(),
    fetchActiveFaqItems(),
  ]);

  if (contentResult.status === "rejected") logSafeError("home.content", contentResult.reason);
  if (faqResult.status === "rejected") logSafeError("home.faq", faqResult.reason);

  const sections = contentResult.status === "fulfilled" ? toSectionMap(contentResult.value) : {};
  const faq = faqResult.status === "fulfilled" ? toFaqItems(faqResult.value) : [];

  return buildHomeContent(sections, faq);
};
