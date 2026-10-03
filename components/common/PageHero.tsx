import Image from "next/image";
import type { ReactNode } from "react";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { getAssetUrl } from "@/lib/storage";
import type { StorageAsset } from "@/types";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  /** Optional background photo, darkened for legibility. */
  image?: { asset: StorageAsset; alt: string };
  children?: ReactNode;
}

/** Dark intro band for standalone pages; leaves room for the overlaid header. */
export default function PageHero({ eyebrow, title, description, image, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {image && (
        <>
          <Image
            src={getAssetUrl(image.asset)}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-[70%_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-ink/75 md:bg-transparent md:bg-linear-to-r md:from-ink md:via-ink/85 md:to-ink/30"
          />
        </>
      )}
      <Container className="pt-32 pb-14 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20">
        <div className="flex max-w-3xl flex-col gap-7">
          <SectionTitle
            as="h1"
            eyebrow={eyebrow}
            title={title}
            description={description}
            titleClassName="text-page-title font-extrabold"
          />
          {children}
        </div>
      </Container>
    </section>
  );
}
