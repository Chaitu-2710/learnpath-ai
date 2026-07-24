"use client";

import { useState, useEffect } from "react";
import { roadmapApi } from "@/lib/apiClient";
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
import { RoadmapSkeleton } from "@/components/ui/Skeletons";

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
          <Clock className="w-3 h-3" />{topic.estimatedHours ? `${topic.estimatedHours}h` : topic.duration || "2h"}
        </span>
      </div>
    </div>
  );
}

function StageCard({
  stage,
  index,
  isLast,
  onTopicToggle,
}: {
  stage: RoadmapStage;
  index: number;
  isLast?: boolean;
  onTopicToggle?: (stageId: string, topicId: string, currentStatus: string) => void;
}) {
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
        {!isLast && (
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
                <Badge variant={levelColors[stage.level] ? (stage.level as any) : "blue"}>{stage.level}</Badge>
                <h3 className="font-bold text-slate-100 text-lg">{stage.title}</h3>
              </div>
              <p className="text-sm text-slate-400 mt-1">{stage.description}</p>
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

        {/* Body */}
        {open && !isLocked && (
          <div className="p-4 bg-slate-700/20 space-y-1">
            {stage.topics.map((topic) => (
              <div key={topic.id} onClick={() => onTopicToggle && onTopicToggle(stage.id, topic.id, topic.status)} className="cursor-pointer">
                <TopicRow topic={topic} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const DEMO_ROADMAP_STAGES: RoadmapStage[] = [
  {
    id: "stage-1",
    title: "Stage 1: Python & Data Science Foundations",
    description: "Master Python programming, NumPy, Pandas, and basic statistics for Machine Learning.",
    order: 1,
    level: "beginner",
    estimatedWeeks: 4,
    status: "in-progress",
    topics: [
      { id: "t1", title: "Python Basics & OOP Principles", status: "completed", estimatedHours: 8, xp: 50, type: "concept" },
      { id: "t2", title: "Data Wrangling with Pandas & NumPy", status: "in-progress", estimatedHours: 12, xp: 80, type: "concept" },
      { id: "t3", title: "Exploratory Data Analysis Project", status: "not-started", estimatedHours: 15, xp: 120, type: "project" },
    ],
  },
  {
    id: "stage-2",
    title: "Stage 2: Core Machine Learning Algorithms",
    description: "Supervised & Unsupervised Learning models, Regression, Classification, and Scikit-Learn.",
    order: 2,
    level: "intermediate",
    estimatedWeeks: 6,
    status: "not-started",
    topics: [
      { id: "t4", title: "Linear & Logistic Regression", status: "not-started", estimatedHours: 10, xp: 70, type: "concept" },
      { id: "t5", title: "Decision Trees & XGBoost Classifier", status: "not-started", estimatedHours: 14, xp: 100, type: "concept" },
      { id: "t6", title: "Customer Churn Prediction Model", status: "not-started", estimatedHours: 20, xp: 150, type: "project" },
    ],
  },
  {
    id: "stage-3",
    title: "Stage 3: Deep Learning & Neural Networks",
    description: "Neural Architecture, TensorFlow, PyTorch, Convolutional Networks, and Transformers.",
    order: 3,
    level: "advanced",
    estimatedWeeks: 8,
    status: "locked",
    topics: [
      { id: "t7", title: "Deep Neural Networks & Backpropagation", status: "locked", estimatedHours: 16, xp: 110, type: "concept" },
      { id: "t8", title: "Computer Vision with CNNs", status: "locked", estimatedHours: 20, xp: 140, type: "concept" },
      { id: "t9", title: "IBM Machine Learning Certification", status: "locked", estimatedHours: 30, xp: 250, type: "certification" },
    ],
  },
];

export default function RoadmapPage() {
  const [roadmapStages, setRoadmapStages] = useState<RoadmapStage[]>([]);
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    roadmapApi.get().then((data) => {
      if (data && data.stages && data.stages.length > 0) {
        setRoadmapStages(data.stages);
        setExpandedStages({ [data.stages[0].id]: true });
      } else {
        setRoadmapStages(DEMO_ROADMAP_STAGES);
        setExpandedStages({ [DEMO_ROADMAP_STAGES[0].id]: true });
      }
    }).catch(() => {
      setRoadmapStages(DEMO_ROADMAP_STAGES);
      setExpandedStages({ [DEMO_ROADMAP_STAGES[0].id]: true });
    }).finally(() => setIsLoading(false));
  }, []);

  const toggleStage = (stageId: string) => {
    setExpandedStages((prev) => ({
      ...prev,
      [stageId]: !prev[stageId],
    }));
  };

  const handleTopicToggle = async (stageId: string, topicId: string, currentStatus: string) => {
    if (currentStatus === "locked") return;
    const newStatus = currentStatus === "completed" ? "in-progress" : "completed";
    
    // Optimistic update
    setRoadmapStages((prev) => 
      prev.map(stage => {
        if (stage.id !== stageId) return stage;
        return {
          ...stage,
          topics: stage.topics.map(t => t.id === topicId ? { ...t, status: newStatus as any } : t)
        };
      })
    );

    try {
      await roadmapApi.updateTopic(stageId, topicId, newStatus);
    } catch {
      // Revert if error
      roadmapApi.get().then((data) => setRoadmapStages(data.stages || []));
    }
  };

  if (isLoading) return <RoadmapSkeleton />;

  const totalTopics = roadmapStages.reduce((acc, s) => acc + s.topics.length, 0);
  const completedTopics = roadmapStages.reduce((acc, s) => {
    return acc + s.topics.filter((t) => t.status === "completed").length;
  }, 0);
  const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

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
          <StageCard key={stage.id} stage={stage} index={i} isLast={i === roadmapStages.length - 1} />
        ))}
      </div>
    </div>
  );
}
