import Image from "next/image";
import Container from "@/components/common/Container";
import Icon, { type IconName } from "@/components/common/Icon";
import SectionTitle from "@/components/common/SectionTitle";
import { AppAssets } from "@/constants/app_assets";
import { SectionIds } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";
import { getAssetUrl } from "@/lib/storage";
import type { ProblemContent, SolutionContent } from "@/models/site-content.model";

const PROBLEM_ICONS: readonly IconName[] = ["users", "frown", "mapPin"];
const { phones } = AppAssets.solution;

interface ProblemSolutionSectionProps {
  problem: ProblemContent;
  solution: SolutionContent;
}

export default function ProblemSolutionSection({ problem, solution }: ProblemSolutionSectionProps) {
  return (
    <section id={SectionIds.idea} className="overflow-hidden bg-charcoal text-white">
      <Container className="grid gap-12 pt-[clamp(3rem,2rem+3vw,4rem)] xl:grid-cols-2 xl:gap-10">
        <div className="flex flex-col gap-8 xl:pb-14">
          <SectionTitle eyebrow={problem.eyebrow} title={problem.title} className="max-w-md" />
          <ul className="grid gap-4 sm:grid-cols-3">
            {problem.items.map((item, index) => (
              <li
                key={item}
                className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <Icon name={PROBLEM_ICONS[index % PROBLEM_ICONS.length]} className="size-8 text-brand" strokeWidth={1.75} />
                <p className="leading-snug text-white/85">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:gap-4">
          <SectionTitle
            eyebrow={solution.eyebrow}
            title={solution.title}
            description={solution.description}
            className="xl:pb-14"
          />
          <Image
            src={getAssetUrl(phones)}
            alt={AppStrings.solution.imageAlt}
            width={phones.width}
            height={phones.height}
            sizes="(min-width: 1280px) 360px, (min-width: 640px) 45vw, 80vw"
            className="mx-auto -mb-6 w-full max-w-[22rem] self-end sm:max-w-none sm:max-w-[26rem] xl:-mt-12 xl:w-[112%] xl:max-w-none"
          />
        </div>
      </Container>
    </section>
  );
}
