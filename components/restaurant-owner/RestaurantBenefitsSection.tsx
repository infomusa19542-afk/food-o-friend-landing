import Container from "@/components/common/Container";
import Icon, { type IconName } from "@/components/common/Icon";
import SectionTitle from "@/components/common/SectionTitle";
import { AppStrings } from "@/constants/app_strings";

const BENEFIT_ICONS: readonly IconName[] = ["users", "search", "calendar", "compass", "repeat", "mapPin"];

export default function RestaurantBenefitsSection() {
  const { benefits } = AppStrings.restaurantOwner;

  return (
    <section className="bg-charcoal text-white">
      <Container className="section-y flex flex-col gap-10">
        <SectionTitle eyebrow={benefits.eyebrow} title={benefits.title} className="max-w-2xl" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.items.map((benefit, index) => (
            <li key={benefit.title} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <Icon name={BENEFIT_ICONS[index % BENEFIT_ICONS.length]} className="size-8 text-brand" strokeWidth={1.75} />
              <h3 className="text-lg font-bold">{benefit.title}</h3>
              <p className="leading-relaxed text-white/75">{benefit.description}</p>
            </li>
          ))}
        </ul>
        <p className="max-w-2xl text-sm text-white/70">{benefits.disclaimer}</p>
      </Container>
    </section>
  );
}
