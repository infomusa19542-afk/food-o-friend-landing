import { getImageProps } from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import Icon from "@/components/common/Icon";
import SectionTitle from "@/components/common/SectionTitle";
import WaitlistForm from "@/components/common/WaitlistForm";
import { AppAssets } from "@/constants/app_assets";
import { AppConfig } from "@/constants/app_config";
import { AppRoutes, SectionIds } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";
import { getAssetUrl } from "@/lib/storage";
import type { CtaContent } from "@/models/site-content.model";

const PATTERN_TILE_SIZE = 420;
const { foodPattern } = AppAssets.decorations;

// Optimized, tile-sized pattern URL for a repeating CSS background.
const patternUrl = getImageProps({
  src: getAssetUrl(foodPattern),
  alt: "",
  width: PATTERN_TILE_SIZE,
  height: PATTERN_TILE_SIZE,
}).props.src;

interface FinalCTASectionProps {
  content: CtaContent;
}

const { cta } = AppStrings;

export default function FinalCTASection({ content }: FinalCTASectionProps) {
  return (
    <section id={SectionIds.waitlist} className="relative isolate overflow-hidden bg-brand text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-15 brightness-0 invert"
        style={{
          backgroundImage: `url(${patternUrl})`,
          backgroundSize: `${PATTERN_TILE_SIZE}px`,
        }}
      />
      <Container className="flex flex-col gap-8 py-[clamp(2.5rem,2rem+2vw,3.5rem)] lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex flex-col gap-4 lg:max-w-2xl">
          <SectionTitle
            eyebrow={content.eyebrow}
            eyebrowClassName="text-white"
            title={content.title}
            description={content.description}
            tone="onBrand"
          />
          <p className="text-sm font-medium text-white">
            {cta.restaurantPrompt}{" "}
            <Link
              href={AppRoutes.restaurantOwner}
              className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {cta.restaurantLink}
              <Icon name="arrowRight" className="size-3.5" />
            </Link>
          </p>
        </div>
        <WaitlistForm
          id={AppConfig.waitlist.inputIds.cta}
          variant="cta"
          buttonText={content.buttonText}
          className="lg:max-w-[28rem]"
        />
      </Container>
    </section>
  );
}
