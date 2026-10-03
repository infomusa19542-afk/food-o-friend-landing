import type { ReactNode } from "react";
import Icon from "@/components/common/Icon";
import type { FormFeedback } from "@/hooks/useServerForm";
import { cn } from "@/utils/classnames";

interface FormStatusMessageProps {
  id: string;
  feedback: FormFeedback | null;
  /** Text color classes for each outcome, chosen for the surrounding background. */
  tones: { success: string; error: string };
  className?: string;
  /** Extra content shown after a success message (e.g. a follow-up link). */
  successExtra?: ReactNode;
}

/** Live region that announces form outcomes. Always rendered so updates are announced. */
export default function FormStatusMessage({ id, feedback, tones, className, successExtra }: FormStatusMessageProps) {
  const isError = feedback !== null && feedback.status !== "success";

  return (
    <div
      id={id}
      role="status"
      aria-live="polite"
      className={cn("min-h-5 text-sm font-medium break-words", isError ? tones.error : tones.success, className)}
    >
      {feedback && (
        <p className="flex items-start gap-1.5">
          <Icon name={isError ? "alertCircle" : "check"} className="mt-0.5 size-4" />
          <span className="min-w-0">
            {feedback.message}
            {!isError && successExtra}
          </span>
        </p>
      )}
    </div>
  );
}
