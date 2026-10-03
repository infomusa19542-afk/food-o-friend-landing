import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/classnames";

interface AppInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string;
  label: string;
  error?: string;
  /** Visually hide the label while keeping it available to screen readers. */
  hideLabel?: boolean;
  containerClassName?: string;
}

export default function AppInput({
  id,
  label,
  error,
  hideLabel = false,
  className,
  containerClassName,
  ...inputProps
}: AppInputProps) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
      <label htmlFor={id} className={cn("text-sm font-medium", hideLabel && "sr-only")}>
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "min-h-11 w-full rounded-full border bg-white px-5 py-3 text-base text-text-dark placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          error ? "border-red-500" : "border-transparent",
          className,
        )}
        {...inputProps}
      />
      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
