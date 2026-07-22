import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
  changeLabel?: string;
  color?: "green" | "blue" | "yellow" | "red" | "purple";
  className?: string;
}

const colorAccent: Record<string, string> = {
  green: "text-brand-green",
  blue: "text-brand-blue",
  yellow: "text-yellow-400",
  red: "text-red-400",
  purple: "text-purple-400",
};

export default function StatCard({
  label,
  value,
  icon,
  change,
  changeLabel,
  color = "green",
  className,
}: StatCardProps) {
  return (
    <div className={cn("stat-card gap-3", className)}>
      <div className="flex items-start justify-between">
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        {icon && (
          <div className={cn("p-1.5 rounded-lg bg-slate-700/60", colorAccent[color])}>
            {icon}
          </div>
        )}
      </div>
      <p className={cn("text-2xl font-bold", colorAccent[color])}>{value}</p>
      {change !== undefined && (
        <p className="text-xs text-slate-400">
          <span className={change >= 0 ? "text-brand-green" : "text-red-400"}>
            {change >= 0 ? "+" : ""}{change}%
          </span>
          {changeLabel && ` ${changeLabel}`}
        </p>
      )}
    </div>
  );
}
