import type { Metadata } from "next";
import Container from "@/components/common/Container";
import FormCard from "@/components/common/FormCard";
import Icon from "@/components/common/Icon";
import PageHero from "@/components/common/PageHero";
import RegistrationForm from "@/components/registration/RegistrationForm";
import { PageSectionIds } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";

const { registration } = AppStrings;

export const metadata: Metadata = registration.metadata;

export default function RegisterPage() {
  const { hero, aside } = registration;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <section id={PageSectionIds.registrationForm} className="bg-cream text-text-dark">
        <Container className="section-y grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:items-start lg:gap-12">
          <aside className="flex flex-col gap-4 lg:sticky lg:top-8">
            <h2 className="text-xl font-bold">{aside.title}</h2>
            <ul className="flex flex-col gap-3">
              {aside.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-text-soft">
                  <Icon name="check" className="mt-0.5 size-5 text-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
          <FormCard>
            <RegistrationForm />
          </FormCard>
        </Container>
      </section>
    </>
  );
}
