"use client";

import { useState } from "react";
import { roadmapStages } from "@/lib/data/mockData";
import type { RoadmapStage, RoadmapTopic } from "@/lib/types";
import {
  CheckCircle2,
  Circle,
  Lock,
  ChevronDown,
  ChevronUp,
  Trophy,
  Clock,
  BookOpen,
  FolderKanban,
  Award,
  ClipboardCheck,
  Zap,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

const levelColors: Record<string, string> = {
  beginner: "text-brand-green border-brand-green/40 bg-brand-green/10",
  intermediate: "text-yellow-400 border-yellow-400/40 bg-yellow-400/10",
  advanced: "text-brand-blue border-brand-blue/40 bg-brand-blue/10",
  expert: "text-purple-400 border-purple-400/40 bg-purple-400/10",
};

const topicTypeIcon: Record<string, React.ReactNode> = {
  concept: <BookOpen className="w-3.5 h-3.5" />,
  project: <FolderKanban className="w-3.5 h-3.5" />,
  assessment: <ClipboardCheck className="w-3.5 h-3.5" />,
  certification: <Award className="w-3.5 h-3.5" />,
};

function TopicRow({ topic }: { topic: RoadmapTopic }) {
  const isLocked = topic.status === "locked";
  return (
    <div className={cn(
      "flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors",
      isLocked ? "opacity-50" : "hover:bg-slate-700/30"
    )}>
      {topic.status === "completed" ? (
        <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
      ) : topic.status === "in-progress" ? (
        <div className="w-4 h-4 rounded-full border-2 border-brand-blue flex items-center justify-center shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
        </div>
      ) : topic.status === "locked" ? (
        <Lock className="w-4 h-4 text-slate-600 shrink-0" />
      ) : (
        <Circle className="w-4 h-4 text-slate-500 shrink-0" />
      )}
      <span className={cn(
        "flex-1 text-sm",
        topic.status === "completed" ? "text-slate-400 line-through" : "text-slate-200"
      )}>
        {topic.title}
      </span>
      <div className="flex items-center gap-2 shrink-0">
        <span className={cn("text-slate-400", topicTypeIcon[topic.type] ? "" : "")}>{topicTypeIcon[topic.type]}</span>
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />{topic.duration}
        </span>
      </div>
    </div>
  );
}

function StageCard({ stage, index }: { stage: RoadmapStage; index: number }) {
  const [open, setOpen] = useState(stage.status === "in-progress");
  const completed = stage.topics.filter((t) => t.status === "completed").length;
  const progress = Math.round((completed / stage.topics.length) * 100);
  const isLocked = stage.status === "locked";

  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className={cn(
          "w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 z-10",
          stage.status === "completed" ? "border-brand-green bg-brand-green/10" :
          stage.status === "in-progress" ? "border-brand-blue bg-brand-blue/10 animate-pulse-slow" :
          "border-slate-600 bg-slate-800"
        )}>
          {stage.status === "completed" ? (
            <CheckCircle2 className="w-5 h-5 text-brand-green" />
          ) : stage.status === "in-progress" ? (
            <Zap className="w-5 h-5 text-brand-blue" />
          ) : isLocked ? (
            <Lock className="w-4 h-4 text-slate-600" />
          ) : (
            <Circle className="w-4 h-4 text-slate-500" />
          )}
        </div>
        {index < roadmapStages.length - 1 && (
          <div className={cn(
            "w-0.5 flex-1 mt-2",
            stage.status === "completed" ? "bg-brand-green/40" : "bg-slate-700"
          )} />
        )}
      </div>

      {/* Card */}
      <div className={cn(
        "flex-1 card mb-6 transition-all",
        isLocked && "opacity-60",
        stage.status === "in-progress" && "border-brand-blue/40 shadow-lg shadow-brand-blue/5"
      )}>
        <button
          className="w-full p-5 text-left"
          onClick={() => !isLocked && setOpen(!open)}
          disabled={isLocked}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full border", levelColors[stage.level])}>
                  {stage.level.charAt(0).toUpperCase() + stage.level.slice(1)}
                </span>
                {stage.status === "in-progress" && <Badge variant="blue">In Progress</Badge>}
                {stage.status === "completed" && <Badge variant="green">Completed</Badge>}
              </div>
              <h3 className="text-base font-bold text-slate-100 mt-2">{stage.title}</h3>
              <p className="text-sm text-slate-400 mt-0.5">{stage.description}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />{stage.estimatedDuration}
                </span>
                <span>{stage.topics.length} topics</span>
                {stage.milestone && (
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Trophy className="w-3 h-3" />{stage.milestone}
                  </span>
                )}
              </div>
              {stage.status !== "locked" && stage.status !== "not-started" && (
                <div className="mt-3">
                  <ProgressBar value={progress} color={stage.status === "completed" ? "green" : "blue"} />
                  <p className="text-xs text-slate-400 mt-1">{completed}/{stage.topics.length} completed</p>
                </div>
              )}
            </div>
            {!isLocked && (
              <div className="shrink-0 text-slate-400">
                {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            )}
          </div>
        </button>

        {/* Expanded topics */}
        {open && !isLocked && (
          <div className="border-t border-slate-700/60 px-5 py-3 space-y-0.5">
            {stage.topics.map((topic) => (
              <TopicRow key={topic.id} topic={topic} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  const overallProgress = Math.round(
    roadmapStages.reduce((acc, s) => {
      const c = s.topics.filter((t) => t.status === "completed").length;
      return acc + c;
    }, 0) /
    roadmapStages.reduce((acc, s) => acc + s.topics.length, 0) * 100
  );

  return (
    <div className="p-4 lg:p-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Learning Roadmap</h1>
          <p className="text-slate-400 mt-1">Your path to becoming a Machine Learning Engineer</p>
        </div>
        <div className="card px-5 py-4 text-center min-w-[140px]">
          <p className="text-2xl font-bold text-brand-green">{overallProgress}%</p>
          <p className="text-xs text-slate-400 mt-0.5">Overall Progress</p>
          <ProgressBar value={overallProgress} color="green" className="mt-2" />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-8 text-xs text-slate-400">
        <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-green" />Completed</span>
        <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-brand-blue" />In Progress</span>
        <span className="flex items-center gap-2"><Circle className="w-4 h-4 text-slate-500" />Not Started</span>
        <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-slate-600" />Locked</span>
      </div>

      {/* Roadmap */}
      <div className="max-w-2xl">
        {roadmapStages.map((stage, i) => (
          <StageCard key={stage.id} stage={stage} index={i} />
        ))}
      </div>
    </div>
  );
}
