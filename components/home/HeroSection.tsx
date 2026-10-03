import Image from "next/image";
import AppButton from "@/components/common/AppButton";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { AppAssets } from "@/constants/app_assets";
import { SectionIds, toSectionHref } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";
import { getAssetUrl } from "@/lib/storage";

const { logo } = AppAssets.branding;

/** Phase 1 placeholder — the full screenshot-matched hero is built in Phase 2. */
export default function HeroSection() {
  const { hero, brand } = AppStrings;

  return (
    <section id={SectionIds.home} className="bg-ink py-16 text-white sm:py-24">
      <Container className="flex flex-col gap-8">
        <Image
          src={getAssetUrl(logo)}
          alt={brand.name}
          width={logo.width}
          height={logo.height}
          priority
          className="h-auto w-48"
        />
        <SectionTitle
          as="h1"
          eyebrow={hero.eyebrow}
          description={hero.description}
          title={
            <>
              {hero.titlePrimary} <span className="text-brand">{hero.titleAccent}</span>
            </>
          }
        />
        <AppButton href={toSectionHref(SectionIds.waitlist)} size="lg" className="self-start">
          {hero.waitlistButton}
        </AppButton>
      </Container>
    </section>
  );
}
