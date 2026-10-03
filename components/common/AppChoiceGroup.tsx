import { FieldLabelText, FieldMessages, fieldErrorId, fieldHintId } from "@/components/common/FormField";
import type { SelectOption } from "@/components/common/AppSelect";
import { cn } from "@/utils/classnames";

interface BaseProps {
  id: string;
  name: string;
  legend: string;
  options: readonly SelectOption[];
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
}

interface SingleChoiceProps extends BaseProps {
  type: "radio";
  value: string;
  onChange: (value: string) => void;
}

interface MultiChoiceProps extends BaseProps {
  type: "checkbox";
  value: readonly string[];
  onChange: (value: string[]) => void;
}

type AppChoiceGroupProps = SingleChoiceProps | MultiChoiceProps;

/** Radio or checkbox options as tappable chips inside a labelled fieldset. */
export default function AppChoiceGroup(props: AppChoiceGroupProps) {
  const { id, name, legend, options, error, hint, optional, className } = props;
  const describedBy = [hint && fieldHintId(id), error && fieldErrorId(id)].filter(Boolean).join(" ");

  const isChecked = (value: string) =>
    props.type === "radio" ? props.value === value : props.value.includes(value);

  const toggle = (value: string, checked: boolean) => {
    if (props.type === "radio") props.onChange(value);
    else props.onChange(checked ? [...props.value, value] : props.value.filter((item) => item !== value));
  };

  return (
    <fieldset id={id} aria-describedby={describedBy || undefined} className={cn("flex min-w-0 flex-col gap-2", className)}>
      <legend className="mb-1.5">
        <FieldLabelText optional={optional}>{legend}</FieldLabelText>
      </legend>
      {hint && (
        <p id={fieldHintId(id)} className="-mt-1 text-sm text-text-soft">
          {hint}
        </p>
      )}
      <div className="grid gap-2 min-[400px]:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const optionId = `${id}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border bg-white px-3 py-2 text-sm text-text-dark transition-colors has-checked:border-brand has-checked:bg-brand-tint has-focus-visible:outline-2 has-focus-visible:outline-offset-1 has-focus-visible:outline-brand",
                error ? "border-red-600" : "border-black/15",
              )}
            >
              <input
                id={optionId}
                type={props.type}
                name={name}
                value={option.value}
                checked={isChecked(option.value)}
                onChange={(event) => toggle(option.value, event.target.checked)}
                className="size-4 shrink-0 accent-brand focus-visible:outline-none"
              />
              <span className="min-w-0 break-words">{option.label}</span>
            </label>
          );
        })}
      </div>
      <FieldMessages id={id} error={error} />
    </fieldset>
  );
}
