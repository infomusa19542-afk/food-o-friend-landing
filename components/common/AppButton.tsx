import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/classnames";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "md" | "lg";

const BASE =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  outline: "border border-brand text-brand hover:bg-brand hover:text-white",
  ghost: "text-current hover:text-brand",
};

const SIZES: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface SharedProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

type LinkButtonProps = SharedProps & { href: string };
type NativeButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & { href?: undefined };

export type AppButtonProps = LinkButtonProps | NativeButtonProps;

const buttonClasses = (variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) =>
  cn(BASE, VARIANTS[variant], SIZES[size], className);

/** Renders a Next.js `Link` when `href` is given, otherwise a native `<button>`. */
export default function AppButton(props: AppButtonProps) {
  if (props.href !== undefined) {
    const { href, children, variant, size, className } = props;
    return (
      <Link href={href} className={buttonClasses(variant, size, className)}>
        {children}
      </Link>
    );
  }

  const { children, variant, size, className, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
