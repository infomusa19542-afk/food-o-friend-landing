import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import FinalCTASection from "@/components/home/FinalCTASection";
import IdeaJourneySection from "@/components/idea/IdeaJourneySection";
import { AppRoutes } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";
import { getIdeaJourneys } from "@/controllers/idea.controller";
import { buildPageMetadata } from "@/lib/metadata";

// Screen content changes rarely: re-fetch from Supabase at most every 10 minutes.
export const revalidate = 600;

const { idea, cta } = AppStrings;

export const metadata: Metadata = buildPageMetadata({ ...idea.metadata, path: AppRoutes.idea });

export default async function IdeaPage() {
  const journeys = await getIdeaJourneys();

  return (
    <>
      <PageHero
        eyebrow={idea.hero.eyebrow}
        description={idea.hero.description}
        title={
          <>
            <span className="block">{idea.hero.title}</span>
            <span className="block text-brand">{idea.hero.titleAccent}</span>
          </>
        }
      >
        <p className="text-sm text-white/70">{idea.hero.disclaimer}</p>
      </PageHero>

      {journeys.map((journey, index) => (
        <IdeaJourneySection
          key={journey.key}
          journey={journey}
          tone={index % 2 === 1 ? "dark" : "light"}
          reverse={index % 2 === 1}
          eagerFirstImage={index === 0}
        />
      ))}

      <FinalCTASection content={cta} />
    </>
  );
}
