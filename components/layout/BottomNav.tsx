"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bot, Map, Code2, User } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNav = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "AI Mentor", href: "/ai-mentor", icon: Bot },
  { label: "Roadmap", href: "/roadmap", icon: Map },
  { label: "Coding", href: "/coding", icon: Code2 },
  { label: "Profile", href: "/profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-800/95 backdrop-blur-md border-t border-slate-700/60">
      <div className="flex items-center justify-around h-16 px-2">
        {mobileNav.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200",
                  isActive
                    ? "text-brand-green"
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
