"use client";

import { useState } from "react";
import { adminStudents } from "@/lib/data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Search,
  MoreHorizontal,
  Activity,
  Cpu,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import StatCard from "@/components/ui/StatCard";
import { cn } from "@/lib/utils";

const engagementData = [
  { day: "Mon", users: 45 },
  { day: "Tue", users: 62 },
  { day: "Wed", users: 58 },
  { day: "Thu", users: 71 },
  { day: "Fri", users: 68 },
  { day: "Sat", users: 40 },
  { day: "Sun", users: 35 },
];

const progressDistribution = [
  { range: "0–20%", count: 12 },
  { range: "21–40%", count: 18 },
  { range: "41–60%", count: 31 },
  { range: "61–80%", count: 24 },
  { range: "81–100%", count: 15 },
];

export default function AdminPage() {
  const [search, setSearch] = useState("");

  const filtered = adminStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = adminStudents.filter((s) => s.status === "active").length;
  const atRiskCount = adminStudents.filter((s) => s.status === "at-risk").length;

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-brand-blue" />
            <h1 className="text-2xl font-bold text-slate-100">Admin Dashboard</h1>
          </div>
          <p className="text-slate-400">LearnPath AI · Platform Overview</p>
        </div>
        <Badge variant="blue">Admin View</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Total Students"
          value={adminStudents.length}
          color="blue"
          change={12}
          changeLabel="this month"
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          label="Active Students"
          value={activeCount}
          color="green"
          icon={<Activity className="w-4 h-4" />}
        />
        <StatCard
          label="At-Risk Students"
          value={atRiskCount}
          color="red"
          icon={<AlertTriangle className="w-4 h-4" />}
        />
        <StatCard
          label="Avg. Progress"
          value={`${Math.round(adminStudents.reduce((a, s) => a + s.progress, 0) / adminStudents.length)}%`}
          color="yellow"
          icon={<TrendingUp className="w-4 h-4" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Engagement */}
        <div className="card p-5">
          <h3 className="font-semibold text-slate-100 mb-4">Daily Active Users</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={engagementData}>
              <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", fontSize: "12px" }}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Distribution */}
        <div className="card p-5">
          <h3 className="font-semibold text-slate-100 mb-4">Progress Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={progressDistribution}>
              <XAxis dataKey="range" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", fontSize: "12px" }}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <Bar dataKey="count" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-brand-green" />
          <h3 className="font-semibold text-slate-100">AI Platform Insights</h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { icon: "⚠️", title: "At-Risk Students", desc: "Rahul and Dev haven't logged in for 5+ days. Consider sending an engagement email.", urgency: "high" },
            { icon: "📈", title: "Top Performer", desc: "Sneha Patel is 90% complete with a 30-day streak. She's ready for advanced projects.", urgency: "positive" },
            { icon: "🎯", title: "Common Drop-off", desc: "55% of students stop progressing at the ML Core stage. Consider adding more beginner-friendly resources.", urgency: "medium" },
          ].map((insight, i) => (
            <div
              key={i}
              className={cn(
                "p-4 rounded-xl border",
                insight.urgency === "high" ? "bg-red-400/5 border-red-400/20" :
                insight.urgency === "positive" ? "bg-brand-green/5 border-brand-green/20" :
                "bg-yellow-400/5 border-yellow-400/20"
              )}
            >
              <span className="text-2xl">{insight.icon}</span>
              <h4 className={cn(
                "font-semibold text-sm mt-2 mb-1",
                insight.urgency === "high" ? "text-red-400" :
                insight.urgency === "positive" ? "text-brand-green" : "text-yellow-400"
              )}>
                {insight.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">{insight.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Student Table */}
      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/60">
          <h3 className="font-semibold text-slate-100">Student Management</h3>
          <div className="flex items-center gap-2 bg-slate-700/40 border border-slate-600 rounded-lg px-3 py-1.5">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-slate-300 placeholder-slate-500 outline-none w-40"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/60">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Progress</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Streak</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Last Active</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((student, i) => (
                <tr
                  key={student.id}
                  className={cn(
                    "hover:bg-slate-700/20 transition-colors",
                    i < filtered.length - 1 && "border-b border-slate-700/40"
                  )}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-200">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={student.progress} color={student.progress >= 60 ? "green" : "yellow"} className="w-20" />
                      <span className="text-xs text-slate-300 w-8 shrink-0">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className="text-sm text-slate-300">
                      {student.streak > 0 ? `🔥 ${student.streak}` : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-sm text-slate-400">{student.lastActive}</span>
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      variant={student.status === "active" ? "green" : student.status === "at-risk" ? "yellow" : "red"}
                    >
                      {student.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-700/60 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Status */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="w-4 h-4 text-slate-400" />
          <h3 className="font-semibold text-slate-100">System Status</h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "AI Mentor API", status: "operational", uptime: "99.9%" },
            { label: "Assessment Engine", status: "operational", uptime: "99.7%" },
            { label: "Content CDN", status: "degraded", uptime: "97.2%" },
          ].map((sys) => (
            <div key={sys.label} className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30">
              <div className={cn(
                "w-2.5 h-2.5 rounded-full shrink-0",
                sys.status === "operational" ? "bg-brand-green animate-pulse" : "bg-yellow-400"
              )} />
              <div>
                <p className="text-sm font-medium text-slate-200">{sys.label}</p>
                <p className="text-xs text-slate-400">Uptime: {sys.uptime}</p>
              </div>
              <Badge variant={sys.status === "operational" ? "green" : "yellow"} className="ml-auto">
                {sys.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
