"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What is LearnPath AI?",
    a: "LearnPath AI is an intelligent, personalized learning platform that creates custom career roadmaps, adaptive quizzes, progress analytics, and provides 24/7 AI mentorship powered by Google Gemini.",
  },
  {
    q: "How does the AI Mentor work?",
    a: "Our AI Mentor is integrated with Google Gemini. It analyzes your current skill level, target career goal, and active course progress to give instant step-by-step guidance, code explanations, and project advice.",
  },
  {
    q: "Can beginners use LearnPath AI?",
    a: "Yes! LearnPath AI caters to all experience levels. During onboarding, you can select Beginner, Intermediate, or Advanced, and your AI roadmap will start from the fundamentals.",
  },
  {
    q: "Is my progress saved automatically?",
    a: "Yes. Every completed task, quiz score, XP earned, and streak metric is synchronized immediately with your account database.",
  },
  {
    q: "How are adaptive assessments generated?",
    a: "Assessments dynamically calibrate question difficulty based on your answers, ensuring you are tested accurately on core concepts without repetitive or irrelevant questions.",
  },
  {
    q: "Can I switch courses or target goals anytime?",
    a: "Absolutely. You can update your career target or switch courses at any time from your settings or dashboard, and your roadmap will recalibrate automatically.",
  },
];

export default function LandingFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Everything you need to know about getting started with LearnPath AI.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-emerald-500" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
