import type { Metadata } from "next";
import AppButton from "@/components/common/AppButton";
import PageHero from "@/components/common/PageHero";
import { AppRoutes } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";

const { notFound } = AppStrings;

export const metadata: Metadata = { title: notFound.metadataTitle, robots: { index: false } };

export default function NotFound() {
  return (
    <PageHero eyebrow={notFound.eyebrow} title={notFound.title} description={notFound.description}>
      <AppButton href={AppRoutes.home} size="lg" shape="rounded" className="self-start">
        {notFound.action}
      </AppButton>
    </PageHero>
  );
}
