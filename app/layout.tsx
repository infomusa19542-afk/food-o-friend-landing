import type { Metadata, Viewport } from "next";
import { Caveat, Outfit } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { AppColors } from "@/constants/app_colors";
import { AppStrings } from "@/constants/app_strings";
import { OPEN_GRAPH_DEFAULTS, rootMetadataDefaults } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

// Handwritten accents only.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: rootMetadataDefaults.title, template: `%s | ${AppStrings.brand.name}` },
  description: rootMetadataDefaults.description,
  applicationName: AppStrings.brand.name,
  alternates: { canonical: "/" },
  openGraph: { ...OPEN_GRAPH_DEFAULTS, ...rootMetadataDefaults, url: "/" },
  twitter: { card: "summary_large_image", ...rootMetadataDefaults },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: AppColors.ink,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only rounded-lg bg-white px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:outline-2 focus:outline-brand"
        >
          {AppStrings.accessibility.skipToContent}
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
