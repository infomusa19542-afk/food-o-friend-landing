import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { AppStrings } from "@/constants/app_strings";

const { terms } = AppStrings.legal;

export const metadata: Metadata = terms.metadata;

export default function TermsPage() {
  return <LegalDocument copy={terms} />;
}
