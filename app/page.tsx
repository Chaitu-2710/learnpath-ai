"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
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
  Loader2,
  Rocket,
  Bot,
  ArrowRight,
} from "lucide-react";
import { dashboardApi, getToken } from "@/lib/apiClient";
import { useAuth } from "@/lib/auth/AuthContext";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import StatCard from "@/components/ui/StatCard";
import { DashboardSkeleton } from "@/components/ui/Skeletons";
import GetStartedModal from "@/components/ui/GetStartedModal";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DEMO_SHOWCASE_DATA = {
  user: { name: "Guest Learner" },
  profile: {
    career_target: "AI & Machine Learning Engineer",
    streak: 5,
    level: 2,
    xp: 1250,
    rank: "AI Explorer",
    career_readiness: 72,
  },
  stats: {
    courses_active: 3,
    tasks_completed: 2,
    xp_today: 80,
  },
  tasks: [
    { id: "demo-1", title: "Complete Python Data Structures quiz", xp: 30, done: true },
    { id: "demo-2", title: "Study Supervised vs Unsupervised ML models", xp: 50, done: true },
    { id: "demo-3", title: "Build Customer Churn Prediction project", xp: 100, done: false },
    { id: "demo-4", title: "Ask AI Mentor for resume optimization feedback", xp: 20, done: false },
  ],
  recommended_courses: [
    { id: "demo-c1", title: "Machine Learning Fundamentals", provider: "Stanford / Coursera", duration: "12 hours", rating: 4.9, difficulty: "beginner", status: "in-progress" },
    { id: "demo-c2", title: "Deep Learning Specialization", provider: "DeepLearning.AI", duration: "25 hours", rating: 4.8, difficulty: "intermediate", status: "not-started" },
    { id: "demo-c3", title: "Python for Data Science & ML", provider: "LearnPath AI", duration: "10 hours", rating: 4.9, difficulty: "beginner", status: "completed" },
  ],
  achievements: [
    { id: "a1", title: "5-Day Streak", description: "Learned 5 days in a row", icon: "🔥" },
    { id: "a2", title: "First ML Model", description: "Built your first classifier", icon: "🤖" },
    { id: "a3", title: "Quiz Master", description: "Scored 90%+ on assessment", icon: "🏆" },
  ],
  career_progress_data: [
    { month: "Aug", score: 20 },
    { month: "Sep", score: 35 },
    { month: "Oct", score: 50 },
    { month: "Nov", score: 62 },
    { month: "Dec", score: 72 },
  ],
  radar_data: [
    { subject: "Python", A: 85 },
    { subject: "ML", A: 70 },
    { subject: "DL", A: 45 },
    { subject: "Math", A: 65 },
    { subject: "SQL", A: 80 },
  ],
};

