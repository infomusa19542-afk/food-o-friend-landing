"use client";

import Link from "next/link";
import { joinWaitlistAction } from "@/actions/waitlist.action";
import AppInput from "@/components/common/AppInput";
import FormStatusMessage from "@/components/common/FormStatusMessage";
import HoneypotField from "@/components/common/HoneypotField";
import Icon from "@/components/common/Icon";
import SubmitButton from "@/components/common/SubmitButton";
import { useWaitlistCount } from "@/components/common/WaitlistCountProvider";
import { AppRoutes } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";
import { useServerForm } from "@/hooks/useServerForm";
import { cn } from "@/utils/classnames";
import { toFieldErrors, validateWaitlistInput } from "@/utils/validators";

type WaitlistFormVariant = "hero" | "cta";

const VARIANTS: Record<
  WaitlistFormVariant,
  { wrapper: string; button: "primary" | "dark"; tones: { success: string; error: string } }
> = {
  hero: { wrapper: "ring-2 ring-brand", button: "primary", tones: { success: "text-white", error: "text-red-300" } },
  cta: { wrapper: "shadow-lg shadow-black/10", button: "dark", tones: { success: "text-white", error: "text-ink" } },
};

interface WaitlistFormProps {
  /** Unique input id — the form appears more than once per page. */
  id: string;
  buttonText: string;
  variant?: WaitlistFormVariant;
  className?: string;
}

/**
 * Waitlist form shared by the hero and the bottom CTA.
 * Validates for fast feedback, then submits through the Server Action → controller → service.
 */
export default function WaitlistForm({ id, buttonText, variant = "hero", className }: WaitlistFormProps) {
  const { forms, waitlist } = AppStrings;
  const styles = VARIANTS[variant];
  const messageId = `${id}-message`;
  const { setCount } = useWaitlistCount();

  const { values, setValue, fieldErrors, feedback, isPending, handleSubmit } = useServerForm({
    initialValues: { email: "" },
    validate: (formValues) => toFieldErrors(validateWaitlistInput(formValues)),
    submit: joinWaitlistAction,
    onSuccess: (result) => {
      if (typeof result.data?.count === "number") setCount(result.data.count);
    },
  });

  return (
    <form noValidate onSubmit={handleSubmit} className={cn("flex w-full flex-col gap-2", className)}>
      <div
        className={cn(
          "flex w-full flex-col gap-2 rounded-xl bg-white p-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white sm:flex-row sm:items-center sm:gap-3 sm:p-1.5 sm:pl-5",
          styles.wrapper,
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
            required
            label={forms.emailLabel}
            placeholder={forms.emailPlaceholder}
            hideLabel
            appearance="bare"
            value={values.email}
            onChange={(event) => setValue("email", event.target.value)}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={feedback ? messageId : undefined}
          />
        </div>
        <SubmitButton
          isPending={isPending}
          pendingLabel={forms.submitting}
          variant={styles.button}
          className="w-full px-5 sm:w-auto sm:min-w-[9.5rem]"
        >
          {buttonText}
        </SubmitButton>
      </div>

      <HoneypotField idPrefix={id} />

      <FormStatusMessage
        id={messageId}
        feedback={feedback}
        tones={styles.tones}
        successExtra={
          <>
            {" "}
            <Link
              href={AppRoutes.register}
              className="underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-current"
            >
              {waitlist.registerPrompt}
            </Link>
          </>
        }
      />
    </form>
  );
}
