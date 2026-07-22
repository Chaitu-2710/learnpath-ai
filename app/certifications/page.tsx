"use client";

import { certifications } from "@/lib/data/mockData";
import { Award, CheckCircle2, ExternalLink, Clock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

const providerColors: Record<string, string> = {
  "Google / Coursera": "from-green-500/20 to-blue-500/20",
  "IBM / Coursera": "from-blue-600/20 to-cyan-500/20",
  "Google": "from-yellow-500/20 to-red-500/20",
  "Amazon Web Services": "from-orange-500/20 to-yellow-500/20",
};

export default function CertificationsPage() {
  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Certifications</h1>
        <p className="text-slate-400 mt-1">Earn industry-recognized credentials to boost your career</p>
      </div>

      {/* Stats */}
      <div className="flex gap-3 flex-wrap">
        <div className="card px-5 py-3">
          <p className="text-xl font-bold text-brand-green">{certifications.filter(c => c.status === "completed").length}</p>
          <p className="text-xs text-slate-400">Earned</p>
        </div>
        <div className="card px-5 py-3">
          <p className="text-xl font-bold text-brand-blue">{certifications.filter(c => c.status === "in-progress").length}</p>
          <p className="text-xs text-slate-400">In Progress</p>
        </div>
        <div className="card px-5 py-3">
          <p className="text-xl font-bold text-slate-400">{certifications.filter(c => c.status === "not-started").length}</p>
          <p className="text-xs text-slate-400">Planned</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className={cn(
              "card overflow-hidden hover:border-slate-600 transition-all",
              cert.status === "completed" && "border-brand-green/30",
              cert.status === "in-progress" && "border-brand-blue/30"
            )}
          >
            {/* Top gradient bar */}
            <div className={cn(
              "h-1",
              cert.status === "completed" ? "bg-brand-green" :
              cert.status === "in-progress" ? "bg-brand-blue" : "bg-slate-700"
            )} />

            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br",
                  providerColors[cert.provider] || "from-slate-700 to-slate-600"
                )}>
                  <Award className={cn(
                    "w-6 h-6",
                    cert.status === "completed" ? "text-brand-green" :
                    cert.status === "in-progress" ? "text-brand-blue" : "text-slate-400"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge variant={cert.difficulty === "beginner" ? "green" : cert.difficulty === "intermediate" ? "yellow" : "red"}>
                      {cert.difficulty}
                    </Badge>
                    {cert.status === "completed" && <Badge variant="green">✓ Earned</Badge>}
                    {cert.status === "in-progress" && <Badge variant="blue">In Progress</Badge>}
                  </div>
                  <h3 className="font-bold text-slate-100 leading-snug text-sm">{cert.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{cert.provider}</p>
                </div>
              </div>

              {/* Duration + date */}
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{cert.duration}</span>
                {cert.earnedAt && (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-brand-green" />
                    Earned {formatDate(cert.earnedAt)}
                  </span>
                )}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mt-3">
                {cert.skills.map((skill) => (
                  <span key={skill} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-700/60 text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Progress */}
              {cert.status === "in-progress" && (
                <div className="mt-3">
                  <ProgressBar value={cert.progress} color="blue" showLabel />
                </div>
              )}

              {/* CTA */}
              <div className="mt-4">
                {cert.status === "completed" && cert.credentialUrl ? (
                  <a href={cert.credentialUrl} className="btn-outline text-xs py-1.5">
                    <ExternalLink className="w-3.5 h-3.5" />View Credential
                  </a>
                ) : cert.status === "in-progress" ? (
                  <button className="btn-primary text-xs py-1.5">Continue</button>
                ) : (
                  <button className="btn-secondary text-xs py-1.5">Start Learning</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
