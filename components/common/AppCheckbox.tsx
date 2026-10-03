import type { InputHTMLAttributes, ReactNode } from "react";
import { fieldAria, FieldMessages } from "@/components/common/FormField";
import { cn } from "@/utils/classnames";

interface AppCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type"> {
  id: string;
  label: ReactNode;
  error?: string;
  className?: string;
}

export default function AppCheckbox({ id, label, error, className, ...inputProps }: AppCheckboxProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          {...fieldAria(id, { error })}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          {...inputProps}
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-text-soft">
          {label}
        </label>
      </div>
      <FieldMessages id={id} error={error} />
    </div>
  );
}
