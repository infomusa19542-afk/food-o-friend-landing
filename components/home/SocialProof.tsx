import Image from "next/image";
import { AppAssets } from "@/constants/app_assets";
import { getAssetUrl } from "@/lib/storage";

interface SocialProofProps {
  count: string;
  text: string;
}

export default function SocialProof({ count, text }: SocialProofProps) {
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
      <p className="max-w-[14rem] text-sm leading-snug text-white/85">
        <span className="font-semibold text-white">{count}</span> {text}
      </p>
    </div>
  );
}
