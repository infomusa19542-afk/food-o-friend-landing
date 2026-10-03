import type { ReactNode } from "react";
import { cn } from "@/utils/classnames";

type Align = "left" | "center";
/** Background the title sits on — controls text colors. */
type Tone = "dark" | "light" | "onBrand";

interface SectionTitleProps {
  title: ReactNode;
  eyebrow?: string;
  description?: string;
  as?: "h1" | "h2" | "h3";
  align?: Align;
  tone?: Tone;
  titleClassName?: string;
  eyebrowClassName?: string;
  className?: string;
}

const ALIGN: Record<Align, string> = {
  left: "text-left items-start",
  center: "text-center items-center",
};

const TONE: Record<Tone, { title: string; description: string }> = {
  dark: { title: "text-white", description: "text-white/75" },
  light: { title: "text-text-dark", description: "text-text-soft" },
  onBrand: { title: "text-white", description: "text-white" },
};

export default function SectionTitle({
  title,
  eyebrow,
  description,
  as: Heading = "h2",
  align = "left",
  tone = "dark",
  titleClassName = "text-heading",
  eyebrowClassName = "text-brand",
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col gap-3", ALIGN[align], className)}>
      {eyebrow && <p className={cn("text-eyebrow", eyebrowClassName)}>{eyebrow}</p>}
      <Heading className={cn("font-bold text-balance", TONE[tone].title, titleClassName)}>{title}</Heading>
      {description && (
        <p className={cn("max-w-prose text-base leading-relaxed sm:text-lg", TONE[tone].description)}>
          {description}
        </p>
      )}
    </div>
  );
}
