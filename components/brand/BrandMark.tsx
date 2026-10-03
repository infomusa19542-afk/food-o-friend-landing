import { AppColors } from "@/constants/app_colors";

/** Simplified chef-hat mark (SVG markup) for generated icons and social images. */
export const brandMarkSvg = (size: number, background: string = AppColors.ink): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">` +
  `<rect width="64" height="64" rx="14" fill="${background}"/>` +
  `<g fill="${AppColors.brand}">` +
  `<circle cx="21" cy="27" r="11"/><circle cx="32" cy="21" r="13"/><circle cx="43" cy="27" r="11"/>` +
  `<rect x="19" y="27" width="26" height="14"/><rect x="18" y="44" width="28" height="7" rx="2"/>` +
  `</g></svg>`;

export const brandMarkDataUri = (size: number, background?: string): string =>
  `data:image/svg+xml;base64,${Buffer.from(brandMarkSvg(size, background)).toString("base64")}`;

/** Renders the mark as an <img> inside `next/og` ImageResponse markup. */
export default function BrandMark({ size, background }: { size: number; background?: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser
  return <img src={brandMarkDataUri(size, background)} width={size} height={size} alt="" />;
}
