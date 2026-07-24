"use client";

import { Check, X, Sparkles } from "lucide-react";

const COMPARISONS = [
  {
    feature: "Learning Roadmap",
    traditional: "Same static curriculum for everyone",
    learnpath: "Dynamic AI roadmap tailored to your target role & level",
  },
  {
    feature: "Mentorship",
    traditional: "No mentor or waiting days for forum replies",
    learnpath: "24/7 Instant Google Gemini AI Mentor",
  },
  {
    feature: "Quizzes & Testing",
    traditional: "Generic static multiple-choice tests",
    learnpath: "AI Adaptive Assessments with custom difficulty",
  },
  {
    feature: "Analytics & Progress",
    traditional: "Simple percentage completion bar",
    learnpath: "Career Readiness Index, Skill Gap Radar & XP Streak",
  },
  {
    feature: "Skill Building",
    traditional: "Passive video watching without feedback",
    learnpath: "Hands-on projects, LeetCode-style DSA & code execution",
  },
];

export default function LandingComparison() {
  return (
    <section id="why-us" className="py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            Why LearnPath AI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Traditional Learning vs. LearnPath AI
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            See how AI-driven personalized learning compares to traditional online courses.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-lg">
          <div className="grid grid-cols-12 bg-slate-50 dark:bg-slate-800/60 p-5 text-sm font-bold border-b border-slate-200 dark:border-slate-800">
            <div className="col-span-4 text-slate-500 dark:text-slate-400">Feature</div>
            <div className="col-span-4 text-slate-500 dark:text-slate-400">Traditional Platforms</div>
            <div className="col-span-4 text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>LearnPath AI</span>
            </div>
          </div>

          <div className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
            {COMPARISONS.map((row, i) => (
              <div key={i} className="grid grid-cols-12 p-5 text-sm items-center hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <div className="col-span-4 font-semibold text-slate-900 dark:text-white pr-2">
                  {row.feature}
                </div>
                <div className="col-span-4 text-slate-500 dark:text-slate-400 flex items-start gap-2 pr-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{row.traditional}</span>
                </div>
                <div className="col-span-4 font-medium text-slate-800 dark:text-slate-200 flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{row.learnpath}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
