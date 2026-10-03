import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/classnames";

type ButtonVariant = "primary" | "dark" | "outline" | "outlineLight" | "ghost";
type ButtonSize = "md" | "lg";
type ButtonShape = "pill" | "rounded";

const BASE =
  "inline-flex min-h-11 items-center justify-center gap-2 font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-brand-strong text-white hover:bg-brand-strong-hover",
  dark: "bg-ink text-white hover:bg-charcoal-soft",
  outline: "border border-brand-strong text-brand-strong hover:bg-brand-strong hover:text-white",
  /** Secondary action on dark backgrounds. */
  outlineLight: "border border-white/40 text-white hover:bg-white/10",
  ghost: "text-current hover:text-brand",
};

const SIZES: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const SHAPES: Record<ButtonShape, string> = {
  pill: "rounded-full",
  rounded: "rounded-lg",
};

interface SharedProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  className?: string;
}

type LinkButtonProps = SharedProps & { href: string; onClick?: () => void };
type NativeButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & { href?: undefined };

export type AppButtonProps = LinkButtonProps | NativeButtonProps;

const buttonClasses = ({ variant = "primary", size = "md", shape = "pill", className }: SharedProps) =>
  cn(BASE, VARIANTS[variant], SIZES[size], SHAPES[shape], className);

/** Renders a Next.js `Link` when `href` is given, otherwise a native `<button>`. */
export default function AppButton(props: AppButtonProps) {
  if (props.href !== undefined) {
    const { href, children, onClick } = props;
    return (
      <Link href={href} onClick={onClick} className={buttonClasses(props)}>
        {children}
      </Link>
    );
  }

  const { children, variant, size, shape, className, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClasses({ children, variant, size, shape, className })} {...rest}>
      {children}
    </button>
  );
}
