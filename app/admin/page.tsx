"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search, Users, TrendingUp, AlertTriangle, Award, Loader2, RefreshCw
} from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import StatCard from "@/components/ui/StatCard";
import { adminApi } from "@/lib/apiClient";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/lib/hooks/useDebounce";

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const loadData = useCallback(async (searchTerm?: string) => {
    try {
      const [studentsData, statsData] = await Promise.all([
        adminApi.students(searchTerm),
        adminApi.stats(),
      ]);
      setStudents(studentsData);
      setStats(statsData);
    } catch (err: any) {
      setError(err.message || "Failed to load admin data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(debouncedSearch || undefined);
  }, [debouncedSearch, loadData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-brand-green animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-400 mb-4">⚠️ {error}</p>
        <button onClick={() => { setError(""); setIsLoading(true); loadData(); }} className="btn-primary mx-auto">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Admin Dashboard</h1>
          <p className="text-slate-400 mt-1">Student management and platform analytics</p>
        </div>
        <button
          onClick={() => { setIsLoading(true); loadData(debouncedSearch || undefined); }}
          className="btn-outline flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Total Students" value={stats.total_students} color="blue" icon={<Users className="w-4 h-4" />} />
          <StatCard label="Active Students" value={stats.active_students} color="green" icon={<TrendingUp className="w-4 h-4" />} />
          <StatCard label="At Risk" value={stats.at_risk_students} color="red" icon={<AlertTriangle className="w-4 h-4" />} />
          <StatCard label="Avg Progress" value={`${stats.avg_progress}%`} color="yellow" icon={<Award className="w-4 h-4" />} />
        </div>
      )}

      {/* Students Table */}
      <div className="card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="font-semibold text-slate-100">All Students ({students.length})</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students..."
              className="pl-9 pr-4 py-2 bg-slate-700/40 border border-slate-600 rounded-lg text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-brand-green/50 w-60"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-xs font-medium text-slate-400 pb-3">Student</th>
                <th className="text-left text-xs font-medium text-slate-400 pb-3">Progress</th>
                <th className="text-left text-xs font-medium text-slate-400 pb-3 hidden md:table-cell">Streak</th>
                <th className="text-left text-xs font-medium text-slate-400 pb-3 hidden md:table-cell">Last Active</th>
                <th className="text-left text-xs font-medium text-slate-400 pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-green/20 to-brand-blue/20 flex items-center justify-center text-sm font-bold text-brand-green">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={student.progress} color={student.progress >= 70 ? "green" : student.progress >= 40 ? "yellow" : "red"} className="w-20" />
                      <span className="text-xs text-slate-400 w-8">{Math.round(student.progress)}%</span>
                    </div>
                  </td>
                  <td className="py-3 hidden md:table-cell">
                    <span className="text-slate-300">🔥 {student.streak}d</span>
                  </td>
                  <td className="py-3 hidden md:table-cell">
                    <span className="text-slate-400 text-xs">{student.last_active || "Never"}</span>
                  </td>
                  <td className="py-3">
                    <Badge variant={
                      student.status === "active" ? "green" :
                      student.status === "at-risk" ? "red" : "gray"
                    }>
                      {student.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {students.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              {search ? "No students match your search" : "No students registered yet"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
