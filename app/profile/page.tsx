"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { skills, achievements, certifications, courses } from "@/lib/data/mockData";
import { Flame, Trophy, BookOpen, Award, Edit3, Share2, TrendingUp, LogOut, ShieldCheck } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

const earnedAchievements = achievements.filter((a) => !a.locked);
const lockedAchievements = achievements.filter((a) => a.locked);

export default function ProfilePage() {
  const { user, logout, isAdmin } = useAuth();

  const xpToNextLevel = 500;
  const xp = user?.xp || 3450;
  const level = user?.level || 7;
  const xpProgress = xp % xpToNextLevel;

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in max-w-4xl">
      {/* Profile Card */}
      <div className="card p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-brand-blue/5 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center text-white text-2xl font-bold">
              {getInitials(user?.name)}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-green border-2 border-slate-800 flex items-center justify-center">
              <span className="text-[10px] font-bold text-slate-900">{level}</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-xl font-bold text-slate-100">{user?.name || "Student"}</h1>
              {isAdmin && (
                <Badge variant="blue">
                  <ShieldCheck className="w-3 h-3 inline mr-1" /> Admin
                </Badge>
              )}
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-700/60 transition-colors">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-sm text-brand-green font-medium mb-1">{user?.rank || "AI Explorer"}</p>
            <p className="text-xs text-slate-400 mb-3">{user?.goal || "Become a Machine Learning Engineer"}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="green">🔥 {user?.streak || 0} Day Streak</Badge>
              <Badge variant="blue">⭐ Level {level}</Badge>
              <Badge variant="yellow">🏆 {xp.toLocaleString()} XP</Badge>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full sm:w-auto">
            <button className="btn-outline shrink-0 justify-center">
              <Share2 className="w-4 h-4" />Share
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg font-semibold text-sm bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-5 pt-5 border-t border-slate-700/60 relative">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-slate-400">Level {level} → Level {level + 1}</span>
            <span className="text-xs text-slate-300 font-medium">{xpProgress} / {xpToNextLevel} XP</span>
          </div>
          <ProgressBar value={(xpProgress / xpToNextLevel) * 100} color="blue" size="md" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Courses Completed", value: courses.filter(c => c.status === "completed").length, icon: BookOpen, color: "text-brand-blue" },
          { label: "Achievements", value: earnedAchievements.length, icon: Trophy, color: "text-yellow-400" },
          { label: "Learning Streak", value: `${user?.streak || 0} days`, icon: Flame, color: "text-orange-400" },
          { label: "Certifications", value: certifications.filter(c => c.status === "completed").length, icon: Award, color: "text-brand-green" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card p-4 text-center">
              <Icon className={cn("w-6 h-6 mx-auto mb-2", s.color)} />
              <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skills */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-brand-green" />
            <h2 className="font-semibold text-slate-100">Skill Levels</h2>
          </div>
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-200">{skill.name}</span>
                    <Badge variant="gray">{skill.category}</Badge>
                  </div>
                  <span className="text-xs font-semibold text-slate-300">{skill.level}%</span>
                </div>
                <ProgressBar
                  value={skill.level}
                  color={skill.level >= 70 ? "green" : skill.level >= 50 ? "blue" : "yellow"}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <h2 className="font-semibold text-slate-100">Achievements</h2>
            <span className="text-xs text-slate-500 ml-auto">{earnedAchievements.length}/{achievements.length}</span>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Earned</p>
            <div className="grid grid-cols-1 gap-2">
              {earnedAchievements.map((ach) => (
                <div key={ach.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-700/30">
                  <span className="text-2xl">{ach.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">{ach.title}</p>
                    <p className="text-xs text-slate-500">{ach.description}</p>
                  </div>
                  <Badge variant="green" className="ml-auto">Earned</Badge>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 uppercase tracking-wider pt-2">Locked</p>
            <div className="grid grid-cols-1 gap-2">
              {lockedAchievements.map((ach) => (
                <div key={ach.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-700/10 opacity-50">
                  <span className="text-2xl grayscale">{ach.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-400">{ach.title}</p>
                    <p className="text-xs text-slate-600">{ach.description}</p>
                  </div>
                  <Badge variant="gray" className="ml-auto">Locked</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Learning History */}
      <div className="card p-5">
        <h2 className="font-semibold text-slate-100 mb-4">Learning History</h2>
        <div className="space-y-3">
          {[
            { date: "Today", event: "Completed Python OOP module", xp: 50, icon: "📗" },
            { date: "Today", event: "Solved 2 LeetCode problems", xp: 30, icon: "⚔️" },
            { date: "Yesterday", event: "Watched ML Fundamentals video", xp: 25, icon: "🎬" },
            { date: "Jan 18", event: "Completed SQL module", xp: 60, icon: "🗄️" },
            { date: "Jan 15", event: "Earned Code Warrior achievement", xp: 100, icon: "🏆" },
            { date: "Jan 10", event: "Started IBM ML Certificate", xp: 20, icon: "🎓" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-700/40 last:border-0">
              <span className="text-xl shrink-0">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-slate-200">{item.event}</p>
                <p className="text-xs text-slate-500">{item.date}</p>
              </div>
              <Badge variant="green">+{item.xp} XP</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
