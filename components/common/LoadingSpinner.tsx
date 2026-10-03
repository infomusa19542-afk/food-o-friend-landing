import { AppStrings } from "@/constants/app_strings";
import { cn } from "@/utils/classnames";

type SpinnerSize = "sm" | "md";

const SIZES: Record<SpinnerSize, string> = {
  sm: "size-4",
  md: "size-5",
};

interface LoadingSpinnerProps {
  /** Announced to screen readers. Pass `null` when visible text already describes the state. */
  label?: string | null;
  size?: SpinnerSize;
  className?: string;
}

export default function LoadingSpinner({
  label = AppStrings.common.loading,
  size = "md",
  className,
}: LoadingSpinnerProps) {
  const spinner = (
    <span
      aria-hidden="true"
      className={cn("animate-spin rounded-full border-2 border-current border-t-transparent", SIZES[size])}
    />
  );

  if (label === null) return <span className={cn("inline-flex items-center", className)}>{spinner}</span>;

  return (
    <span role="status" className={cn("inline-flex items-center", className)}>
      {spinner}
      <span className="sr-only">{label}</span>
    </span>
  );
}
