"use client";

import { useState } from "react";
import { Sparkles, Target, Zap, Rocket, CheckCircle2, X, ArrowRight, BookOpen, Brain, Clock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { profileApi } from "@/lib/apiClient";
import { cn } from "@/lib/utils";

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (updatedData: { careerTarget: string; level: string; goalHours: number }) => void;
  initialGoal?: string;
}

const QUICK_GOALS = [
  "AI & Machine Learning Engineer",
  "Full-Stack Web Developer",
  "Data Scientist & Analyst",
  "Python Mastery & Algorithms",
  "Cloud & MLOps Architect",
  "Cybersecurity Specialist",
];

const SKILL_LEVELS = [
  { id: "Beginner", label: "Beginner", icon: "🚀", desc: "Starting from scratch or fundamental syntax" },
  { id: "Intermediate", label: "Intermediate", icon: "📈", desc: "Know basics, building projects & practicing" },
  { id: "Advanced", label: "Advanced", icon: "⚡", desc: "Deep diving into complex architecture & optimization" },
];

export default function GetStartedModal({
  isOpen,
  onClose,
  onSuccess,
  initialGoal = "",
}: GetStartedModalProps) {
  const [careerGoal, setCareerGoal] = useState(initialGoal || "AI & Machine Learning Engineer");
  const [level, setLevel] = useState("Intermediate");
  const [dailyHours, setDailyHours] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerGoal.trim()) return;

    setIsSubmitting(true);
    try {
      // Save profile updates to backend
      await profileApi.update({
        career_target: careerGoal,
        goal: `Master ${careerGoal} at ${level} level`,
      });

      setIsSuccess(true);
      setTimeout(() => {
        if (onSuccess) {
          onSuccess({ careerTarget: careerGoal, level, goalHours: dailyHours });
        }
        setIsSubmitting(false);
        setIsSuccess(false);
        onClose();
      }, 1200);
    } catch {
      // Fallback local update if offline
      if (onSuccess) {
        onSuccess({ careerTarget: careerGoal, level, goalHours: dailyHours });
      }
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-brand-green/10 overflow-hidden">
        {/* Glowing Top Border */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-green via-brand-blue to-purple-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-green/20 border-2 border-brand-green flex items-center justify-center mx-auto text-brand-green animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Learning Path Initialized!</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Your AI Mentor has calibrated your roadmap for <span className="text-brand-green font-semibold">{careerGoal}</span> at <span className="text-brand-blue font-semibold">{level}</span> level.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center text-slate-900 font-bold shadow-lg shadow-brand-green/20 shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-100">Get Started with LearnPath AI</h2>
                  <Badge variant="green">Personalized</Badge>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Define your goals to generate your custom AI roadmap & daily tasks</p>
              </div>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
              {/* Goal Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-brand-green" />
                  What is your target career or skill goal?
                </label>
                <input
                  type="text"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  placeholder="e.g. AI & Machine Learning Engineer..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all text-sm"
                  required
                />

                {/* Quick suggestions */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {QUICK_GOALS.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setCareerGoal(goal)}
                      className={cn(
                        "text-xs px-2.5 py-1 rounded-lg border transition-all",
                        careerGoal === goal
                          ? "bg-brand-green/10 border-brand-green/40 text-brand-green font-medium"
                          : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600"
                      )}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skill Level Cards */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-brand-blue" />
                  Select your current experience level
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {SKILL_LEVELS.map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setLevel(lvl.id)}
                      className={cn(
                        "p-3 rounded-xl border text-left transition-all flex flex-col justify-between",
                        level === lvl.id
                          ? "bg-gradient-to-b from-brand-blue/10 to-brand-green/10 border-brand-green text-slate-100 shadow-md shadow-brand-green/5"
                          : "bg-slate-800/40 border-slate-700/80 text-slate-400 hover:bg-slate-800 hover:border-slate-600"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-lg">{lvl.icon}</span>
                        {level === lvl.id && <CheckCircle2 className="w-4 h-4 text-brand-green" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-200">{lvl.label}</p>
                        <p className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-2">{lvl.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Daily Target */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  Daily study target
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { hours: 1, label: "1 Hour / day", badge: "Casual" },
                    { hours: 2, label: "2 Hours / day", badge: "Recommended" },
                    { hours: 3, label: "3+ Hours / day", badge: "Intensive" },
                  ].map((h) => (
                    <button
                      key={h.hours}
                      type="button"
                      onClick={() => setDailyHours(h.hours)}
                      className={cn(
                        "py-2.5 px-3 rounded-xl border text-xs font-medium transition-all text-center flex flex-col items-center justify-center gap-1",
                        dailyHours === h.hours
                          ? "bg-purple-500/10 border-purple-400 text-purple-300"
                          : "bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800"
                      )}
                    >
                      <span>{h.label}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-400">{h.badge}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-outline flex-1 justify-center py-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex-[2] justify-center py-3 text-sm font-bold shadow-lg shadow-brand-green/20 hover:shadow-brand-green/40"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    Configuring Path...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Generate My AI Path
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
