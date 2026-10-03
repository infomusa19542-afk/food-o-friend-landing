import Container from "@/components/common/Container";
import type { IconName } from "@/components/common/Icon";
import IconCircle from "@/components/common/IconCircle";
import SectionTitle from "@/components/common/SectionTitle";
import { SectionIds } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";
import type { HowItWorksContent } from "@/models/site-content.model";

const STEP_ICONS: readonly IconName[] = ["user", "users", "utensils"];

/** Dashed connector between steps (desktop/tablet). */
function FlowArrow() {
  return (
    <span aria-hidden="true" className="hidden min-w-6 flex-1 items-center text-brand/60 md:flex">
      <span className="h-0 flex-1 border-t-2 border-dashed border-current" />
      <svg viewBox="0 0 8 12" className="h-3 w-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m1 1 5 5-5 5" />
      </svg>
    </span>
  );
}

interface HowItWorksSectionProps {
  content: HowItWorksContent;
}

export default function HowItWorksSection({ content }: HowItWorksSectionProps) {
  const lastIndex = content.steps.length - 1;

  return (
    <section id={SectionIds.howItWorks} className="bg-cream text-text-dark">
      <Container className="section-y grid gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto]">
        <SectionTitle eyebrow={AppStrings.howItWorks.eyebrow} title={content.title} tone="light" />

        <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
          {content.steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-4 md:flex-col">
              <div className="flex shrink-0 items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex size-7 items-center justify-center rounded-full bg-brand-tint text-sm font-bold text-brand ring-1 ring-brand/30"
                >
                  {index + 1}
                </span>
                <IconCircle name={STEP_ICONS[index % STEP_ICONS.length]} size="lg" />
                {index < lastIndex && <FlowArrow />}
              </div>
              <div className="min-w-0 pt-1 md:pt-0">
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-1 leading-relaxed text-text-soft">{step.description}</p>
              </div>
              {index < lastIndex && (
                <span
                  aria-hidden="true"
                  className="absolute top-16 -bottom-6 left-[4.25rem] border-l-2 border-dashed border-brand/40 md:hidden"
                />
              )}
            </li>
          ))}
        </ol>

        <p
          aria-hidden="true"
          className="hidden -rotate-12 font-hand text-[clamp(1.5rem,1rem+0.8vw,2rem)] leading-tight text-brand xl:block"
        >
          {AppStrings.howItWorks.handwritten.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </Container>
    </section>
  );
}
