import Image from "next/image";
import WaitlistCountLabel from "@/components/home/WaitlistCountLabel";
import { AppAssets } from "@/constants/app_assets";
import { getAssetUrl } from "@/lib/storage";
import type { WaitlistCountCopy } from "@/utils/formatters";

interface SocialProofProps {
  copy: WaitlistCountCopy;
}

export default function SocialProof({ copy }: SocialProofProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex shrink-0 -space-x-3">
        {AppAssets.avatars.map((avatar) => (
          <Image
            key={avatar.path}
            src={getAssetUrl(avatar)}
            alt=""
            width={avatar.width}
            height={avatar.height}
            sizes="44px"
            className="size-10 rounded-full object-cover ring-2 ring-ink sm:size-11"
          />
        ))}
      </div>
      <WaitlistCountLabel copy={copy} />
    </div>
  );
}
