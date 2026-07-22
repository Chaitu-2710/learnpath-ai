"use client";

import { careerStats, careerProgressData } from "@/lib/data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  Cell,
} from "recharts";
import {
  Briefcase,
  FileText,
  FolderKanban,
  MessageSquare,
  Building2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn, getScoreColor } from "@/lib/utils";

const careerMetrics = [
  { label: "Placement Readiness", value: careerStats.placementReadiness, icon: Briefcase, color: "green" as const },
  { label: "Resume Score", value: careerStats.resumeScore, icon: FileText, color: "blue" as const },
  { label: "Portfolio Progress", value: careerStats.portfolioProgress, icon: FolderKanban, color: "yellow" as const },
  { label: "Interview Readiness", value: careerStats.interviewReadiness, icon: MessageSquare, color: "purple" as const },
  { label: "Internship Readiness", value: careerStats.internshipReadiness, icon: Building2, color: "green" as const },
];

const skillGaps = [
  { name: "Deep Learning", current: 20, target: 70, gap: 50 },
  { name: "MLOps", current: 10, target: 60, gap: 50 },
  { name: "System Design", current: 15, target: 55, gap: 40 },
  { name: "DSA", current: 55, target: 80, gap: 25 },
  { name: "Python", current: 78, target: 90, gap: 12 },
];

export default function CareerPage() {
  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Career Dashboard</h1>
        <p className="text-slate-400 mt-1">Track your placement readiness and career preparation progress</p>
      </div>

      {/* Overall Score */}
      <div className="card p-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-brand-blue/5 pointer-events-none" />
        <div className="relative">
          <ResponsiveContainer width={140} height={140}>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={[{ value: careerStats.overallScore, fill: "#22c55e" }]}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar dataKey="value" cornerRadius={6} background={{ fill: "#1e293b" }}>
                <Cell fill="#22c55e" />
              </RadialBar>
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-brand-green">{careerStats.overallScore}%</span>
            <span className="text-xs text-slate-400">Ready</span>
          </div>
        </div>
        <div className="flex-1 relative">
          <h2 className="text-xl font-bold text-slate-100 mb-1">Overall Career Readiness</h2>
          <p className="text-sm text-slate-400 mb-4">
            You&apos;re on track! Focus on Deep Learning and MLOps to close the gaps and hit 80%+ readiness.
          </p>
          <div className="flex flex-wrap gap-2">
            <button className="btn-primary">View Action Plan</button>
            <button className="btn-outline">Mock Interview</button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {careerMetrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="card p-5 hover:border-slate-600 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-700/60">
                    <Icon className="w-4 h-4 text-slate-300" />
                  </div>
                  <span className="text-sm font-medium text-slate-300">{m.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors" />
              </div>
              <div className="mb-2">
                <span className={cn("text-2xl font-bold", getScoreColor(m.value))}>{m.value}%</span>
              </div>
              <ProgressBar
                value={m.value}
                color={m.value >= 80 ? "green" : m.value >= 60 ? "blue" : "yellow"}
              />
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Progress Over Time */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-brand-blue" />
            <h3 className="font-semibold text-slate-100">Readiness Over Time</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={careerProgressData}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", fontSize: "12px" }}
                labelStyle={{ color: "#94a3b8" }}
                itemStyle={{ color: "#22c55e" }}
              />
              <Area type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={2} fill="url(#grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Gaps */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <h3 className="font-semibold text-slate-100">Skill Gaps</h3>
            <span className="text-xs text-slate-400">Current vs Target</span>
          </div>
          <div className="space-y-3">
            {skillGaps.map((sg) => (
              <div key={sg.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-slate-300">{sg.name}</span>
                  <span className="text-xs text-slate-400">{sg.current}% / {sg.target}%</span>
                </div>
                <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                  {/* Target indicator */}
                  <div
                    className="absolute top-0 h-full bg-slate-600/50 rounded-full"
                    style={{ width: `${sg.target}%` }}
                  />
                  {/* Current */}
                  <div
                    className={cn("absolute top-0 h-full rounded-full", sg.current >= sg.target ? "bg-brand-green" : "bg-brand-blue")}
                    style={{ width: `${sg.current}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="card p-5">
        <h3 className="font-semibold text-slate-100 mb-4">Recommended Actions</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { icon: "📚", title: "Complete Deep Learning Course", priority: "High", done: false },
            { icon: "🏗️", title: "Build 2 more ML projects", priority: "High", done: false },
            { icon: "📋", title: "Update your resume", priority: "Medium", done: false },
            { icon: "💬", title: "Practice 5 mock interviews", priority: "High", done: false },
            { icon: "🎓", title: "Finish IBM ML Certificate", priority: "Medium", done: false },
            { icon: "🔧", title: "Learn MLOps basics", priority: "Medium", done: false },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
              <span className="text-lg shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-200 leading-snug">{item.title}</p>
                <span className={cn(
                  "text-xs font-medium",
                  item.priority === "High" ? "text-red-400" : "text-yellow-400"
                )}>
                  {item.priority} Priority
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
