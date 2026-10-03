import type { SelectHTMLAttributes } from "react";
import FormField, { fieldAria, fieldControlClasses } from "@/components/common/FormField";
import Icon from "@/components/common/Icon";
import { AppStrings } from "@/constants/app_strings";
import { cn } from "@/utils/classnames";

export interface SelectOption {
  value: string;
  label: string;
}

interface AppSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  id: string;
  label: string;
  options: readonly SelectOption[];
  error?: string;
  hint?: string;
  optional?: boolean;
  placeholder?: string;
}

export default function AppSelect({
  id,
  label,
  options,
  error,
  hint,
  optional,
  placeholder = AppStrings.forms.selectPlaceholder,
  className,
  ...selectProps
}: AppSelectProps) {
  return (
    <FormField id={id} label={label} optional={optional} hint={hint} error={error}>
      <div className="relative">
        <select
          id={id}
          {...fieldAria(id, { hint, error })}
          className={cn(fieldControlClasses(Boolean(error)), "appearance-none pr-11", className)}
          {...selectProps}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevronDown"
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-text-soft"
        />
      </div>
    </FormField>
  );
}
