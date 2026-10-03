import { AppConfig } from "@/constants/app_config";
import { AppStrings } from "@/constants/app_strings";

interface HoneypotFieldProps {
  /** Prefix for a unique id when several forms share a page. */
  idPrefix: string;
}

/** Spam trap: hidden from people and assistive tech, still visible to naive bots. */
export default function HoneypotField({ idPrefix }: HoneypotFieldProps) {
  const { honeypotField } = AppConfig.forms;
  const id = `${idPrefix}-${honeypotField}`;

  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={id}>{AppStrings.forms.honeypotLabel}</label>
      <input id={id} name={honeypotField} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}
