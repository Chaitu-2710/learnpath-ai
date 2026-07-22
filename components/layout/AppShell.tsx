"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";

const PUBLIC_ROUTES = ["/login", "/signup"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-brand-green/30 border-t-brand-green rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Public routes (login/signup) — render without sidebar/nav
  if (isPublicRoute || !user) {
    return <>{children}</>;
  }

  // Authenticated layout
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-auto pb-20 lg:pb-0">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