import LandingPage from "@/components/landing/LandingPage";

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  // Load dashboard data for logged-in user
  useEffect(() => {
    const load = async () => {
      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const result = await dashboardApi.get();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const toggleTask = useCallback(async (id: string) => {
    if (!data) return;
    try {
      const result = await dashboardApi.toggleTask(id);
      setData((prev: any) => ({
        ...prev,
        tasks: prev.tasks.map((t: any) =>
          t.id === id ? { ...t, done: result.done } : t
        ),
        stats: {
          ...prev.stats,
          xp_today: prev.stats.xp_today + (result.done ? result.xp : -result.xp),
          tasks_completed: prev.stats.tasks_completed + (result.done ? 1 : -1),
        },
      }));
    } catch {
      // Ignore toggle errors
    }
  }, [data]);

  // If unauthenticated visitor, render the Apple-inspired Landing Page
  if (!user && typeof window !== "undefined" && !getToken()) {
    return <LandingPage />;
  }

  if (isLoading) return <DashboardSkeleton />;

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="card p-8 text-center max-w-md">
          <p className="text-red-400 mb-3">⚠️ {error || "Could not load dashboard"}</p>
          <p className="text-slate-400 text-sm">Make sure the backend server is running at <code className="text-brand-green">localhost:8000</code></p>
          <button onClick={() => window.location.reload()} className="btn-primary mt-4 mx-auto">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { profile, stats, tasks, recommended_courses, skills, radar_data, achievements, career_progress_data } = data;
  const currentUser = user || data?.user;
  const completedTasks = stats?.tasks_completed || 0;
  const totalTasks = tasks?.length || 0;
  const totalXpToday = stats?.xp_today || 0;

  const earnedAchievements = achievements?.slice(0, 3) || [];

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Public Header for Visitors before Login */}
      {!user && (
        <header className="flex items-center justify-between p-4 card border border-slate-700/80 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center shadow-lg shadow-brand-green/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base text-slate-100">LearnPath</span>
              <span className="font-extrabold text-base text-brand-green"> AI</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 transition-all"
            >
              Sign In
            </Link>
            <button
              onClick={() => setIsGetStartedOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-green text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-brand-green/20 flex items-center gap-1.5"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Get Started Free</span>
            </button>
          </div>
        </header>
      )}

      {/* Interactive Hero & Welcome Banner */}
      <div className="card p-6 lg:p-8 relative overflow-hidden border border-slate-700/80 bg-gradient-to-r from-slate-900 via-slate-800/90 to-slate-900 shadow-2xl shadow-brand-green/5">
        {/* Glow Accents */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-green/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Column: Greeting & Info */}
          <div className="space-y-4 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered Career & Learning Navigator</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-100 tracking-tight leading-tight">
                Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"},{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-emerald-400 to-brand-blue">
                  {(currentUser?.name || "Learner").split(" ")[0]}!
                </span>
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ready to accelerate your journey to becoming a{" "}
                <span className="text-brand-blue font-bold underline decoration-brand-blue/30 decoration-2 underline-offset-4">
                  {data?.profile?.career_target || "AI & Machine Learning Engineer"}
                </span>
                ?
              </p>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <Badge variant="green">🔥 {data?.profile?.streak || 0} Day Streak</Badge>
              <Badge variant="blue">⭐ Level {data?.profile?.level || 1}</Badge>
              <Badge variant="purple">🏆 {data?.profile?.rank || "Learner"}</Badge>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsGetStartedOpen(true)}
                className="px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-green to-emerald-500 text-slate-950 hover:from-emerald-400 hover:to-brand-green transition-all shadow-lg shadow-brand-green/25 hover:shadow-brand-green/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group"
              >
                <Rocket className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
                <span>Get Started with My Path</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="/ai-mentor"
                className="px-5 py-3 rounded-xl font-bold text-sm bg-slate-800/90 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-brand-blue" />
                <span>Ask AI Mentor</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual & XP Card */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Hero Image Visual Card */}
            <div className="relative w-44 h-36 lg:w-52 lg:h-40 rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl group bg-slate-800 hidden sm:block">
              <img
                src="/images/ai_learning_hero.png"
                alt="AI Learning Path"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='160' viewBox='0 0 200 160'%3E%3Crect width='200' height='160' fill='%231e293b'/%3E%3Ctext x='100' y='85' text-anchor='middle' fill='%2322c55e' font-size='32'%3E🚀%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green bg-slate-900/80 px-2 py-0.5 rounded-full border border-brand-green/30">
                  AI Roadmap v2.0
                </span>
              </div>
            </div>

            {/* Total XP Highlight Card */}
            <div className="flex flex-col justify-center items-center p-4 lg:p-5 card rounded-2xl border border-brand-green/20 bg-gradient-to-b from-slate-800 to-slate-900 min-w-[110px] shadow-xl text-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Total XP</span>
              <p className="text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400 mt-1">
                {(data?.profile?.xp || 0).toLocaleString()}
              </p>
              <span className="text-[10px] text-brand-blue font-semibold mt-1 bg-brand-blue/10 px-2 py-0.5 rounded-full">
                Top 5% Learner
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Career Readiness"
          value={`${Math.round(profile?.career_readiness || 0)}%`}
          color="green"
          change={8}
          changeLabel="this month"
          icon={<Target className="w-4 h-4" />}
        />
        <StatCard
          label="Courses Active"
          value={stats?.courses_active || 0}
          color="blue"
          icon={<BookOpen className="w-4 h-4" />}
        />
        <StatCard
          label="Tasks Today"
          value={`${completedTasks}/${totalTasks}`}
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
                <p className="text-xs text-slate-400 mt-0.5">{completedTasks} of {totalTasks} completed</p>
              </div>
              <ProgressBar value={totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0} color="green" className="w-24" />
            </div>
            <div className="space-y-2">
              {(tasks || []).map((task: any) => (
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
              {(!tasks || tasks.length === 0) && (
                <p className="text-slate-500 text-sm text-center py-4">No tasks for today. You&apos;re all caught up! 🎉</p>
              )}
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
              {(recommended_courses || []).map((course: any) => (
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
                      <Badge variant={course.difficulty === "beginner" ? "green" : course.difficulty === "intermediate" ? "yellow" : "red"}>
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
              {(!recommended_courses || recommended_courses.length === 0) && (
                <div className="text-center py-4">
                  <p className="text-slate-500 text-sm">No courses in progress yet.</p>
                  <Link href="/courses" className="text-brand-blue text-sm hover:underline mt-1 inline-block">
                    Browse courses →
                  </Link>
                </div>
              )}
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
              <RadarChart data={radar_data || []}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11 }} />
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
              {(skills || []).slice(0, 4).map((skill: any) => (
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
              <AreaChart data={career_progress_data || []}>
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
                <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} fill="url(#careerGrad)" />
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
              {earnedAchievements.map((ach: any) => (
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
              {earnedAchievements.length === 0 && (
                <p className="text-slate-500 text-xs">Complete tasks to earn achievements!</p>
              )}
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

      {/* Get Started Interactive Modal */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        initialGoal={data?.profile?.career_target}
        onSuccess={(updated) => {
          setData((prev: any) => ({
            ...prev,
            profile: {
              ...prev?.profile,
              career_target: updated.careerTarget,
            },
          }));
        }}
      />
    </div>
  );
}
