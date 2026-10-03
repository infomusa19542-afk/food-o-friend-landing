import { cn } from "@/utils/classnames";

type ShimmerTone = "light" | "dark";

const TONES: Record<ShimmerTone, string> = {
  light:
    "bg-skeleton-light bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.65)_50%,transparent_100%)]",
  dark: "bg-skeleton-dark bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_50%,transparent_100%)]",
};

interface ImageShimmerProps {
  tone?: ShimmerTone;
  /** Fades the skeleton out (and stops the animation) once the image has loaded. */
  hidden?: boolean;
  className?: string;
}

/** Decorative skeleton placeholder for an image area. CSS-only; static when reduced motion is preferred. */
export default function ImageShimmer({ tone = "light", hidden = false, className }: ImageShimmerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-size-[200%_100%] bg-no-repeat transition-opacity duration-200 motion-reduce:animate-none motion-reduce:transition-none",
        TONES[tone],
        hidden ? "animate-none opacity-0" : "animate-shimmer opacity-100",
        className,
      )}
    />
  );
}
