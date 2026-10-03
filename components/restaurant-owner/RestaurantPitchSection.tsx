import Container from "@/components/common/Container";
import type { IconName } from "@/components/common/Icon";
import IconCircle from "@/components/common/IconCircle";
import SectionTitle from "@/components/common/SectionTitle";
import { AppStrings } from "@/constants/app_strings";

const MATCH_ICONS: readonly IconName[] = ["utensils", "heart", "users", "mapPin", "compass"];

export default function RestaurantPitchSection() {
  const { pitch } = AppStrings.restaurantOwner;

  return (
    <section className="bg-cream text-text-dark">
      <Container className="section-y grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <SectionTitle eyebrow={pitch.eyebrow} title={pitch.title} description={pitch.description} tone="light" />
        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-black/5 ring-1 ring-black/5 sm:p-8">
          <p className="text-eyebrow text-brand">{pitch.matchLabel}</p>
          <ul className="mt-5 grid gap-3 min-[420px]:grid-cols-2">
            {pitch.matches.map((match, index) => (
              <li key={match} className="flex items-center gap-3 font-semibold">
                <IconCircle name={MATCH_ICONS[index % MATCH_ICONS.length]} />
                {match}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
