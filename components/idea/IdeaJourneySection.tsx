import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import IdeaCarousel from "@/components/idea/IdeaCarousel";
import { AppStrings } from "@/constants/app_strings";
import type { IdeaJourney } from "@/models/idea-screen.model";
import { cn } from "@/utils/classnames";

interface IdeaJourneySectionProps {
  journey: IdeaJourney;
  tone: "light" | "dark";
  reverse?: boolean;
  eagerFirstImage?: boolean;
}

export default function IdeaJourneySection({ journey, tone, reverse, eagerFirstImage }: IdeaJourneySectionProps) {
  const copy = AppStrings.idea.journeys[journey.key];

  return (
    <section
      aria-labelledby={`journey-${journey.key}`}
      className={cn(tone === "dark" ? "bg-charcoal text-white" : "bg-cream text-text-dark")}
    >
      <Container className="section-y flex flex-col gap-10 lg:gap-14">
        <SectionTitle
          eyebrow={copy.eyebrow}
          title={<span id={`journey-${journey.key}`}>{journey.title}</span>}
          description={copy.description}
          tone={tone}
          className="max-w-2xl"
        />
        <IdeaCarousel
          label={journey.title}
          screens={journey.screens}
          tone={tone}
          reverse={reverse}
          eagerFirstImage={eagerFirstImage}
        />
      </Container>
    </section>
  );
}
