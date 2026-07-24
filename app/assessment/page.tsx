"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Trophy, AlertCircle, Loader2, Clock, ArrowLeft } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import { assessmentApi } from "@/lib/apiClient";
import { cn } from "@/lib/utils";
import { AssessmentSkeleton } from "@/components/ui/Skeletons";

type Phase = "list" | "intro" | "quiz" | "results";

const DIFFICULTY_COLORS = {
  easy: "green",
  intermediate: "yellow",
  hard: "red",
} as const;

const DEMO_ASSESSMENTS = [
  {
    id: "ass-1",
    title: "Python Data Science Foundations Quiz",
    category: "Python",
    difficulty: "easy",
    question_count: 5,
    time_limit_minutes: 10,
    xp_reward: 50,
    description: "Test your understanding of Python syntax, data types, lists, dictionaries, and list comprehensions.",
    questions: [
      {
        id: "q1",
        question: "Which data structure in Python is mutable and maintains insertion order?",
        options: ["Tuple", "List", "String", "Frozenset"],
        correct_option: 1,
        explanation: "Lists are mutable and maintain insertion order in Python.",
      },
      {
        id: "q2",
        question: "What is the output of `[x**2 for x in range(4) if x % 2 == 0]`?",
        options: ["[0, 4]", "[1, 9]", "[0, 1, 4, 9]", "[4, 16]"],
        correct_option: 0,
        explanation: "range(4) produces 0, 1, 2, 3. Evens are 0 and 2. 0^2 = 0, 2^2 = 4.",
      },
    ],
  },
  {
    id: "ass-2",
    title: "Machine Learning Concepts Assessment",
    category: "Machine Learning",
    difficulty: "intermediate",
    question_count: 5,
    time_limit_minutes: 12,
    xp_reward: 80,
    description: "Evaluate your knowledge of supervised learning, decision trees, bias-variance tradeoff, and evaluation metrics.",
    questions: [
      {
        id: "q3",
        question: "Which metric is best suited for evaluating a highly imbalanced classification dataset?",
        options: ["Accuracy", "F1-Score / PR-AUC", "Mean Squared Error", "R-Squared"],
        correct_option: 1,
        explanation: "F1-Score and Precision-Recall AUC capture performance on minority class better than accuracy.",
      },
    ],
  },
];

