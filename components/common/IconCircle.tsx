import Icon, { type IconName } from "@/components/common/Icon";
import { cn } from "@/utils/classnames";

type CircleSize = "md" | "lg";

const SIZES: Record<CircleSize, { circle: string; icon: string }> = {
  md: { circle: "size-12", icon: "size-6" },
  lg: { circle: "size-14", icon: "size-7" },
};

interface IconCircleProps {
  name: IconName;
  size?: CircleSize;
  className?: string;
}

export default function IconCircle({ name, size = "md", className }: IconCircleProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand",
        SIZES[size].circle,
        className,
      )}
    >
      <Icon name={name} className={SIZES[size].icon} />
    </span>
  );
}
