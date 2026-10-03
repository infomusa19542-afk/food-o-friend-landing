import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/classnames";

type InputAppearance = "default" | "bare";

const APPEARANCE: Record<InputAppearance, string> = {
  default:
    "min-h-11 rounded-full border bg-white px-5 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
  // For inputs embedded in a styled wrapper that owns the border and focus ring.
  bare: "min-h-11 border-0 bg-transparent px-0 py-2 focus-visible:outline-none",
};

interface AppInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string;
  label: string;
  error?: string;
  /** Visually hide the label while keeping it available to screen readers. */
  hideLabel?: boolean;
  appearance?: InputAppearance;
  containerClassName?: string;
}

export default function AppInput({
  id,
  label,
  error,
  hideLabel = false,
  appearance = "default",
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
          "w-full min-w-0 text-base text-text-dark placeholder:text-muted",
          APPEARANCE[appearance],
          appearance === "default" && (error ? "border-red-500" : "border-transparent"),
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
