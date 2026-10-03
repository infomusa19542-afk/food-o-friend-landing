import Image from "next/image";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import WaitlistForm from "@/components/common/WaitlistForm";
import SocialProof from "@/components/home/SocialProof";
import { AppAssets } from "@/constants/app_assets";
import { SectionIds } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";
import { getAssetUrl } from "@/lib/storage";
import type { HeroContent, SocialProofContent } from "@/models/site-content.model";

const { background, handwritten } = AppAssets.hero;

interface HeroSectionProps {
  content: HeroContent;
  socialProof: SocialProofContent;
  waitlistCount: string;
}

export default function HeroSection({ content, socialProof, waitlistCount }: HeroSectionProps) {
  return (
    <section id={SectionIds.home} className="relative isolate overflow-hidden bg-ink">
      {/* Banner on mobile so text never sits on faces; full-bleed background from lg. */}
      <div className="relative h-[clamp(18rem,72vw,32rem)] lg:absolute lg:inset-0 lg:-z-10 lg:h-auto">
        <Image
          src={getAssetUrl(background)}
          alt={AppStrings.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] lg:object-[center_30%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-ink/70 via-transparent to-ink lg:bg-linear-to-r lg:from-ink lg:via-ink/60 lg:via-40% lg:to-transparent lg:to-75%"
        />
        <Image
          src={getAssetUrl(handwritten)}
          alt=""
          width={handwritten.width}
          height={handwritten.height}
          sizes="220px"
          className="absolute top-[22%] right-[5%] hidden w-[clamp(7rem,11vw,10rem)] sm:block lg:top-[18%] lg:right-[22%] xl:top-[8%] xl:right-[24%]"
        />
      </div>

      <Container className="relative -mt-12 pb-12 sm:-mt-20 lg:mt-0 lg:flex lg:min-h-[clamp(30rem,36vw,44rem)] lg:items-center lg:pt-24 lg:pb-12">
        <div className="flex max-w-[40rem] flex-col gap-6">
          <SectionTitle
            as="h1"
            eyebrow={content.eyebrow}
            eyebrowClassName="text-white"
            description={content.description}
            titleClassName="text-display font-extrabold"
            title={
              <>
                <span className="block">{content.titlePrimary}</span>
                <span className="block text-brand">{content.titleAccent}</span>
              </>
            }
          />
          <WaitlistForm id="hero-waitlist-email" buttonText={content.waitlistButton} className="max-w-[30rem]" />
          <SocialProof count={waitlistCount} text={socialProof.text} />
        </div>
      </Container>
    </section>
  );
}
