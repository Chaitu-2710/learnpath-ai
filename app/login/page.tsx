"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import { Sparkles, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));

    const result = login(email, password);
    if (!result.success) {
      setError(result.error || "Login failed");
    }
    setIsSubmitting(false);
  };

  const handleQuickLogin = (emailVal: string, passVal: string) => {
    setEmail(emailVal);
    setPassword(passVal);
    setError("");
    login(emailVal, passVal);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-green/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center mx-auto mb-3 shadow-lg shadow-brand-green/20">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-100">
            Welcome to <span className="text-gradient-green">LearnPath AI</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Sign in to access your learning mentor
          </p>
        </div>

        {/* 1-Click Demo Login Banner */}
        <div className="mb-4 card p-4 border-brand-blue/40 bg-slate-800/80">
          <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 text-center">
            🚀 1-Click Quick Demo Login
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("arjun@example.com", "arjun123")}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-brand-green/10 text-brand-green border border-brand-green/30 hover:bg-brand-green hover:text-slate-900 transition-all font-semibold text-xs"
            >
              <UserCheck className="w-4 h-4" />
              Student Login
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("admin@learnpath.ai", "admin123")}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-brand-blue/10 text-brand-blue border border-brand-blue/30 hover:bg-brand-blue hover:text-white transition-all font-semibold text-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Login
            </button>
          </div>
        </div>

        {/* Login Card */}
        <div className="card p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Banner */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-400/10 border border-red-400/20 animate-slide-up">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-slate-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-slate-700/40 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-brand-green/50 transition-colors"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-slate-700/40 border border-slate-600 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-brand-green/50 transition-colors"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-brand-green to-brand-blue text-white hover:opacity-90 disabled:opacity-50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-slate-400 mt-5">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-brand-green font-semibold hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
