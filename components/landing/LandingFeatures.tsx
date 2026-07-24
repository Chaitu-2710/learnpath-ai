"use client";

import { Bot, BookOpen, ClipboardCheck, Map, Code2, TrendingUp, Briefcase, Trophy, FolderKanban } from "lucide-react";

const FEATURES = [
  {
    icon: Bot,
    title: "AI Mentor 24/7",
    description: "Instant personalized answers, code reviews, and study advice powered by Google Gemini AI.",
    accent: "text-emerald-500 bg-emerald-500/10",
  },
  {
    icon: Map,
    title: "Personalized Roadmaps",
    description: "Adaptive step-by-step learning paths tailored to your exact career target and skill level.",
    accent: "text-blue-500 bg-blue-500/10",
  },
  {
    icon: ClipboardCheck,
    title: "Adaptive Assessments",
    description: "Dynamic quizzes that adjust question difficulty in real-time to measure true skill mastery.",
    accent: "text-orange-500 bg-orange-500/10",
  },
  {
    icon: Code2,
    title: "Coding Playground",
    description: "Practice Data Structures & Algorithms with instant feedback and XP rewards.",
    accent: "text-purple-500 bg-purple-500/10",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Comprehensive analytics tracking streak, XP, readiness score, and daily study hours.",
    accent: "text-teal-500 bg-teal-500/10",
  },
  {
    icon: Briefcase,
    title: "Career Guidance",
    description: "Resume evaluation, portfolio progress, skill gap analysis, and placement readiness tracking.",
    accent: "text-emerald-500 bg-emerald-500/10",
  },
  {
    icon: Trophy,
    title: "Achievements & Badges",
    description: "Earn XP, unlock streak milestones, and showcase earned certificates on your profile.",
    accent: "text-amber-500 bg-amber-500/10",
  },
  {
    icon: FolderKanban,
    title: "Project-Based Learning",
    description: "Build real-world machine learning models and web applications to build a strong portfolio.",
    accent: "text-rose-500 bg-rose-500/10",
  },
  {
    icon: BookOpen,
    title: "Curated Course Resources",
    description: "Hand-picked high quality courses and video modules structured into clear stages.",
    accent: "text-sky-500 bg-sky-500/10",
  },
];

export default function LandingFeatures() {
  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered for Accelerated Tech Mastery
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Everything you need to master AI, Software Engineering, and Data Science in one intelligent platform.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="group p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-2xl ${feat.accent} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
