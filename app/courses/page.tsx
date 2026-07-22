"use client";

import { useState } from "react";
import { courses } from "@/lib/data/mockData";
import type { Course } from "@/lib/types";
import { Star, Clock, PlayCircle, CheckCircle2, BookOpen, Filter } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

const categories = ["All", "AI/ML", "Data Science", "CS Fundamentals", "Web Dev"];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filter, setFilter] = useState<"all" | "in-progress" | "not-started" | "completed">("all");

  const filtered = courses.filter((c) => {
    const catMatch = activeCategory === "All" || c.category === activeCategory;
    const statusMatch = filter === "all" || c.status === filter;
    return catMatch && statusMatch;
  });

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Courses & Resources</h1>
        <p className="text-slate-400 mt-1">AI-curated learning resources tailored to your goals</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-2 overflow-x-auto scrollbar-hidden">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                activeCategory === cat
                  ? "bg-brand-green/10 text-brand-green border border-brand-green/30"
                  : "text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-500"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-2 py-1.5 outline-none"
          >
            <option value="all">All Status</option>
            <option value="in-progress">In Progress</option>
            <option value="not-started">Not Started</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No courses found for the selected filters.</p>
        </div>
      )}
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="card overflow-hidden group hover:border-slate-600 transition-all duration-200 hover:shadow-xl hover:shadow-slate-900/50 flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-40 bg-slate-700 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%231e293b'/%3E%3Ctext x='200' y='120' text-anchor='middle' fill='%2394a3b8' font-size='48'%3E📚%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        {/* Status overlay */}
        <div className="absolute top-2 left-2">
          {course.status === "completed" && <Badge variant="green">✓ Completed</Badge>}
          {course.status === "in-progress" && <Badge variant="blue">In Progress</Badge>}
        </div>
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <PlayCircle className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-slate-400">{course.provider}</span>
          <span className="text-slate-600">·</span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />{course.duration}
          </span>
        </div>

        <h3 className="font-semibold text-slate-100 line-clamp-2 group-hover:text-brand-green transition-colors mb-2 leading-snug">
          {course.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn("w-3 h-3", i < Math.floor(course.rating) ? "fill-yellow-400" : "fill-slate-600 text-slate-600")}
              />
            ))}
          </div>
          <span className="text-xs text-slate-300 font-medium">{course.rating}</span>
          <span className="ml-auto">
            <Badge variant={course.difficulty === "beginner" ? "green" : course.difficulty === "intermediate" ? "yellow" : "red"}>
              {course.difficulty}
            </Badge>
          </span>
        </div>

        {/* Skills gained */}
        <div className="flex flex-wrap gap-1 mb-3">
          {course.skillsGained.slice(0, 3).map((skill) => (
            <span key={skill} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-700/60 text-slate-300">
              {skill}
            </span>
          ))}
          {course.skillsGained.length > 3 && (
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-700/60 text-slate-400">
              +{course.skillsGained.length - 3}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-400 mb-3">
          <span className="text-brand-blue font-medium">Career relevance:</span> {course.careerRelevance}
        </p>

        {/* Progress */}
        {course.status === "in-progress" && (
          <div className="mb-3">
            <ProgressBar value={course.progress} color="blue" showLabel />
          </div>
        )}

        {/* CTA */}
        <button
          className={cn(
            "mt-auto w-full py-2.5 rounded-lg text-sm font-semibold transition-all",
            course.status === "completed"
              ? "bg-brand-green/10 text-brand-green border border-brand-green/20"
              : course.status === "in-progress"
              ? "bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white"
              : "bg-slate-700/60 text-slate-300 hover:bg-brand-green/10 hover:text-brand-green"
          )}
        >
          {course.status === "completed" ? (
            <span className="flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4" />Completed</span>
          ) : course.status === "in-progress" ? (
            "Continue Learning"
          ) : (
            "Start Course"
          )}
        </button>
      </div>
    </div>
  );
}
