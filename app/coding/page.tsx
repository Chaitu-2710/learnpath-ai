"use client";

import { codingProblems } from "@/lib/data/mockData";
import { CheckCircle2, Circle, ChevronRight, Code2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

const difficulties = ["All", "easy", "medium", "hard"];

export default function CodingPage() {
  const [filter, setFilter] = useState("All");

  const filtered = codingProblems.filter(
    (p) => filter === "All" || p.difficulty === filter
  );

  const solved = codingProblems.filter((p) => p.solved).length;

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Coding Practice</h1>
          <p className="text-slate-400 mt-1">Master DSA for technical interviews</p>
        </div>
        <div className="flex gap-3">
          <div className="card px-4 py-3 text-center">
            <p className="text-xl font-bold text-brand-green">{solved}</p>
            <p className="text-xs text-slate-400">Solved</p>
          </div>
          <div className="card px-4 py-3 text-center">
            <p className="text-xl font-bold text-slate-300">{codingProblems.length}</p>
            <p className="text-xs text-slate-400">Total</p>
          </div>
          <div className="card px-4 py-3 text-center">
            <p className="text-xl font-bold text-yellow-400">{codingProblems.filter((p) => p.difficulty === "medium").length}</p>
            <p className="text-xs text-slate-400">Medium</p>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {difficulties.map((d) => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize",
              filter === d
                ? d === "easy" ? "bg-brand-green/20 text-brand-green border border-brand-green/30"
                : d === "medium" ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/30"
                : d === "hard" ? "bg-red-400/20 text-red-400 border border-red-400/30"
                : "bg-slate-700 text-slate-100"
                : "text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-slate-200"
            )}
          >
            {d === "All" ? "All" : d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>

      {/* Problem List */}
      <div className="card overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-4 px-4 py-2.5 border-b border-slate-700/60 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <span className="w-6" />
          <span>Problem</span>
          <span className="hidden sm:block">Acceptance</span>
          <span className="hidden md:block">Companies</span>
          <span />
        </div>
        {filtered.map((problem, i) => (
          <div
            key={problem.id}
            className={cn(
              "grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-4 items-center px-4 py-3.5 hover:bg-slate-700/30 transition-colors cursor-pointer group",
              i < filtered.length - 1 && "border-b border-slate-700/40"
            )}
          >
            <div className="w-6">
              {problem.solved ? (
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
              ) : (
                <Circle className="w-4 h-4 text-slate-600" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200 group-hover:text-brand-green transition-colors">
                {problem.title}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-500">{problem.topic}</span>
                <Badge variant={problem.difficulty === "easy" ? "green" : problem.difficulty === "medium" ? "yellow" : "red"}>
                  {problem.difficulty}
                </Badge>
              </div>
            </div>
            <span className="hidden sm:block text-xs text-slate-400">{problem.acceptance}</span>
            <div className="hidden md:flex gap-1">
              {problem.companies.slice(0, 2).map((c) => (
                <span key={c} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-700/60 text-slate-400">{c}</span>
              ))}
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors" />
          </div>
        ))}
      </div>

      {/* AI Coding Help CTA */}
      <div className="card p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center shrink-0">
          <Code2 className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-100">Stuck on a problem?</h3>
          <p className="text-sm text-slate-400">Ask your AI Mentor for hints, explanations, and code walkthroughs.</p>
        </div>
        <button className="btn-primary shrink-0">Ask AI Mentor</button>
      </div>
    </div>
  );
}
