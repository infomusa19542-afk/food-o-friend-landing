import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import Icon from "@/components/common/Icon";
import { AppStrings } from "@/constants/app_strings";
import { cn } from "@/utils/classnames";

type WaitlistFormVariant = "hero" | "cta";

const VARIANTS: Record<WaitlistFormVariant, { wrapper: string; button: "primary" | "dark" }> = {
  hero: { wrapper: "ring-2 ring-brand", button: "primary" },
  cta: { wrapper: "shadow-lg shadow-black/10", button: "dark" },
};

interface WaitlistFormProps {
  /** Unique input id — the form appears more than once per page. */
  id: string;
  buttonText: string;
  variant?: WaitlistFormVariant;
  className?: string;
}

/**
 * Visual waitlist form shared by the hero and the bottom CTA.
 * Phase 2 is UI only: submission is wired to `waitlist.controller` in Phase 3.
 */
export default function WaitlistForm({ id, buttonText, variant = "hero", className }: WaitlistFormProps) {
  const { forms } = AppStrings;
  const styles = VARIANTS[variant];

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 rounded-xl bg-white p-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white sm:flex-row sm:items-center sm:gap-3 sm:p-1.5 sm:pl-5",
        styles.wrapper,
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:px-0">
        <Icon name="mail" className="size-5 text-text-dark/70" />
        <AppInput
          id={id}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          label={forms.emailLabel}
          placeholder={forms.emailPlaceholder}
          hideLabel
          appearance="bare"
        />
      </div>
      <AppButton variant={styles.button} shape="rounded" className="w-full px-5 sm:w-auto">
        {buttonText}
        <Icon name="arrowRight" className="size-4" />
      </AppButton>
    </div>
  );
}
