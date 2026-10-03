import Image from "next/image";
import Link from "next/link";
import { AppAssets } from "@/constants/app_assets";
import { AppRoutes } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";
import { getAssetUrl } from "@/lib/storage";
import { cn } from "@/utils/classnames";

const { logo } = AppAssets.branding;

interface BrandLogoProps {
  className?: string;
  /** Only for the above-the-fold header logo. */
  priority?: boolean;
}

export default function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Link
      href={AppRoutes.home}
      className={cn(
        "inline-flex shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
        className,
      )}
    >
      <Image
        src={getAssetUrl(logo)}
        alt={AppStrings.brand.name}
        width={logo.width}
        height={logo.height}
        priority={priority}
        sizes="220px"
        className="h-auto w-full"
      />
    </Link>
  );
}
