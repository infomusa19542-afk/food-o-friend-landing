"use client";

import { useWaitlistCount } from "@/components/common/WaitlistCountProvider";
import { formatWaitlistCount, type WaitlistCountCopy } from "@/utils/formatters";

interface WaitlistCountLabelProps {
  copy: WaitlistCountCopy;
}

export default function WaitlistCountLabel({ copy }: WaitlistCountLabelProps) {
  const { count } = useWaitlistCount();
  const display = formatWaitlistCount(count, copy);

  return (
    <p aria-live="polite" className="max-w-[14rem] text-sm leading-snug text-white/85">
      {display.count && <span className="font-semibold text-white tabular-nums">{display.count}</span>}{" "}
      {display.label}
    </p>
  );
}
