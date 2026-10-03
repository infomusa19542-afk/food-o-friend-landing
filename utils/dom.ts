import { AppConfig } from "@/constants/app_config";

/** Focuses the bottom waitlist email field without fighting the in-page scroll. */
export const focusWaitlistInput = (): void => {
  document.getElementById(AppConfig.waitlist.inputIds.cta)?.focus({ preventScroll: true });
};
