import type { ReactNode } from "react";
import { cn } from "@/utils/classnames";

type Align = "left" | "center";

interface SectionTitleProps {
  title: ReactNode;
  eyebrow?: string;
  description?: string;
  as?: "h1" | "h2" | "h3";
  align?: Align;
  className?: string;
}

const ALIGN: Record<Align, string> = {
  left: "text-left items-start",
  center: "text-center items-center",
};

export default function SectionTitle({
  title,
  eyebrow,
  description,
  as: Heading = "h2",
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col gap-3", ALIGN[align], className)}>
      {eyebrow && <p className="text-sm font-semibold tracking-widest text-brand">{eyebrow}</p>}
      <Heading className="text-3xl font-bold leading-tight sm:text-4xl">{title}</Heading>
      {description && <p className="max-w-prose text-base text-muted sm:text-lg">{description}</p>}
    </div>
  );
}
