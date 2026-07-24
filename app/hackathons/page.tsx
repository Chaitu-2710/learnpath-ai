"use client";

import { useState, useEffect } from "react";
import { hackathonsApi } from "@/lib/apiClient";
import type { Hackathon } from "@/lib/types";
import { Calendar, Users, Trophy, ExternalLink, Zap } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

export default function HackathonsPage() {
  const [hackathonsList, setHackathonsList] = useState<Hackathon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    hackathonsApi.list()
      .then(setHackathonsList)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const live = hackathonsList.filter((h) => h.status === "live");
  const upcoming = hackathonsList.filter((h) => h.status === "upcoming");

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Hackathons & Competitions</h1>
        <p className="text-slate-400 mt-1">Compete, build, and showcase your skills to the world</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          {/* Live NOW */}
          {live.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <h2 className="font-semibold text-slate-100">Live Now</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {live.map((h) => <HackathonCard key={h.id} hackathon={h} />)}
              </div>
            </div>
          )}

          {/* Upcoming */}
          {upcoming.length > 0 && (
            <div>
              <h2 className="font-semibold text-slate-100 mb-3 mt-4">Upcoming Competitions</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {upcoming.map((h) => <HackathonCard key={h.id} hackathon={h} />)}
              </div>
            </div>
          )}
          
          {live.length === 0 && upcoming.length === 0 && (
            <div className="text-center py-10">
               <p className="text-slate-400">No hackathons available right now.</p>
            </div>
          )}
        </>
      )}

      {/* CTA Banner */}
      <div className="card p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/30 to-orange-500/30 flex items-center justify-center shrink-0">
          <Zap className="w-6 h-6 text-yellow-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-100">Not ready yet?</h3>
          <p className="text-sm text-slate-400">Complete more of your learning roadmap to build the skills needed for hackathons.</p>
        </div>
        <button className="btn-primary shrink-0">View Roadmap</button>
      </div>
    </div>
  );
}

function HackathonCard({ hackathon }: { hackathon: typeof hackathons[0] }) {
  return (
    <div className={cn(
      "card p-5 hover:border-slate-600 transition-all flex flex-col gap-4",
      hackathon.status === "live" && "border-red-400/30 shadow-lg shadow-red-400/5"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            {hackathon.status === "live" && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-400/10 text-red-400 border border-red-400/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />LIVE
              </span>
            )}
            <Badge variant={hackathon.difficulty === "easy" ? "green" : hackathon.difficulty === "intermediate" ? "yellow" : "red"}>
              {hackathon.difficulty}
            </Badge>
          </div>
          <h3 className="font-bold text-slate-100 leading-snug">{hackathon.title}</h3>
          <p className="text-xs text-brand-blue mt-0.5">{hackathon.organizer}</p>
        </div>
        <div className="text-center shrink-0">
          <p className="text-lg font-bold text-yellow-400">{hackathon.prize}</p>
          <p className="text-[10px] text-slate-500">Prize Pool</p>
        </div>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed">{hackathon.description}</p>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(hackathon.startDate)} – {formatDate(hackathon.endDate)}
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          Team: {hackathon.teamSize}
        </span>
        <span className="flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-yellow-400" />
          {hackathon.prize}
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1">
        {hackathon.skills.map((s) => (
          <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-700/60 text-slate-300">{s}</span>
        ))}
      </div>

      {/* CTA */}
      {hackathon.registrationUrl && (
        <a
          href={hackathon.registrationUrl}
          className={cn(
            "btn-primary w-full justify-center",
            hackathon.status === "live" && "bg-red-400 hover:bg-red-300"
          )}
        >
          {hackathon.status === "live" ? "Join Now" : "Register"}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
}
