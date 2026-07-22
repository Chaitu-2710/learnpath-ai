"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, X, LogOut, User as UserIcon, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

export default function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();

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
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/60 px-4 lg:px-6 h-14 flex items-center justify-between gap-4">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        {searchOpen ? (
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, topics, projects..."
              className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
              autoFocus
            />
            <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
              <X className="w-4 h-4 text-slate-400 hover:text-slate-100" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Search...</span>
          </button>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Streak pill */}
        <div className="hidden sm:flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-full px-3 py-1.5">
          <span className="text-sm">🔥</span>
          <span className="text-xs font-semibold text-slate-200">{user?.streak || 0}</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-700/60 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand-green" />
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:opacity-90 transition-opacity"
          >
            {getInitials(user?.name)}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-2 z-50 animate-slide-up">
              <div className="px-4 py-2 border-b border-slate-700/60">
                <p className="text-xs font-semibold text-slate-100 truncate">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                {isAdmin && (
                  <div className="mt-1">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-brand-blue/20 text-brand-blue">
                      <ShieldCheck className="w-3 h-3" /> Admin
                    </span>
                  </div>
                )}
              </div>

              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-slate-700/60 hover:text-slate-100 transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5" />
                Profile
              </Link>

              {/* Admin Link ONLY for Admin account */}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-brand-blue hover:bg-slate-700/60 font-semibold transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border-t border-slate-700/60 mt-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
