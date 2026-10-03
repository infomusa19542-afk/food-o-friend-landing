import JsonLd from "@/components/seo/JsonLd";
import { AppAssets } from "@/constants/app_assets";
import { AppStrings } from "@/constants/app_strings";
import { siteUrl } from "@/lib/site";
import { getAssetUrl } from "@/lib/storage";

/** Basic, factual WebSite + Organization data — no ratings, addresses or registrations. */
export default function HomeStructuredData() {
  const url = siteUrl.toString();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            name: AppStrings.brand.name,
            url,
            description: AppStrings.metadata.description,
          },
          {
            "@type": "Organization",
            name: AppStrings.brand.name,
            url,
            logo: getAssetUrl(AppAssets.branding.logo),
          },
        ],
      }}
    />
  );
}
