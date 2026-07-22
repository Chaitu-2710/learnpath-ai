import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "easy":
      return "text-brand-green bg-brand-green/10";
    case "medium":
      return "text-yellow-400 bg-yellow-400/10";
    case "hard":
      return "text-red-400 bg-red-400/10";
    default:
      return "text-slate-400 bg-slate-400/10";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "completed":
      return "text-brand-green";
    case "in-progress":
      return "text-brand-blue";
    case "locked":
      return "text-slate-500";
    default:
      return "text-slate-400";
  }
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-brand-green";
  if (score >= 60) return "text-yellow-400";
  return "text-red-400";
}
