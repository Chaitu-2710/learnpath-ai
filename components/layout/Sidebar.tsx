"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  ClipboardCheck,
  Map,
  BookOpen,
  Code2,
  FolderKanban,
  Award,
  Zap,
  Briefcase,
  FileText,
  User,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/AuthContext";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "AI Mentor", href: "/ai-mentor", icon: Bot, badge: "AI" },
  { label: "Assessment", href: "/assessment", icon: ClipboardCheck },
  { label: "Learning Roadmap", href: "/roadmap", icon: Map },
  { label: "Courses", href: "/courses", icon: BookOpen },
  { label: "Coding Practice", href: "/coding", icon: Code2 },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Certifications", href: "/certifications", icon: Award },
  { label: "Hackathons", href: "/hackathons", icon: Zap },
  { label: "Career Dashboard", href: "/career", icon: Briefcase },
  { label: "Resume", href: "/resume", icon: FileText },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Admin", href: "/admin", icon: ShieldCheck, adminOnly: true },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();

  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || isAdmin
  );

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col bg-slate-800/50 border-r border-slate-700/60 h-screen sticky top-0 transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-slate-700/60">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm text-slate-100">LearnPath</span>
              <span className="font-bold text-sm text-brand-green"> AI</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center mx-auto">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-700/60 transition-all",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto scrollbar-hidden py-3 px-2 space-y-0.5">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "nav-item group relative",
                  isActive && "active",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-brand-blue/20 text-brand-blue">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {/* Tooltip when collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 rounded-md bg-slate-700 text-slate-100 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {item.label}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom user area */}
      <div className="p-3 border-t border-slate-700/60 space-y-2">
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/40 transition-colors",
            collapsed && "justify-center"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center text-white text-xs font-bold shrink-0">
            {getInitials(user?.name)}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {user?.name || "Student"}
              </p>
              <p className="text-[11px] text-brand-green truncate">
                {isAdmin ? "🛡️ Administrator" : `🔥 ${user?.streak || 0} day streak`}
              </p>
            </div>
          )}
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm font-medium",
            collapsed && "justify-center px-2"
          )}
          title="Logout"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
