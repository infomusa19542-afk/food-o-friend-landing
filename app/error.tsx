"use client";

import AppButton from "@/components/common/AppButton";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { AppRoutes } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";

const { errorPage } = AppStrings;

/** Friendly fallback for unexpected render errors. Never shows error details to visitors. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="bg-ink text-white">
      <Container className="flex flex-col gap-7 pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-20">
        <SectionTitle
          as="h1"
          eyebrow={errorPage.eyebrow}
          title={errorPage.title}
          description={errorPage.description}
          titleClassName="text-page-title font-extrabold"
          className="max-w-3xl"
        />
        <div className="flex flex-col gap-3 min-[420px]:flex-row">
          <AppButton size="lg" shape="rounded" onClick={reset}>
            {errorPage.retry}
          </AppButton>
          <AppButton href={AppRoutes.home} variant="outlineLight" size="lg" shape="rounded">
            {errorPage.home}
          </AppButton>
        </div>
      </Container>
    </section>
  );
}
