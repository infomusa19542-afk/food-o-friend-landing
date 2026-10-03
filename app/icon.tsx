import { ImageResponse } from "next/og";
import BrandMark from "@/components/brand/BrandMark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<BrandMark size={size.width} />, size);
}
