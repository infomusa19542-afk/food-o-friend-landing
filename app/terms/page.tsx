import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { AppRoutes } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";
import { buildPageMetadata } from "@/lib/metadata";

const { terms } = AppStrings.legal;

export const metadata: Metadata = buildPageMetadata({ ...terms.metadata, path: AppRoutes.terms });

export default function TermsPage() {
  return <LegalDocument copy={terms} />;
}
