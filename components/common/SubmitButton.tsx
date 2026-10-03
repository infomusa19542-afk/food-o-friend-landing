import AppButton from "@/components/common/AppButton";
import Icon from "@/components/common/Icon";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { AppStrings } from "@/constants/app_strings";

interface SubmitButtonProps {
  isPending: boolean;
  children: string;
  pendingLabel?: string;
  variant?: "primary" | "dark";
  shape?: "pill" | "rounded";
  size?: "md" | "lg";
  className?: string;
}

/** Submit button with a disabled loading state shared by every form. */
export default function SubmitButton({
  isPending,
  children,
  pendingLabel = AppStrings.forms.sending,
  variant = "primary",
  shape = "rounded",
  size = "md",
  className,
}: SubmitButtonProps) {
  return (
    <AppButton type="submit" variant={variant} shape={shape} size={size} disabled={isPending} className={className}>
      {isPending ? (
        <>
          <LoadingSpinner label={null} size="sm" />
          {pendingLabel}
        </>
      ) : (
        <>
          {children}
          <Icon name="arrowRight" className="size-4" />
        </>
      )}
    </AppButton>
  );
}
