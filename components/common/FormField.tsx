import type { ReactNode } from "react";
import { AppStrings } from "@/constants/app_strings";
import { cn } from "@/utils/classnames";

/** Shared look for text-like controls (input, select, textarea) on light form cards. */
export const fieldControlClasses = (hasError: boolean) =>
  cn(
    "min-h-12 w-full min-w-0 rounded-xl border bg-white px-4 py-3 text-base text-text-dark placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand",
    hasError ? "border-red-600" : "border-black/15",
  );

export const fieldHintId = (id: string) => `${id}-hint`;
export const fieldErrorId = (id: string) => `${id}-error`;

/** aria attributes linking a control to its hint and error text. */
export const fieldAria = (id: string, { hint, error }: { hint?: string; error?: string }) => {
  const describedBy = [hint && fieldHintId(id), error && fieldErrorId(id)].filter(Boolean).join(" ");
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy || undefined,
  } as const;
};

interface FieldMessagesProps {
  id: string;
  hint?: string;
  error?: string;
}

export function FieldMessages({ id, hint, error }: FieldMessagesProps) {
  return (
    <>
      {hint && (
        <p id={fieldHintId(id)} className="text-sm text-text-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={fieldErrorId(id)} className="text-sm font-medium break-words text-red-600">
          {error}
        </p>
      )}
    </>
  );
}

interface FieldLabelProps {
  children: ReactNode;
  optional?: boolean;
  hidden?: boolean;
}

export function FieldLabelText({ children, optional = false, hidden = false }: FieldLabelProps) {
  return (
    <span className={cn("text-sm font-semibold", hidden && "sr-only")}>
      {children}
      {optional && <span className="font-normal text-text-soft"> {AppStrings.forms.optional}</span>}
    </span>
  );
}

interface FormFieldProps extends FieldMessagesProps {
  label: string;
  optional?: boolean;
  hideLabel?: boolean;
  className?: string;
  children: ReactNode;
}

/** Label + control + hint/error, shared by AppInput, AppSelect and AppTextarea. */
export default function FormField({
  id,
  label,
  optional,
  hideLabel,
  hint,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex w-full min-w-0 flex-col gap-1.5", className)}>
      <label htmlFor={id}>
        <FieldLabelText optional={optional} hidden={hideLabel}>
          {label}
        </FieldLabelText>
      </label>
      {children}
      <FieldMessages id={id} hint={hint} error={error} />
    </div>
  );
}
