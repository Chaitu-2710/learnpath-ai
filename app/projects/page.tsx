"use client";

import { projects } from "@/lib/data/mockData";
import type { Project } from "@/lib/types";
import { Clock, TrendingUp, Plus, CheckCircle2, FolderKanban } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ProjectsPage() {
  const [added, setAdded] = useState<string[]>(["p1", "p4"]);

  const toggleAdd = (id: string) => {
    setAdded((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Project Recommendations</h1>
        <p className="text-slate-400 mt-1">AI-recommended projects to build your portfolio and career value</p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "In Progress", value: projects.filter(p => p.status === "in-progress").length, color: "text-brand-blue" },
          { label: "Completed", value: projects.filter(p => p.status === "completed").length, color: "text-brand-green" },
          { label: "Available", value: projects.filter(p => p.status === "not-started").length, color: "text-slate-300" },
        ].map((s) => (
          <div key={s.label} className="card px-5 py-3">
            <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isAdded={added.includes(project.id)}
            onToggle={() => toggleAdd(project.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  isAdded,
  onToggle,
}: {
  project: Project;
  isAdded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn(
      "card p-5 flex flex-col gap-4 hover:border-slate-600 transition-all duration-200 hover:shadow-xl hover:shadow-slate-900/40",
      project.status === "in-progress" && "border-brand-blue/30",
      project.status === "completed" && "border-brand-green/30",
    )}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="w-10 h-10 rounded-xl bg-slate-700/60 flex items-center justify-center shrink-0">
          <FolderKanban className="w-5 h-5 text-slate-300" />
        </div>
        <div className="flex gap-1.5 flex-wrap justify-end">
          <Badge variant={project.difficulty === "easy" ? "green" : project.difficulty === "medium" ? "yellow" : "red"}>
            {project.difficulty}
          </Badge>
          {project.status === "completed" && <Badge variant="green">Done</Badge>}
          {project.status === "in-progress" && <Badge variant="blue">Active</Badge>}
        </div>
      </div>

      {/* Title + Description */}
      <div>
        <h3 className="font-bold text-slate-100 leading-snug">{project.title}</h3>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed">{project.description}</p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />{project.estimatedTime}
        </span>
        <span className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-brand-green" />
          Career value: <span className="text-brand-green font-semibold">{project.careerValue}%</span>
        </span>
      </div>

      {/* Career value bar */}
      <ProgressBar value={project.careerValue} color="green" size="xs" />

      {/* Required Skills */}
      <div>
        <p className="text-xs text-slate-500 mb-1.5">Required Skills</p>
        <div className="flex flex-wrap gap-1">
          {project.requiredSkills.map((skill) => (
            <span key={skill} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-700/60 text-slate-300 border border-slate-600/40">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="blue">{tag}</Badge>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onToggle}
        className={cn(
          "mt-auto w-full py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2",
          project.status === "completed"
            ? "bg-brand-green/10 text-brand-green border border-brand-green/20 cursor-not-allowed"
            : isAdded
            ? "bg-brand-green/10 text-brand-green border border-brand-green/30 hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/30"
            : "bg-slate-700/60 text-slate-300 hover:bg-brand-green/10 hover:text-brand-green border border-slate-600 hover:border-brand-green/30"
        )}
        disabled={project.status === "completed"}
      >
        {project.status === "completed" ? (
          <><CheckCircle2 className="w-4 h-4" /> Completed</>
        ) : isAdded ? (
          <><CheckCircle2 className="w-4 h-4" /> Added to Roadmap</>
        ) : (
          <><Plus className="w-4 h-4" /> Add to Roadmap</>
        )}
      </button>
    </div>
  );
}
