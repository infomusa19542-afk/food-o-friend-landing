"use client";

import AppButton, { type AppButtonProps } from "@/components/common/AppButton";
import { WaitlistHref } from "@/constants/app_navigation";
import { focusWaitlistInput } from "@/utils/dom";

type WaitlistLinkButtonProps = Omit<Extract<AppButtonProps, { href: string }>, "href">;

/** Jumps to the waitlist section and focuses its email field. */
export default function WaitlistLinkButton({ onClick, ...props }: WaitlistLinkButtonProps) {
  return (
    <AppButton
      {...props}
      href={WaitlistHref}
      onClick={() => {
        onClick?.();
        focusWaitlistInput();
      }}
    />
  );
}
