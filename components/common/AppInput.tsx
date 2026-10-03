import type { InputHTMLAttributes } from "react";
import FormField, { fieldAria, fieldControlClasses } from "@/components/common/FormField";
import { cn } from "@/utils/classnames";

type InputAppearance = "default" | "bare";

interface AppInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  /** Shows "(optional)" after the label. */
  optional?: boolean;
  /** Visually hide the label while keeping it available to screen readers. */
  hideLabel?: boolean;
  /** `bare` is for inputs embedded in a wrapper that owns the border and focus ring. */
  appearance?: InputAppearance;
  containerClassName?: string;
}

export default function AppInput({
  id,
  label,
  error,
  hint,
  optional,
  hideLabel,
  appearance = "default",
  className,
  containerClassName,
  ...inputProps
}: AppInputProps) {
  return (
    <FormField
      id={id}
      label={label}
      optional={optional}
      hideLabel={hideLabel}
      hint={hint}
      error={error}
      className={containerClassName}
    >
      <input
        id={id}
        {...fieldAria(id, { hint, error })}
        className={cn(
          appearance === "bare"
            ? "min-h-11 w-full min-w-0 border-0 bg-transparent px-0 py-2 text-base text-text-dark placeholder:text-muted focus-visible:outline-none"
            : fieldControlClasses(Boolean(error)),
          className,
        )}
        {...inputProps}
      />
    </FormField>
  );
}
