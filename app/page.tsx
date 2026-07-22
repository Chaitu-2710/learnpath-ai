"use client";

import { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Flame,
  Trophy,
  Target,
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Star,
  Zap,
} from "lucide-react";
import {
  currentUser,
  radarData,
  todayTasks,
  courses,
  achievements,
  careerProgressData,
  skills,
} from "@/lib/data/mockData";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import StatCard from "@/components/ui/StatCard";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [tasks, setTasks] = useState(todayTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const completedTasks = tasks.filter((t) => t.done).length;
  const totalXpToday = tasks.filter((t) => t.done).reduce((a, t) => a + t.xp, 0);

  const recommendedCourses = courses.filter((c) => c.status !== "completed").slice(0, 3);
  const earnedAchievements = achievements.filter((a) => !a.locked).slice(0, 3);

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="card p-5 lg:p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 via-transparent to-brand-blue/5 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">👋</span>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-100">
                Good evening, {currentUser.name.split(" ")[0]}!
              </h1>
            </div>
            <p className="text-slate-400 text-sm max-w-lg">
              You&apos;re on a{" "}
              <span className="text-brand-green font-semibold">
                {currentUser.streak}-day streak
              </span>
              . Keep it up! Your goal:{" "}
              <span className="text-brand-blue font-medium">{currentUser.careerTarget}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="green">🔥 {currentUser.streak} Day Streak</Badge>
              <Badge variant="blue">⭐ Level {currentUser.level}</Badge>
              <Badge variant="purple">🏆 {currentUser.rank}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-center p-4 card rounded-xl min-w-[90px]">
              <p className="text-2xl font-bold text-brand-green">{currentUser.xp.toLocaleString()}</p>
              <p className="text-xs text-slate-400 mt-0.5">Total XP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Career Readiness"
          value="63%"
          color="green"
          change={8}
          changeLabel="this month"
          icon={<Target className="w-4 h-4" />}
        />
        <StatCard
          label="Courses Active"
          value="2"
          color="blue"
          icon={<BookOpen className="w-4 h-4" />}
        />
        <StatCard
          label="Tasks Today"
          value={`${completedTasks}/${tasks.length}`}
          color="yellow"
          icon={<CheckCircle2 className="w-4 h-4" />}
        />
        <StatCard
          label="XP Earned Today"
          value={`+${totalXpToday}`}
          color="purple"
          change={12}
          icon={<Zap className="w-4 h-4" />}
        />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Tasks + AI Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Tasks */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-slate-100">Today&apos;s Tasks</h2>
                <p className="text-xs text-slate-400 mt-0.5">{completedTasks} of {tasks.length} completed</p>
              </div>
              <ProgressBar value={(completedTasks / tasks.length) * 100} color="green" className="w-24" />
            </div>
            <div className="space-y-2">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/40 transition-colors group text-left"
                >
                  {task.done ? (
                    <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 group-hover:text-slate-300 shrink-0 transition-colors" />
                  )}
                  <span className={cn("flex-1 text-sm", task.done ? "text-slate-500 line-through" : "text-slate-200")}>
                    {task.title}
                  </span>
                  <Badge variant={task.done ? "green" : "gray"}>+{task.xp} XP</Badge>
                </button>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-green" />
                <h2 className="font-semibold text-slate-100">AI Recommended for You</h2>
              </div>
              <Link href="/courses" className="text-xs text-brand-blue hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recommendedCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex gap-3 p-3 rounded-xl hover:bg-slate-700/40 transition-colors cursor-pointer group"
                >
                  <div className="w-20 h-14 rounded-lg bg-slate-700 overflow-hidden shrink-0">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='56' viewBox='0 0 80 56'%3E%3Crect width='80' height='56' fill='%231e293b'/%3E%3Ctext x='40' y='32' text-anchor='middle' fill='%2394a3b8' font-size='10'%3E📚%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 line-clamp-1 group-hover:text-brand-green transition-colors">
                      {course.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{course.provider} · {course.duration}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center gap-0.5 text-yellow-400">
                        <Star className="w-3 h-3 fill-yellow-400" />
                        <span className="text-[11px]">{course.rating}</span>
                      </div>
                      <Badge
                        variant={course.difficulty === "beginner" ? "green" : course.difficulty === "intermediate" ? "yellow" : "red"}
                      >
                        {course.difficulty}
                      </Badge>
                      {course.status === "in-progress" && (
                        <Badge variant="blue">In Progress</Badge>
                      )}
                    </div>
                    {course.status === "in-progress" && (
                      <ProgressBar value={course.progress} color="blue" className="mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Skills + Achievements + Progress */}
        <div className="space-y-6">
          {/* Skill Radar */}
          <div className="card p-5">
            <h2 className="font-semibold text-slate-100 mb-1">Skill Overview</h2>
            <p className="text-xs text-slate-400 mb-3">Your current competency levels</p>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {skills.slice(0, 4).map((skill) => (
                <div key={skill.name} className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 w-20 shrink-0">{skill.name}</span>
                  <ProgressBar value={skill.level} color="green" className="flex-1" />
                  <span className="text-xs text-slate-300 w-8 text-right shrink-0">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Progress Chart */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-brand-blue" />
              <h2 className="font-semibold text-slate-100">Career Progress</h2>
            </div>
            <p className="text-xs text-slate-400 mb-3">Readiness score over time</p>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={careerProgressData}>
                <defs>
                  <linearGradient id="careerGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", fontSize: "12px" }}
                  labelStyle={{ color: "#94a3b8" }}
                  itemStyle={{ color: "#3b82f6" }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#careerGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Achievements */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <h2 className="font-semibold text-slate-100">Achievements</h2>
              </div>
              <Link href="/profile" className="text-xs text-brand-blue hover:underline">
                View all
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {earnedAchievements.map((ach) => (
                <div
                  key={ach.id}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-700/40 hover:bg-slate-700/60 transition-colors cursor-default group"
                  title={ach.description}
                >
                  <span className="text-xl">{ach.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-200">{ach.title}</p>
                    <p className="text-[10px] text-slate-500">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Mentor CTA */}
          <Link href="/ai-mentor">
            <div className="card p-5 cursor-pointer hover:border-brand-green/50 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-transparent pointer-events-none" />
              <div className="flex items-center gap-3 relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-100 group-hover:text-brand-green transition-colors">
                    Ask AI Mentor
                  </p>
                  <p className="text-xs text-slate-400">Get personalized guidance</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-brand-green transition-colors" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
