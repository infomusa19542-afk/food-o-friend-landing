import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/classnames";

interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/** Centers content and caps width while full-width backgrounds span the viewport. */
export default function Container({ children, as: Tag = "div", className }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8", className)}>{children}</Tag>;
}
