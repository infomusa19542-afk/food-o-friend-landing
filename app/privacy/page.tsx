import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { AppStrings } from "@/constants/app_strings";

const { privacy } = AppStrings.legal;

export const metadata: Metadata = privacy.metadata;

export default function PrivacyPage() {
  return <LegalDocument copy={privacy} />;
}
