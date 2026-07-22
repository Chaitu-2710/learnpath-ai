import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0–100
  color?: "green" | "blue" | "yellow" | "red" | "purple";
  size?: "xs" | "sm" | "md";
  showLabel?: boolean;
  className?: string;
  animated?: boolean;
}

const colorMap: Record<string, string> = {
  green: "bg-brand-green",
  blue: "bg-brand-blue",
  yellow: "bg-yellow-400",
  red: "bg-red-400",
  purple: "bg-purple-400",
};

const sizeMap: Record<string, string> = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2.5",
};

export default function ProgressBar({
  value,
  color = "green",
  size = "sm",
  showLabel = false,
  className,
  animated = true,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-slate-400">Progress</span>
          <span className="text-xs font-semibold text-slate-200">{clamped}%</span>
        </div>
      )}
      <div className={cn("progress-track", sizeMap[size])}>
        <div
          className={cn(
            "progress-fill",
            colorMap[color],
            animated && "transition-all duration-700 ease-out"
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
