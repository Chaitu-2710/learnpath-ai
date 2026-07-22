"use client";

import { useState } from "react";
import { Bell, Lock, Shield, Trash2, Save, User, Palette, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        "relative w-10 h-5.5 rounded-full transition-all duration-300",
        enabled ? "bg-brand-green" : "bg-slate-600"
      )}
      style={{ height: "22px" }}
    >
      <div
        className={cn(
          "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300",
          enabled && "translate-x-5"
        )}
      />
    </button>
  );
}

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "learning", label: "Learning Preferences", icon: BookOpen },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
  { id: "account", label: "Account", icon: Lock },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    streakReminders: true,
    weeklyReport: true,
    aiSuggestions: true,
    publicProfile: false,
    shareProgress: true,
    darkMode: true,
    dailyGoalHours: 2,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4 lg:p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-4xl">
        {/* Sidebar */}
        <aside className="lg:w-52 shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-hidden">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                  activeSection === id
                    ? "bg-brand-green/10 text-brand-green border border-brand-green/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/40"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />{label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {activeSection === "profile" && (
            <div className="card p-6 space-y-5">
              <h2 className="font-semibold text-slate-100">Profile Information</h2>
              {[
                { label: "Full Name", value: "Arjun Sharma", type: "text" },
                { label: "Email", value: "arjun@example.com", type: "email" },
                { label: "Career Target", value: "Machine Learning Engineer", type: "text" },
                { label: "University", value: "VIT University", type: "text" },
                { label: "Graduation Year", value: "2026", type: "text" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="w-full bg-slate-700/40 border border-slate-600 rounded-lg px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-brand-green/50 transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Learning Goal</label>
                <textarea
                  defaultValue="Become a Machine Learning Engineer at a top tech company"
                  rows={2}
                  className="w-full bg-slate-700/40 border border-slate-600 rounded-lg px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-brand-green/50 transition-colors resize-none"
                />
              </div>
              <button className="btn-primary"><Save className="w-4 h-4" />Save Changes</button>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="card p-6 space-y-5">
              <h2 className="font-semibold text-slate-100">Notification Preferences</h2>
              {[
                { key: "emailNotifications" as const, label: "Email Notifications", desc: "Receive learning updates via email" },
                { key: "streakReminders" as const, label: "Streak Reminders", desc: "Daily reminders to maintain your learning streak" },
                { key: "weeklyReport" as const, label: "Weekly Progress Report", desc: "Get a summary of your progress every Sunday" },
                { key: "aiSuggestions" as const, label: "AI Recommendations", desc: "Personalized course and project suggestions from AI" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-slate-700/40 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                  </div>
                  <Toggle enabled={settings[key] as boolean} onChange={() => toggle(key)} />
                </div>
              ))}
            </div>
          )}

          {activeSection === "learning" && (
            <div className="card p-6 space-y-5">
              <h2 className="font-semibold text-slate-100">Learning Preferences</h2>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Daily Learning Goal</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range" min={0.5} max={8} step={0.5}
                    value={settings.dailyGoalHours}
                    onChange={(e) => setSettings(prev => ({ ...prev, dailyGoalHours: Number(e.target.value) }))}
                    className="flex-1 accent-brand-green"
                  />
                  <span className="text-sm font-semibold text-brand-green w-16">{settings.dailyGoalHours} hrs/day</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Preferred Learning Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Video-first", "Reading-first", "Project-based", "Mixed"].map((style) => (
                    <button
                      key={style}
                      className={cn(
                        "py-2 rounded-lg text-sm border transition-all",
                        style === "Mixed"
                          ? "border-brand-green/40 bg-brand-green/10 text-brand-green"
                          : "border-slate-600 text-slate-400 hover:border-slate-400"
                      )}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "privacy" && (
            <div className="card p-6 space-y-5">
              <h2 className="font-semibold text-slate-100">Privacy & Security</h2>
              {[
                { key: "publicProfile" as const, label: "Public Profile", desc: "Allow others to view your profile and achievements" },
                { key: "shareProgress" as const, label: "Share Progress", desc: "Share learning milestones on your public profile" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-slate-700/40 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                  </div>
                  <Toggle enabled={settings[key] as boolean} onChange={() => toggle(key)} />
                </div>
              ))}
              <button className="btn-outline w-full justify-center">Change Password</button>
            </div>
          )}

          {activeSection === "account" && (
            <div className="card p-6 space-y-5">
              <h2 className="font-semibold text-slate-100">Account Management</h2>
              <div className="p-4 rounded-lg bg-red-400/5 border border-red-400/20">
                <div className="flex items-start gap-3">
                  <Trash2 className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-400">Delete Account</h3>
                    <p className="text-xs text-slate-400 mt-1 mb-3">
                      This action is permanent and cannot be undone. All your progress, achievements, and data will be lost.
                    </p>
                    <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-400/10 text-red-400 border border-red-400/20 hover:bg-red-400 hover:text-white transition-all">
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeSection === "appearance") && (
            <div className="card p-6 space-y-5">
              <h2 className="font-semibold text-slate-100">Appearance</h2>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-3">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: "Dark", active: true, bg: "bg-slate-900", accent: "bg-brand-green" },
                    { name: "Light", active: false, bg: "bg-slate-100", accent: "bg-brand-green" },
                    { name: "System", active: false, bg: "bg-gradient-to-r from-slate-900 to-slate-100", accent: "bg-brand-green" },
                  ].map(({ name, active, bg }) => (
                    <button
                      key={name}
                      className={cn(
                        "p-3 rounded-xl border transition-all text-center",
                        active ? "border-brand-green/40 bg-brand-green/5" : "border-slate-700 hover:border-slate-500"
                      )}
                    >
                      <div className={cn("w-full h-12 rounded-lg mb-2", bg)} />
                      <p className={cn("text-xs font-medium", active ? "text-brand-green" : "text-slate-400")}>{name}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Accent Color</label>
                <div className="flex gap-3">
                  {["#22c55e", "#3b82f6", "#a855f7", "#f59e0b", "#ef4444"].map((color) => (
                    <button
                      key={color}
                      className={cn("w-8 h-8 rounded-full border-2", color === "#22c55e" ? "border-white" : "border-transparent")}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
