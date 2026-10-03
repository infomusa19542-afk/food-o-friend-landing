import Container from "@/components/common/Container";
import IconCircle from "@/components/common/IconCircle";
import type { IconName } from "@/components/common/Icon";
import { AppStrings } from "@/constants/app_strings";

type FeatureKey = keyof typeof AppStrings.features;

const FEATURE_ICONS: Record<FeatureKey, IconName> = {
  people: "users",
  meals: "utensils",
  city: "compass",
  connections: "heart",
};

const FEATURE_KEYS = Object.keys(FEATURE_ICONS) as FeatureKey[];

export default function FeatureStrip() {
  return (
    <div className="bg-cream text-text-dark">
      <Container as="ul" className="grid grid-cols-1 gap-x-6 gap-y-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:py-10">
        {FEATURE_KEYS.map((key) => {
          const feature = AppStrings.features[key];
          return (
            <li
              key={key}
              className="flex items-center gap-4 lg:border-l lg:border-black/10 lg:px-6 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              <IconCircle name={FEATURE_ICONS[key]} size="lg" />
              <div className="min-w-0">
                <p className="font-semibold leading-snug">{feature.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-text-soft">{feature.description}</p>
              </div>
            </li>
          );
        })}
      </Container>
    </div>
  );
}
