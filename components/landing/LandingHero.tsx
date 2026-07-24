"use client";

import { ArrowRight, Bot, BookOpen, TrendingUp, Trophy, Code2, ClipboardCheck, Target, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";

interface LandingHeroProps {
  onGetStartedClick: () => void;
}

export default function LandingHero({ onGetStartedClick }: LandingHeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white dark:bg-slate-950 transition-colors">
      {/* Subtle Apple-style Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-orange-500/10 dark:bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apple-Inspired AI Learning Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Master Any Skill with Your <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400">
                Personal AI Mentor
              </span>
            </h1>

            <div className="space-y-2">
              <p className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-200">
                Learn Smarter. Build Faster. Get Hired.
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                LearnPath AI curates personalized step-by-step learning roadmaps, real-time progress analytics, adaptive coding quizzes, and 24/7 AI mentorship.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onGetStartedClick}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-base bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-base bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Learn More</span>
              </a>
            </div>
          </div>

          {/* Right Column: Floating Apple Feature Cards */}
          <div className="lg:col-span-5 relative min-h-[420px] flex items-center justify-center">
            {/* Background Canvas Frame */}
            <div className="w-full max-w-md h-[400px] rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              
              {/* Header inside canvas */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">LearnPath Engine</span>
              </div>

              {/* Grid of Floating Cards */}
              <div className="grid grid-cols-2 gap-3 my-auto">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <Bot className="w-5 h-5 text-emerald-500 mb-1.5" />
                  <p className="text-xs font-bold text-slate-900 dark:text-white">🤖 AI Mentor</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">24/7 Guidance</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <BookOpen className="w-5 h-5 text-blue-500 mb-1.5" />
                  <p className="text-xs font-bold text-slate-900 dark:text-white">📚 Roadmaps</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Personalized</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <TrendingUp className="w-5 h-5 text-orange-500 mb-1.5" />
                  <p className="text-xs font-bold text-slate-900 dark:text-white">📈 Progress</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Real-time Analytics</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <Code2 className="w-5 h-5 text-purple-500 mb-1.5" />
                  <p className="text-xs font-bold text-slate-900 dark:text-white">💻 Coding</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Practice DSA</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <ClipboardCheck className="w-5 h-5 text-teal-500 mb-1.5" />
                  <p className="text-xs font-bold text-slate-900 dark:text-white">📝 Adaptive Quiz</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Smart Testing</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <Rocket className="w-5 h-5 text-rose-500 mb-1.5" />
                  <p className="text-xs font-bold text-slate-900 dark:text-white">🚀 Career Ready</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Job Preparedness</p>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-center">
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  ✨ Powered by Google Gemini AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
