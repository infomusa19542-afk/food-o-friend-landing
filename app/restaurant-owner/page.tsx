import type { Metadata } from "next";
import AppButton from "@/components/common/AppButton";
import Container from "@/components/common/Container";
import FormCard from "@/components/common/FormCard";
import PageHero from "@/components/common/PageHero";
import SectionTitle from "@/components/common/SectionTitle";
import RestaurantBenefitsSection from "@/components/restaurant-owner/RestaurantBenefitsSection";
import RestaurantOwnerForm from "@/components/restaurant-owner/RestaurantOwnerForm";
import RestaurantPitchSection from "@/components/restaurant-owner/RestaurantPitchSection";
import { AppAssets } from "@/constants/app_assets";
import { PageSectionIds } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";

const { restaurantOwner } = AppStrings;

export const metadata: Metadata = restaurantOwner.metadata;

export default function RestaurantOwnerPage() {
  const { hero, form } = restaurantOwner;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        description={hero.description}
        image={{ asset: AppAssets.hero.background, alt: hero.imageAlt }}
        title={
          <>
            <span className="block">{hero.title}</span>
            <span className="block text-brand">{hero.titleAccent}</span>
          </>
        }
      >
        <AppButton href={`#${PageSectionIds.restaurantForm}`} size="lg" shape="rounded" className="self-start">
          {hero.cta}
        </AppButton>
      </PageHero>
      <RestaurantPitchSection />
      <RestaurantBenefitsSection />
      <section id={PageSectionIds.restaurantForm} className="bg-cream text-text-dark">
        <Container className="section-y flex flex-col gap-10">
          <SectionTitle
            eyebrow={form.eyebrow}
            title={form.title}
            description={form.description}
            tone="light"
            align="center"
            className="mx-auto max-w-2xl"
          />
          <FormCard className="mx-auto max-w-4xl">
            <RestaurantOwnerForm />
          </FormCard>
        </Container>
      </section>
    </>
  );
}
