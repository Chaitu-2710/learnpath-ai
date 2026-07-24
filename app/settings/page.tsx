"use client";

import { useState, useEffect } from "react";
import {
  Bell, Eye, Share2, Target, Save, Lock, Loader2, CheckCircle2, AlertCircle
} from "lucide-react";
import { settingsApi } from "@/lib/apiClient";
import { cn } from "@/lib/utils";
import { SettingsSkeleton } from "@/components/ui/Skeletons";

interface Settings {
  email_notifications: boolean;
  streak_reminders: boolean;
  weekly_report: boolean;
  ai_suggestions: boolean;
  public_profile: boolean;
  share_progress: boolean;
  daily_goal_hours: number;
  learning_style: string;
}

const Toggle = ({ checked, onToggle }: { checked: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={cn(
      "relative w-11 h-6 rounded-full transition-colors",
      checked ? "bg-brand-green" : "bg-slate-600"
    )}
  >
    <div
      className={cn(
        "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",
        checked ? "translate-x-5" : "translate-x-0"
      )}
    />
  </button>
);

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Password change state
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [isChangingPw, setIsChangingPw] = useState(false);

  useEffect(() => {
    settingsApi.get().then(setSettings).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const toggle = (key: keyof Settings) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);
    try {
      await settingsApi.update(settings);
      showToast("success", "Settings saved successfully!");
    } catch (err: any) {
      showToast("error", err.message || "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!newPw || !currentPw) return;
    if (newPw !== confirmPw) {
      showToast("error", "Passwords do not match");
      return;
    }
    if (newPw.length < 6) {
      showToast("error", "Password must be at least 6 characters");
      return;
    }
    setIsChangingPw(true);
    try {
      await settingsApi.changePassword(currentPw, newPw);
      showToast("success", "Password changed successfully!");
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
    } catch (err: any) {
      showToast("error", err.message || "Failed to change password");
    } finally {
      setIsChangingPw(false);
    }
  };

  if (isLoading) return <SettingsSkeleton />;

  if (!settings) {
    return (
      <div className="p-6 text-center text-slate-400">Failed to load settings. Make sure the backend is running.</div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in max-w-2xl">
      {/* Toast */}
      {toast && (
        <div className={cn(
          "fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-slide-up",
          toast.type === "success" ? "bg-brand-green/10 border border-brand-green/30 text-brand-green" : "bg-red-400/10 border border-red-400/20 text-red-400"
        )}>
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-slate-100">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your preferences — all changes are saved to the cloud.</p>
      </div>

      {/* Notifications */}
      <div className="card p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Bell className="w-4 h-4 text-brand-blue" />
          <h2 className="font-semibold text-slate-100">Notifications</h2>
        </div>
        {([
          ["email_notifications", "Email Notifications", "Receive updates about your progress via email"],
          ["streak_reminders", "Streak Reminders", "Get daily reminders to maintain your learning streak"],
          ["weekly_report", "Weekly Report", "Receive a summary of your weekly progress"],
          ["ai_suggestions", "AI Suggestions", "Get personalized recommendations from your AI mentor"],
        ] as [keyof Settings, string, string][]).map(([key, label, desc]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-200">{label}</p>
              <p className="text-xs text-slate-400">{desc}</p>
            </div>
            <Toggle checked={!!settings[key]} onToggle={() => toggle(key)} />
          </div>
        ))}
      </div>

      {/* Privacy */}
      <div className="card p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Eye className="w-4 h-4 text-brand-green" />
          <h2 className="font-semibold text-slate-100">Privacy</h2>
        </div>
        {([
          ["public_profile", "Public Profile", "Allow others to see your profile and achievements"],
          ["share_progress", "Share Progress", "Show your learning progress on your public profile"],
        ] as [keyof Settings, string, string][]).map(([key, label, desc]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-200">{label}</p>
              <p className="text-xs text-slate-400">{desc}</p>
            </div>
            <Toggle checked={!!settings[key]} onToggle={() => toggle(key)} />
          </div>
        ))}
      </div>

      {/* Learning Preferences */}
      <div className="card p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Target className="w-4 h-4 text-yellow-400" />
          <h2 className="font-semibold text-slate-100">Learning Preferences</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-200">Daily Goal</p>
            <p className="text-xs text-slate-400">Hours per day target</p>
          </div>
          <select
            value={settings.daily_goal_hours}
            onChange={(e) => setSettings({ ...settings, daily_goal_hours: parseFloat(e.target.value) })}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-200 outline-none focus:border-brand-green/50"
          >
            {[0.5, 1, 1.5, 2, 2.5, 3, 4, 5].map((h) => (
              <option key={h} value={h}>{h}h/day</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-200">Learning Style</p>
            <p className="text-xs text-slate-400">How you prefer to learn</p>
          </div>
          <select
            value={settings.learning_style}
            onChange={(e) => setSettings({ ...settings, learning_style: e.target.value })}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-200 outline-none focus:border-brand-green/50"
          >
            {["Mixed", "Visual", "Reading", "Practice", "Video"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {isSaving ? "Saving..." : "Save All Settings"}
      </button>

      {/* Change Password */}
      <div className="card p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Lock className="w-4 h-4 text-brand-blue" />
          <h2 className="font-semibold text-slate-100">Change Password</h2>
        </div>
        <input
          type="password"
          placeholder="Current password"
          value={currentPw}
          onChange={(e) => setCurrentPw(e.target.value)}
          className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-brand-green/50 transition-colors"
        />
        <input
          type="password"
          placeholder="New password (min 6 chars)"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-brand-green/50 transition-colors"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-brand-green/50 transition-colors"
        />
        <button
          onClick={handleChangePassword}
          disabled={isChangingPw || !currentPw || !newPw || !confirmPw}
          className="btn-outline w-full flex items-center justify-center gap-2"
        >
          {isChangingPw ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
          {isChangingPw ? "Changing..." : "Change Password"}
        </button>
      </div>
    </div>
  );
}
