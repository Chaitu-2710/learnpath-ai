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
import { authApi, setToken, clearToken, getToken } from "@/lib/apiClient";

// ─── Public routes (no auth required) ────────────────────────────────────────
const PUBLIC_ROUTES = ["/", "/login", "/signup"];
const AUTH_ONLY_PUBLIC = ["/login", "/signup"];
const ADMIN_ROUTES = ["/admin"];

// ─── Context Types ────────────────────────────────────────────────────────────
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAdmin: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Hydrate from token on mount
  useEffect(() => {
    const init = async () => {
      const token = getToken();
      if (token) {
        try {
          const me = await authApi.me();
          // Merge with cached profile data if available
          const cached = localStorage.getItem("learnpath_user");
          const cachedUser = cached ? JSON.parse(cached) : {};
          setUser({
            ...cachedUser,
            id: me.id,
            name: me.name,
            email: me.email,
            role: me.role,
          } as User);
        } catch {
          // Token invalid or expired
          clearToken();
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    init();
  }, []);

  // Route protection
  useEffect(() => {
    if (isLoading) return;

    const isPublic = PUBLIC_ROUTES.includes(pathname);
    const isAuthOnlyPublic = AUTH_ONLY_PUBLIC.includes(pathname);
    const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));

    if (!user && !isPublic) {
      router.replace("/login");
      return;
    }
    if (user && isAuthOnlyPublic) {
      router.replace("/");
      return;
    }
    if (user && isAdminRoute && user.role !== "admin") {
      router.replace("/");
      return;
    }
  }, [user, isLoading, pathname, router]);

  const login = async (email: string, password: string) => {
    try {
      const result = await authApi.login(email, password);
      setToken(result.access_token);

      const userObj: User = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role as "student" | "admin",
        rank: "Learner",
        streak: 0,
        xp: 0,
        level: 1,
        joinedAt: result.user.created_at?.split("T")[0] || new Date().toISOString().split("T")[0],
        goal: "",
        careerTarget: "Software Engineer",
      };

      // Try to get full profile data
      try {
        const { profileApi } = await import("@/lib/apiClient");
        const profileData = await profileApi.get();
        if (profileData.profile) {
          userObj.rank = profileData.profile.rank || "Learner";
          userObj.streak = profileData.profile.streak || 0;
          userObj.xp = profileData.profile.xp || 0;
          userObj.level = profileData.profile.level || 1;
          userObj.careerTarget = profileData.profile.career_target || "Software Engineer";
          userObj.goal = profileData.profile.goal || "";
        }
      } catch {
        // Profile fetch failed, continue with basic user data
      }

      setUser(userObj);
      localStorage.setItem("learnpath_user", JSON.stringify(userObj));
      router.replace("/");
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Login failed" };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const result = await authApi.register(name, email, password);
      setToken(result.access_token);

      const userObj: User = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: "student",
        rank: "Beginner",
        streak: 0,
        xp: 0,
        level: 1,
        joinedAt: new Date().toISOString().split("T")[0],
        goal: "Start my learning journey",
        careerTarget: "Software Engineer",
      };

      setUser(userObj);
      localStorage.setItem("learnpath_user", JSON.stringify(userObj));
      router.replace("/");
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Signup failed" };
    }
  };

  const logout = () => {
    clearToken();
    setUser(null);
    router.replace("/");
  };

  const refreshUser = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const { profileApi } = await import("@/lib/apiClient");
      const profileData = await profileApi.get();
      if (profileData && user) {
        const updated = {
          ...user,
          name: profileData.user?.name || user.name,
          rank: profileData.profile?.rank || user.rank,
          streak: profileData.profile?.streak ?? user.streak,
          xp: profileData.profile?.xp ?? user.xp,
          level: profileData.profile?.level ?? user.level,
          careerTarget: profileData.profile?.career_target || user.careerTarget,
          goal: profileData.profile?.goal || user.goal,
        };
        setUser(updated);
        localStorage.setItem("learnpath_user", JSON.stringify(updated));
      }
    } catch {
      // ignore
    }
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
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
