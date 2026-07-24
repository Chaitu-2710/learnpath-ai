"use client";

import { ArrowRight, Code, Brain, Database, Smartphone, ShieldCheck, Cloud, Globe, Cpu } from "lucide-react";

interface LandingCoursesProps {
  onGetStartedClick: () => void;
}

const COURSES = [
  {
    name: "Python & Data Science",
    icon: Code,
    difficulty: "Beginner",
    description: "Master Python syntax, NumPy, Pandas, Data Wrangling, and Exploratory Analysis.",
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    name: "AI & Machine Learning",
    icon: Brain,
    difficulty: "Intermediate",
    description: "Supervised & Unsupervised models, Scikit-Learn, Neural Networks, and PyTorch.",
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    name: "Data Science & Analytics",
    icon: Database,
    difficulty: "Beginner",
    description: "SQL, Business Intelligence, Data Visualization, and Statistical Modeling.",
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    name: "Java & System Architecture",
    icon: Cpu,
    difficulty: "Intermediate",
    description: "Object-Oriented Programming, Spring Boot, Microservices, and Enterprise Java.",
    color: "text-orange-500 bg-orange-500/10",
  },
  {
    name: "Full-Stack Web Development",
    icon: Globe,
    difficulty: "Beginner",
    description: "React, Next.js, Node.js, FastAPI, REST APIs, and Modern Tailwind CSS.",
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    name: "Cyber Security & Defense",
    icon: ShieldCheck,
    difficulty: "Intermediate",
    description: "Network Security, Ethical Hacking, Cryptography, and Vulnerability Assessment.",
    color: "text-rose-500 bg-rose-500/10",
  },
  {
    name: "Cloud Computing & MLOps",
    icon: Cloud,
    difficulty: "Advanced",
    description: "AWS, GCP, Docker, Kubernetes, CI/CD pipelines, and Model Deployment.",
    color: "text-sky-500 bg-sky-500/10",
  },
  {
    name: "Flutter & Mobile Dev",
    icon: Smartphone,
    difficulty: "Beginner",
    description: "Build cross-platform iOS and Android mobile apps with Dart & Flutter.",
    color: "text-teal-500 bg-teal-500/10",
  },
];

export default function LandingCourses({ onGetStartedClick }: LandingCoursesProps) {
  return (
    <section id="courses" className="py-24 bg-slate-50 dark:bg-slate-900/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Curriculum Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Explore Industry-Aligned Learning Paths
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Choose a domain to generate your custom AI roadmap and start learning.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.map((course, i) => {
            const Icon = course.icon;
            return (
              <div
                key={i}
                className="group p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-2xl ${course.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {course.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-6">
                    {course.description}
                  </p>
                </div>

                <button
                  onClick={onGetStartedClick}
                  className="w-full py-2.5 rounded-2xl text-xs font-semibold bg-slate-100 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <span>View Path</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
