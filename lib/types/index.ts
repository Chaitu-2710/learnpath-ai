// ============================================================
// LearnPath AI — Shared TypeScript Types
// ============================================================

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type Difficulty = "easy" | "medium" | "hard";
export type Status = "not-started" | "in-progress" | "completed" | "locked";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "student" | "admin";
  rank: string;
  streak: number;
  xp: number;
  level: number;
  joinedAt: string;
  goal: string;
  careerTarget: string;
}

export interface Skill {
  name: string;
  level: number; // 0–100
  category: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  provider: string;
  duration: string;
  rating: number;
  difficulty: Difficulty;
  skillsGained: string[];
  careerRelevance: string;
  status: Status;
  progress: number;
  category: string;
  url?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  requiredSkills: string[];
  estimatedTime: string;
  careerValue: number; // 0–100
  tags: string[];
  status: Status;
}

export interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  status: Status;
  topics: RoadmapTopic[];
  estimatedDuration: string;
  milestone?: string;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  status: Status;
  type: "concept" | "project" | "assessment" | "certification";
  duration: string;
}

export interface Assessment {
  id: string;
  title: string;
  category: string;
  totalQuestions: number;
  duration: string;
  skills: string[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt?: string;
  locked: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  resources?: Resource[];
}

export interface Resource {
  title: string;
  type: "article" | "video" | "course" | "documentation";
  url: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  provider: string;
  skills: string[];
  difficulty: Difficulty;
  duration: string;
  status: Status;
  progress: number;
  credentialUrl?: string;
  earnedAt?: string;
}

export interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  description: string;
  startDate: string;
  endDate: string;
  prize: string;
  skills: string[];
  difficulty: Difficulty;
  teamSize: string;
  status: "upcoming" | "live" | "ended";
  registrationUrl?: string;
}

export interface CareerStats {
  placementReadiness: number;
  resumeScore: number;
  portfolioProgress: number;
  interviewReadiness: number;
  internshipReadiness: number;
  overallScore: number;
}

export interface AdminStudent {
  id: string;
  name: string;
  email: string;
  progress: number;
  streak: number;
  lastActive: string;
  status: "active" | "inactive" | "at-risk";
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface StatCardData {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  color?: "green" | "blue" | "yellow" | "red" | "purple";
  icon?: string;
}
