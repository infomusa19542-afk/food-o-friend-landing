import type { Metadata, Viewport } from "next";
import { Caveat, Outfit } from "next/font/google";
import { AppColors } from "@/constants/app_colors";
import { AppStrings } from "@/constants/app_strings";
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
  title: AppStrings.metadata.title,
  description: AppStrings.metadata.description,
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
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
