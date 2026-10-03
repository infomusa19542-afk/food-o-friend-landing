"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import { joinWaitlistAction } from "@/actions/waitlist.action";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import Icon from "@/components/common/Icon";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useWaitlistCount } from "@/components/common/WaitlistCountProvider";
import { AppConfig } from "@/constants/app_config";
import { AppStrings } from "@/constants/app_strings";
import type { ActionStatus } from "@/types";
import { cn } from "@/utils/classnames";
import { validateEmail } from "@/utils/validators";

type WaitlistFormVariant = "hero" | "cta";

const VARIANTS: Record<
  WaitlistFormVariant,
  { wrapper: string; button: "primary" | "dark"; success: string; error: string }
> = {
  hero: { wrapper: "ring-2 ring-brand", button: "primary", success: "text-white", error: "text-red-300" },
  cta: { wrapper: "shadow-lg shadow-black/10", button: "dark", success: "text-white", error: "text-ink" },
};

interface Feedback {
  status: ActionStatus;
  message: string;
}

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
  const { forms } = AppStrings;
  const styles = VARIANTS[variant];
  const messageId = `${id}-message`;

  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isPending, startTransition] = useTransition();
  const inFlight = useRef(false);
  const { setCount } = useWaitlistCount();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;

    const emailError = validateEmail(email);
    if (emailError) {
      setFeedback({ status: "invalid", message: emailError });
      return;
    }

    const honeypot = new FormData(event.currentTarget).get(AppConfig.waitlist.honeypotField);
    inFlight.current = true;
    setFeedback(null);

    startTransition(async () => {
      try {
        const result = await joinWaitlistAction({ email, website: honeypot });
        setFeedback({ status: result.status, message: result.message });
        if (result.status === "success") {
          setEmail("");
          if (typeof result.data?.count === "number") setCount(result.data.count);
        }
      } catch {
        setFeedback({ status: "error", message: AppStrings.errors.network });
      } finally {
        inFlight.current = false;
      }
    });
  };

  const isError = feedback !== null && feedback.status !== "success";

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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={isError && feedback.status === "invalid" ? true : undefined}
            aria-describedby={feedback ? messageId : undefined}
          />
        </div>
        <AppButton
          type="submit"
          variant={styles.button}
          shape="rounded"
          disabled={isPending}
          className="w-full px-5 sm:w-auto sm:min-w-[9.5rem]"
        >
          {isPending ? (
            <>
              <LoadingSpinner label={null} size="sm" />
              {forms.submitting}
            </>
          ) : (
            <>
              {buttonText}
              <Icon name="arrowRight" className="size-4" />
            </>
          )}
        </AppButton>
      </div>

      {/* Spam trap: hidden from people and assistive tech, still visible to naive bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-${AppConfig.waitlist.honeypotField}`}>{forms.honeypotLabel}</label>
        <input
          id={`${id}-${AppConfig.waitlist.honeypotField}`}
          name={AppConfig.waitlist.honeypotField}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <p
        id={messageId}
        role="status"
        aria-live="polite"
        className={cn(
          "flex min-h-5 items-start gap-1.5 text-sm font-medium break-words",
          isError ? styles.error : styles.success,
        )}
      >
        {feedback && (
          <>
            <Icon name={isError ? "alertCircle" : "check"} className="mt-0.5 size-4" />
            <span className="min-w-0">{feedback.message}</span>
          </>
        )}
      </p>
    </form>
  );
}
