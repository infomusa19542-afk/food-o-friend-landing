import { ImageResponse } from "next/og";
import BrandMark from "@/components/brand/BrandMark";
import { AppColors } from "@/constants/app_colors";
import { AppStrings } from "@/constants/app_strings";

export const alt = AppStrings.metadata.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const { brand, hero, metadata } = AppStrings;

/** Branded social preview shared by every page. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: AppColors.ink,
          color: AppColors.white,
          borderBottom: `16px solid ${AppColors.brand}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <BrandMark size={72} background={AppColors.charcoal} />
          <div style={{ fontSize: 40, fontWeight: 700 }}>{brand.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 48, fontSize: 88, fontWeight: 800, lineHeight: 1 }}>
          <span>{hero.titlePrimary}</span>
          <span style={{ color: AppColors.brand }}>{hero.titleAccent}</span>
        </div>
        <div style={{ marginTop: 36, fontSize: 30, color: "#d4d4d4", maxWidth: 900, lineHeight: 1.35 }}>
          {metadata.description}
        </div>
      </div>
    ),
    size,
  );
}
