"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Sun, Moon, ArrowRight, Menu, X } from "lucide-react";
import { useTheme } from "@/lib/theme/ThemeContext";

interface LandingNavbarProps {
  onGetStartedClick: () => void;
}

export default function LandingNavbar({ onGetStartedClick }: LandingNavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-200/60 dark:border-slate-800/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-emerald-400 dark:text-emerald-500" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
            LearnPath <span className="text-emerald-600 dark:text-emerald-400">AI</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Features
          </a>
          <a href="#why-us" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Why Us
          </a>
          <a href="#courses" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Courses
          </a>
          <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        {/* Action Buttons & Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Light/Dark Theme"
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Sign In */}
          <Link
            href="/login"
            className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors px-3 py-2"
          >
            Sign In
          </Link>

          {/* Get Started Button */}
          <button
            onClick={onGetStartedClick}
            className="px-4 py-2 rounded-full text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800 dark:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-6 space-y-4 animate-fade-in">
          <nav className="flex flex-col gap-4 text-base font-medium text-slate-700 dark:text-slate-200">
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#why-us" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
            <a href="#courses" onClick={() => setMobileMenuOpen(false)}>Courses</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          </nav>
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
            <Link
              href="/login"
              className="w-full text-center py-2.5 rounded-full text-sm font-medium border border-slate-300 dark:border-slate-700"
            >
              Sign In
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onGetStartedClick();
              }}
              className="w-full py-2.5 rounded-full text-sm font-medium bg-emerald-600 text-white text-center"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