export default function AssessmentPage() {
  const [phase, setPhase] = useState<Phase>("list");
  const [assessments, setAssessments] = useState<any[]>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  // Load assessments
  useEffect(() => {
    assessmentApi.list()
      .then((data) => setAssessments(data && data.length > 0 ? data : DEMO_ASSESSMENTS))
      .catch(() => setAssessments(DEMO_ASSESSMENTS))
      .finally(() => setIsLoading(false));
  }, []);

  // Show skeleton only during initial list loading (not during quiz)
  if (isLoading && phase === "list") return <AssessmentSkeleton />;

  const handleSelectAssessment = (assessment: any) => {
    setSelectedAssessment(assessment);
    setPhase("intro");
  };

  const handleStart = async () => {
    setIsLoading(true);
    try {
      const data = await assessmentApi.get(selectedAssessment.id);
      setQuestions(data.questions || selectedAssessment.questions || []);
    } catch {
      setQuestions(selectedAssessment.questions || DEMO_ASSESSMENTS[0].questions);
    } finally {
      setIsLoading(false);
      setCurrentQ(0);
      setSelected(null);
      setAnswered(false);
      setAnswers([]);
      setShowExplanation(false);
      setResult(null);
      setPhase("quiz");
    }
  };

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

  const handleNext = async () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
      setShowExplanation(false);
    } else {
      // Submit
      setIsSubmitting(true);
      try {
        const submitted = await assessmentApi.submit(selectedAssessment.id, answers);
        setResult(submitted);
        setPhase("results");
      } catch (err: any) {
        setError(err.message || "Failed to submit");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const restart = () => {
    setPhase("list");
    setSelectedAssessment(null);
    setQuestions([]);
    setResult(null);
    setError("");
    // Refresh list
    assessmentApi.list().then(setAssessments).catch(() => {});
  };

  const question = questions[currentQ];
  const correctAnswers = result?.correct_answers || 0;
  const totalQ = result?.total_questions || questions.length;
  const score = result?.score || 0;
  const xpEarned = result?.xp_earned || 0;

  // ─── Loading State ────────────────────────────────────────────────────────
  if (isLoading && phase === "list") {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-brand-green animate-spin" />
      </div>
    );
  }

  // ─── List View ────────────────────────────────────────────────────────────
  if (phase === "list") {
    return (
      <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Skill Assessments</h1>
          <p className="text-slate-400 mt-1">Test your knowledge and earn XP</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assessments.map((a) => (
            <button
              key={a.id}
              onClick={() => handleSelectAssessment(a)}
              className="card p-5 text-left hover:border-brand-green/40 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{a.icon}</span>
                {a.completed && (
                  <Badge variant="green">✓ {Math.round(a.best_score || 0)}%</Badge>
                )}
              </div>
              <h3 className="font-semibold text-slate-100 group-hover:text-brand-green transition-colors">
                {a.title}
              </h3>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3 h-3" /> {a.time_minutes} min
                </div>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">{a.question_count} Qs</span>
                <span className="text-slate-600">·</span>
                <Badge variant={DIFFICULTY_COLORS[a.difficulty as keyof typeof DIFFICULTY_COLORS] || "gray"}>
                  {a.difficulty}
                </Badge>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── Intro View ───────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="p-4 lg:p-6 space-y-6 animate-fade-in max-w-lg mx-auto">
        <button onClick={() => setPhase("list")} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to assessments
        </button>

        <div className="card p-8 text-center space-y-4">
          <span className="text-5xl">{selectedAssessment?.icon}</span>
          <h2 className="text-xl font-bold text-slate-100">{selectedAssessment?.title} Assessment</h2>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
            <span><Clock className="w-3.5 h-3.5 inline mr-1" />{selectedAssessment?.time_minutes} minutes</span>
            <span>·</span>
            <span>{selectedAssessment?.question_count} questions</span>
          </div>
          <Badge variant={DIFFICULTY_COLORS[selectedAssessment?.difficulty as keyof typeof DIFFICULTY_COLORS] || "gray"} className="mx-auto">
            {selectedAssessment?.difficulty}
          </Badge>

          <div className="bg-slate-700/40 rounded-xl p-4 text-left space-y-2 mt-2">
            <p className="text-sm font-medium text-slate-200">Before you start:</p>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Each question has one correct answer</li>
              <li>• Explanations shown after each question</li>
              <li>• Earn XP based on your score</li>
              <li>• Results saved to your profile</li>
            </ul>
          </div>

          <button onClick={handleStart} disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 mt-4">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {isLoading ? "Loading..." : "Start Assessment"}
          </button>
        </div>
      </div>
    );
  }

  // ─── Results View ─────────────────────────────────────────────────────────
  if (phase === "results") {
    return (
      <div className="p-4 lg:p-6 flex items-center justify-center animate-fade-in">
        <div className="card p-8 max-w-md w-full text-center space-y-5">
          <div>
            <span className="text-4xl">{score >= 80 ? "🏆" : score >= 60 ? "💪" : "📚"}</span>
            <h2 className="text-xl font-bold text-slate-100 mt-2">Assessment Complete!</h2>
          </div>

          <div className="relative w-28 h-28 mx-auto">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
              <circle
                cx="50" cy="50" r="40"
                stroke={score >= 80 ? "#22c55e" : score >= 60 ? "#eab308" : "#ef4444"}
                strokeWidth="8" fill="none"
                strokeDasharray={`${score * 2.51} 251`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-slate-100">{Math.round(score)}%</span>
              <span className="text-[10px] text-slate-400">Score</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-700/40 rounded-xl p-3">
              <p className="text-xl font-bold text-brand-green">{correctAnswers}</p>
              <p className="text-xs text-slate-400">Correct</p>
            </div>
            <div className="bg-slate-700/40 rounded-xl p-3">
              <p className="text-xl font-bold text-red-400">{totalQ - correctAnswers}</p>
              <p className="text-xs text-slate-400">Incorrect</p>
            </div>
            <div className="bg-slate-700/40 rounded-xl p-3">
              <p className="text-xl font-bold text-brand-blue">+{xpEarned}</p>
              <p className="text-xs text-slate-400">XP Earned</p>
            </div>
          </div>

          <p className="text-sm text-slate-400">
            {score >= 80
              ? "Excellent! You've mastered this topic! 🎉"
              : score >= 60
              ? "Good job! Review the missed questions to improve."
              : "Keep practicing — you'll get there! 💪"}
          </p>

          <div className="flex gap-3">
            <button onClick={restart} className="flex-1 btn-outline flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> All Assessments
            </button>
            <button onClick={handleStart} className="flex-1 btn-primary flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Quiz View ────────────────────────────────────────────────────────────
  if (!question) return null;

  return (
    <div className="p-4 lg:p-6 animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">
            Question {currentQ + 1} / {questions.length}
          </span>
          <ProgressBar value={((currentQ + 1) / questions.length) * 100} color="green" className="w-40" />
          <Badge variant="blue">{selectedAssessment?.topic}</Badge>
        </div>

        {/* Question Card */}
        <div className="card p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-100">{question.text}</h2>

          <div className="space-y-2.5">
            {(question.options || []).map((option: string, idx: number) => {
              const isCorrect = idx === question.correct_index;
              const isSelected = idx === selected;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={answered}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all text-sm",
                    !answered && "hover:border-brand-green/40 hover:bg-brand-green/5",
                    answered && isCorrect && "border-brand-green bg-brand-green/10 text-brand-green",
                    answered && isSelected && !isCorrect && "border-red-400 bg-red-400/10 text-red-400",
                    !answered ? "border-slate-600 text-slate-300" : "border-slate-700 text-slate-400",
                    answered && !isSelected && !isCorrect && "opacity-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs shrink-0 font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {option}
                    {answered && isCorrect && <CheckCircle2 className="w-4 h-4 ml-auto" />}
                    {answered && isSelected && !isCorrect && <XCircle className="w-4 h-4 ml-auto" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && question.explanation && (
            <div className="p-4 rounded-xl bg-slate-700/40 border border-slate-600/50 text-sm">
              <p className="text-xs font-semibold text-brand-blue mb-1.5 uppercase tracking-wide">Explanation</p>
              <p className="text-slate-300">{question.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {answered && (
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {currentQ < questions.length - 1 ? "Next Question" : "Submit & See Results"}
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
