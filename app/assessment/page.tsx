"use client";

import { useState } from "react";
import { assessmentQuestions } from "@/lib/data/mockData";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Trophy, AlertCircle } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type Phase = "intro" | "quiz" | "results";

export default function AssessmentPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = assessmentQuestions[currentQ];
  const correctAnswers = answers.filter(
    (a, i) => a === assessmentQuestions[i]?.correctIndex
  ).length;
  const score = Math.round((correctAnswers / assessmentQuestions.length) * 100);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setShowExplanation(true);
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQ] = idx;
      return next;
    });
  };

  const handleNext = () => {
    if (currentQ < assessmentQuestions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
      setShowExplanation(false);
    } else {
      setPhase("results");
    }
  };

  const restart = () => {
    setPhase("intro");
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setAnswers([]);
    setShowExplanation(false);
  };

  const assessments = [
    { title: "Python & OOP", icon: "🐍", questions: 5, time: "8 min", difficulty: "intermediate" as const },
    { title: "Machine Learning", icon: "🤖", questions: 5, time: "10 min", difficulty: "intermediate" as const },
    { title: "Data Structures", icon: "🌳", questions: 5, time: "8 min", difficulty: "hard" as const },
    { title: "SQL & Databases", icon: "🗄️", questions: 5, time: "7 min", difficulty: "easy" as const },
    { title: "Web Development", icon: "🌐", questions: 5, time: "8 min", difficulty: "intermediate" as const },
  ];

  // Intro
  if (phase === "intro") {
    return (
      <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Skill Assessments</h1>
          <p className="text-slate-400 mt-1">Test your knowledge and get personalized feedback</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assessments.map((a, i) => (
            <div
              key={i}
              onClick={() => i === 0 && setPhase("quiz")}
              className={cn(
                "card p-5 transition-all",
                i === 0
                  ? "cursor-pointer hover:border-brand-green/50 hover:shadow-lg hover:shadow-brand-green/5"
                  : "opacity-60 cursor-default"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{a.icon}</span>
                <Badge variant={a.difficulty === "easy" ? "green" : a.difficulty === "intermediate" ? "yellow" : "red"}>
                  {a.difficulty}
                </Badge>
              </div>
              <h3 className="font-semibold text-slate-100 mb-1">{a.title}</h3>
              <p className="text-xs text-slate-400">{a.questions} questions · {a.time}</p>
              <button
                className={cn(
                  "mt-4 w-full py-2 rounded-lg text-sm font-semibold transition-all",
                  i === 0
                    ? "bg-brand-green/10 text-brand-green hover:bg-brand-green hover:text-slate-900"
                    : "bg-slate-700/40 text-slate-500 cursor-not-allowed"
                )}
              >
                {i === 0 ? "Start Assessment" : "Coming Soon"}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Results
  if (phase === "results") {
    const getScoreFeedback = () => {
      if (score >= 80) return { msg: "Excellent work! 🎉", color: "text-brand-green", sub: "You have a strong understanding of these concepts." };
      if (score >= 60) return { msg: "Good effort! 💪", color: "text-yellow-400", sub: "Review the explanations to strengthen weak areas." };
      return { msg: "Keep practicing! 📚", color: "text-red-400", sub: "Don't worry — every mistake is a learning opportunity." };
    };
    const { msg, color, sub } = getScoreFeedback();

    return (
      <div className="p-4 lg:p-6 flex items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="card p-8 max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full border-4 border-brand-green/30 flex items-center justify-center mx-auto mb-4">
            <Trophy className={cn("w-10 h-10", color)} />
          </div>
          <h2 className={cn("text-4xl font-bold", color)}>{score}%</h2>
          <p className="text-xl font-semibold text-slate-100 mt-2">{msg}</p>
          <p className="text-slate-400 text-sm mt-1">{sub}</p>

          <div className="grid grid-cols-3 gap-4 my-6">
            <div className="p-3 rounded-lg bg-slate-700/40">
              <p className="text-xl font-bold text-brand-green">{correctAnswers}</p>
              <p className="text-xs text-slate-400 mt-0.5">Correct</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-700/40">
              <p className="text-xl font-bold text-red-400">{assessmentQuestions.length - correctAnswers}</p>
              <p className="text-xs text-slate-400 mt-0.5">Wrong</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-700/40">
              <p className="text-xl font-bold text-brand-blue">{assessmentQuestions.length}</p>
              <p className="text-xs text-slate-400 mt-0.5">Total</p>
            </div>
          </div>

          {/* Per-question breakdown */}
          <div className="text-left space-y-2 mb-6">
            {assessmentQuestions.map((q, i) => {
              const isCorrect = answers[i] === q.correctIndex;
              return (
                <div key={q.id} className="flex items-start gap-2 p-2 rounded-lg">
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <p className="text-xs text-slate-300 line-clamp-2">{q.text}</p>
                </div>
              );
            })}
          </div>

          <button onClick={restart} className="btn-primary w-full justify-center">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Quiz
  return (
    <div className="p-4 lg:p-6 flex items-start justify-center min-h-[80vh] animate-fade-in">
      <div className="w-full max-w-2xl space-y-4">
        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-slate-400">
            Question {currentQ + 1} of {assessmentQuestions.length}
          </p>
          <Badge variant="gray">{question.topic}</Badge>
        </div>
        <ProgressBar
          value={((currentQ + (answered ? 1 : 0)) / assessmentQuestions.length) * 100}
          color="green"
          size="md"
        />

        {/* Question Card */}
        <div className="card p-6 animate-slide-up">
          <h2 className="text-lg font-semibold text-slate-100 leading-relaxed mb-6">
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              let state: "default" | "correct" | "wrong" | "missed" = "default";
              if (answered) {
                if (idx === question.correctIndex) state = "correct";
                else if (idx === selected) state = "wrong";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={answered}
                  className={cn(
                    "w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all duration-200",
                    state === "default" && !answered && "border-slate-600 text-slate-300 hover:border-slate-400 hover:bg-slate-700/40",
                    state === "default" && answered && "border-slate-700 text-slate-500",
                    state === "correct" && "border-brand-green bg-brand-green/10 text-brand-green font-medium",
                    state === "wrong" && "border-red-400 bg-red-400/10 text-red-400",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className={cn(
                      "w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0",
                      state === "correct" ? "border-brand-green text-brand-green" :
                      state === "wrong" ? "border-red-400 text-red-400" :
                      "border-slate-600 text-slate-500"
                    )}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {option}
                    {state === "correct" && <CheckCircle2 className="w-4 h-4 ml-auto shrink-0" />}
                    {state === "wrong" && <XCircle className="w-4 h-4 ml-auto shrink-0" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={cn(
            "p-4 rounded-xl border flex gap-3 animate-slide-up",
            selected === question.correctIndex
              ? "bg-brand-green/5 border-brand-green/30"
              : "bg-red-400/5 border-red-400/30"
          )}>
            {selected === question.correctIndex ? (
              <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            )}
            <div>
              <p className={cn(
                "text-sm font-semibold mb-1",
                selected === question.correctIndex ? "text-brand-green" : "text-red-400"
              )}>
                {selected === question.correctIndex ? "Correct! Well done." : "Not quite right."}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">{question.explanation}</p>
            </div>
          </div>
        )}

        {/* Next button */}
        {answered && (
          <button onClick={handleNext} className="btn-primary ml-auto flex animate-slide-up">
            {currentQ < assessmentQuestions.length - 1 ? "Next Question" : "See Results"}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
