"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, FileText, Sparkles, Download, Eye } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

const resumeSections = [
  { id: "contact", label: "Contact Information", score: 100, tips: [] },
  { id: "summary", label: "Professional Summary", score: 75, tips: ["Make it more specific to ML roles", "Add your career target explicitly"] },
  { id: "skills", label: "Technical Skills", score: 85, tips: ["Add MLOps tools", "List cloud platforms"] },
  { id: "experience", label: "Work Experience", score: 50, tips: ["Add internship or freelance work", "Quantify achievements with metrics"] },
  { id: "projects", label: "Projects", score: 80, tips: ["Add GitHub links", "Mention project impact"] },
  { id: "education", label: "Education", score: 90, tips: ["Add relevant coursework"] },
  { id: "certifications", label: "Certifications", score: 70, tips: ["Add the IBM ML cert once done"] },
];

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState("contact");
  const overallScore = Math.round(resumeSections.reduce((a, s) => a + s.score, 0) / resumeSections.length);

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Resume Builder</h1>
          <p className="text-slate-400 mt-1">AI-powered resume optimization for ML Engineering roles</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline"><Eye className="w-4 h-4" />Preview</button>
          <button className="btn-primary"><Download className="w-4 h-4" />Download PDF</button>
        </div>
      </div>

      {/* ATS Score */}
      <div className="card p-5 flex flex-col sm:flex-row items-center gap-5">
        <div className="relative w-24 h-24 shrink-0">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
            <circle
              cx="50" cy="50" r="40"
              stroke={overallScore >= 80 ? "#22c55e" : overallScore >= 60 ? "#eab308" : "#ef4444"}
              strokeWidth="8" fill="none"
              strokeDasharray={`${overallScore * 2.51} 251`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-slate-100">{overallScore}</span>
            <span className="text-[10px] text-slate-400">ATS Score</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-100 mb-1">
            {overallScore >= 80 ? "Strong Resume! 🎉" : overallScore >= 60 ? "Good Start — Keep Improving 💪" : "Needs Work 📝"}
          </h3>
          <p className="text-sm text-slate-400 mb-3">
            Your resume scores {overallScore}/100 for ATS compatibility. Focus on Work Experience and Summary sections.
          </p>
          <div className="flex items-center gap-2 text-xs text-brand-green">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI analysis complete — 4 improvements suggested</span>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Section Scores */}
        <div className="card p-5">
          <h3 className="font-semibold text-slate-100 mb-4">Section Analysis</h3>
          <div className="space-y-3">
            {resumeSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-all",
                  activeSection === section.id ? "bg-slate-700/60 border border-slate-600" : "hover:bg-slate-700/30"
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-slate-200">{section.label}</span>
                  <div className="flex items-center gap-1">
                    {section.score >= 80 ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-yellow-400" />
                    )}
                    <span className={cn(
                      "text-xs font-bold",
                      section.score >= 80 ? "text-brand-green" : section.score >= 60 ? "text-yellow-400" : "text-red-400"
                    )}>
                      {section.score}%
                    </span>
                  </div>
                </div>
                <ProgressBar
                  value={section.score}
                  color={section.score >= 80 ? "green" : section.score >= 60 ? "yellow" : "red"}
                  size="xs"
                />
              </button>
            ))}
          </div>
        </div>

        {/* AI Suggestions + Editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* AI Tips for active section */}
          {(() => {
            const s = resumeSections.find((s) => s.id === activeSection)!;
            return (
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-brand-green" />
                  <h3 className="font-semibold text-slate-100">AI Suggestions: {s.label}</h3>
                  <span className={cn(
                    "ml-auto text-sm font-bold",
                    s.score >= 80 ? "text-brand-green" : s.score >= 60 ? "text-yellow-400" : "text-red-400"
                  )}>
                    {s.score}% Complete
                  </span>
                </div>
                {s.tips.length === 0 ? (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-brand-green/5 border border-brand-green/20">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                    <p className="text-sm text-brand-green">This section looks great! No improvements needed.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {s.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-yellow-400/5 border border-yellow-400/20">
                        <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-300">{tip}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Resume Preview */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-slate-400" />
              <h3 className="font-semibold text-slate-100">Resume Preview</h3>
            </div>
            <div className="bg-white rounded-lg p-6 text-slate-900 text-sm font-mono space-y-3 min-h-[300px] overflow-auto">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Arjun Sharma</h2>
                <p className="text-slate-600">arjun@example.com · +91 98765 43210 · LinkedIn · GitHub</p>
                <p className="text-slate-600">Bangalore, India</p>
              </div>
              <div>
                <h3 className="font-bold border-b border-slate-200 pb-1 mb-2">PROFESSIONAL SUMMARY</h3>
                <p className="text-slate-700 text-xs">
                  Motivated Computer Science student with strong foundation in Python and Machine Learning. Completed Google Data Analytics Certificate. Building ML projects to solve real-world problems. Seeking ML Engineering internship opportunities.
                </p>
              </div>
              <div>
                <h3 className="font-bold border-b border-slate-200 pb-1 mb-2">TECHNICAL SKILLS</h3>
                <p className="text-xs text-slate-700">
                  <strong>Languages:</strong> Python, SQL, JavaScript<br />
                  <strong>ML/AI:</strong> Scikit-Learn, Pandas, NumPy, Matplotlib<br />
                  <strong>Tools:</strong> Git, Jupyter, VS Code
                </p>
              </div>
              <div>
                <h3 className="font-bold border-b border-slate-200 pb-1 mb-2">PROJECTS</h3>
                <p className="text-xs text-slate-700">
                  <strong>Movie Recommendation System</strong> (Python, Flask, ML)<br />
                  Built collaborative filtering recommender with 85% accuracy. Deployed as REST API.
                </p>
              </div>
              <div>
                <h3 className="font-bold border-b border-slate-200 pb-1 mb-2">EDUCATION</h3>
                <p className="text-xs text-slate-700">
                  <strong>B.Tech Computer Science</strong> — VIT University<br />
                  2022–2026 · CGPA: 8.4/10
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
