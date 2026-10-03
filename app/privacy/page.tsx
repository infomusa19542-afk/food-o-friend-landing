import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { AppRoutes } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";
import { buildPageMetadata } from "@/lib/metadata";

const { privacy } = AppStrings.legal;

export const metadata: Metadata = buildPageMetadata({ ...privacy.metadata, path: AppRoutes.privacy });

export default function PrivacyPage() {
  return <LegalDocument copy={privacy} />;
}
