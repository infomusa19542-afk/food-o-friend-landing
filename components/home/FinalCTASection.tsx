import { getImageProps } from "next/image";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import WaitlistForm from "@/components/common/WaitlistForm";
import { AppAssets } from "@/constants/app_assets";
import { AppConfig } from "@/constants/app_config";
import { SectionIds } from "@/constants/app_routes";
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
        <SectionTitle
          eyebrow={content.eyebrow}
          eyebrowClassName="text-white"
          title={content.title}
          description={content.description}
          tone="onBrand"
          className="lg:max-w-2xl"
        />
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
