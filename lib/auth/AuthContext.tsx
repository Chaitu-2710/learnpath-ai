"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import type { User } from "@/lib/types";

// ─── Mock Users Database ──────────────────────────────────────
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "u1",
    name: "Arjun Sharma",
    email: "arjun@example.com",
    password: "arjun123",
    role: "student",
    rank: "AI Explorer",
    streak: 12,
    xp: 3450,
    level: 7,
    joinedAt: "2024-09-01",
    goal: "Become a Machine Learning Engineer at a top tech company",
    careerTarget: "Machine Learning Engineer",
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@learnpath.ai",
    password: "admin123",
    role: "admin",
    rank: "Platform Admin",
    streak: 0,
    xp: 0,
    level: 99,
    joinedAt: "2024-01-01",
    goal: "Manage the LearnPath AI platform",
    careerTarget: "Platform Administrator",
  },
];

// ─── Public routes (no auth required) ─────────────────────────
const PUBLIC_ROUTES = ["/login", "/signup"];

// ─── Admin-only routes ────────────────────────────────────────
const ADMIN_ROUTES = ["/admin"];

// ─── Context Types ────────────────────────────────────────────
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("learnpath_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
    setIsLoading(false);
  }, []);

  // Strict Route Protection
  useEffect(() => {
    if (isLoading) return;

    const isPublic = PUBLIC_ROUTES.includes(pathname);
    const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));

    // Not logged in → redirect to login
    if (!user && !isPublic) {
      router.replace("/login");
      return;
    }

    // Logged in → redirect away from login/signup
    if (user && isPublic) {
      router.replace("/");
      return;
    }

    // Student trying to access admin route → IMMEDIATELY BLOCK & REDIRECT TO HOME
    if (user && isAdminRoute && user.role !== "admin") {
      router.replace("/");
      return;
    }
  }, [user, isLoading, pathname, router]);

  const login = (email: string, password: string) => {
    const found = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, error: "Invalid email or password" };
    }
    const { password: _, ...userData } = found;
    setUser(userData);
    localStorage.setItem("learnpath_user", JSON.stringify(userData));
    return { success: true };
  };

  const signup = (name: string, email: string, password: string) => {
    if (MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists" };
    }

    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      role: "student", // All new signups are strictly Students
      rank: "Beginner",
      streak: 0,
      xp: 0,
      level: 1,
      joinedAt: new Date().toISOString().split("T")[0],
      goal: "Start my learning journey",
      careerTarget: "Software Engineer",
    };

    MOCK_USERS.push({ ...newUser, password });
    setUser(newUser);
    localStorage.setItem("learnpath_user", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("learnpath_user");
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
