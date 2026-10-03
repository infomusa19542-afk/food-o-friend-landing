import Image from "next/image";
import type { IconName } from "@/components/common/Icon";
import Icon from "@/components/common/Icon";
import SectionTitle from "@/components/common/SectionTitle";
import { AppAssets } from "@/constants/app_assets";
import { SectionIds } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";
import { getAssetUrl } from "@/lib/storage";
import type { SafetyContent } from "@/models/site-content.model";

const SAFETY_ICONS: readonly IconName[] = ["shieldCheck", "users", "lock", "flag"];
const { background, handwritten } = AppAssets.safety;

interface SafetySectionProps {
  content: SafetyContent;
}

export default function SafetySection({ content }: SafetySectionProps) {
  return (
    <section id={SectionIds.safety} className="grid bg-ink text-white lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="relative min-h-[clamp(15rem,60vw,26rem)] lg:min-h-full">
        <Image
          src={getAssetUrl(background)}
          alt={AppStrings.safety.imageAlt}
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-ink lg:bg-linear-to-r lg:via-60%"
        />
        <Image
          src={getAssetUrl(handwritten)}
          alt=""
          width={handwritten.width}
          height={handwritten.height}
          sizes="(min-width: 1024px) 192px, 20vw"
          className="absolute top-[8%] right-[6%] w-[clamp(7.5rem,20vw,12rem)]"
        />
      </div>

      <div className="section-y px-4 sm:px-6 lg:px-10 xl:pr-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        <SectionTitle eyebrow={content.eyebrow} title={content.title} />
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {content.items.map((item, index) => (
            <li key={item} className="flex items-start gap-3">
              <Icon name={SAFETY_ICONS[index % SAFETY_ICONS.length]} className="size-7" strokeWidth={1.75} />
              <p className="text-sm leading-snug text-white/80">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
