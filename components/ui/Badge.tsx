import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "blue" | "yellow" | "red" | "purple" | "gray" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const variantMap: Record<string, string> = {
  green: "bg-brand-green/10 text-brand-green border-brand-green/20",
  blue: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
  yellow: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  red: "bg-red-400/10 text-red-400 border-red-400/20",
  purple: "bg-purple-400/10 text-purple-400 border-purple-400/20",
  gray: "bg-slate-700/60 text-slate-300 border-slate-600/40",
  outline: "border border-slate-600 text-slate-400",
};

export default function Badge({
  children,
  variant = "gray",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "badge border",
        variantMap[variant],
        size === "md" && "text-sm px-3 py-1",
        className
      )}
    >
      {children}
    </span>
  );
}
