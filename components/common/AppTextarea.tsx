import type { TextareaHTMLAttributes } from "react";
import FormField, { fieldAria, fieldControlClasses } from "@/components/common/FormField";
import { cn } from "@/utils/classnames";

interface AppTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
}

export default function AppTextarea({ id, label, error, hint, optional, className, rows = 4, ...props }: AppTextareaProps) {
  return (
    <FormField id={id} label={label} optional={optional} hint={hint} error={error}>
      <textarea
        id={id}
        rows={rows}
        {...fieldAria(id, { hint, error })}
        className={cn(fieldControlClasses(Boolean(error)), "resize-y leading-relaxed", className)}
        {...props}
      />
    </FormField>
  );
}
