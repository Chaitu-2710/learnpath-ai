/**
 * LearnPath AI — API Client
 * Centralized HTTP client with JWT token injection and error handling.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ─── Token Management ─────────────────────────────────────────────────────────

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("learnpath_token");
}

export function setToken(token: string): void {
  localStorage.setItem("learnpath_token", token);
}

export function clearToken(): void {
  localStorage.removeItem("learnpath_token");
  localStorage.removeItem("learnpath_user");
}

// ─── Core Fetch Wrapper ───────────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `API Error: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch {
      // Ignore JSON parse errors
    }

    // Auto-clear token on 401 and throw session_expired so pages can render preview mode
    if (response.status === 401) {
      clearToken();
      throw new Error("session_expired");
    }

    throw new Error(errorMessage);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

// ─── API Methods ──────────────────────────────────────────────────────────────

export const api = {
  // GET
  get: <T>(path: string) => apiFetch<T>(path, { method: "GET" }),

  // POST
  post: <T>(path: string, body?: unknown) =>
    apiFetch<T>(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  // PUT
  put: <T>(path: string, body?: unknown) =>
    apiFetch<T>(path, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  // PATCH
  patch: <T>(path: string, body?: unknown) =>
    apiFetch<T>(path, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  // DELETE
  delete: <T>(path: string) => apiFetch<T>(path, { method: "DELETE" }),
};

// ─── Typed API Functions ──────────────────────────────────────────────────────

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ access_token: string; user: { id: string; name: string; email: string; role: string; created_at: string } }>(
      "/api/auth/login", { email, password }
    ),
  register: (name: string, email: string, password: string) =>
    api.post<{ access_token: string; user: { id: string; name: string; email: string; role: string; created_at: string } }>(
      "/api/auth/register", { name, email, password }
    ),
  me: () => api.get<{ id: string; name: string; email: string; role: string }>("/api/auth/me"),
};

// Dashboard
export const dashboardApi = {
  get: () => api.get<any>("/api/dashboard"),
  toggleTask: (taskId: string) => api.patch<any>(`/api/dashboard/tasks/${taskId}/toggle`),
};

// Profile
export const profileApi = {
  get: () => api.get<any>("/api/profile"),
  update: (data: any) => api.put<any>("/api/profile", data),
  getSkills: () => api.get<any[]>("/api/profile/skills"),
  updateSkills: (skills: any[]) => api.put<any>("/api/profile/skills", skills),
};

// Assessments
export const assessmentApi = {
  list: () => api.get<any[]>("/api/assessments"),
  get: (id: string) => api.get<any>(`/api/assessments/${id}`),
  submit: (id: string, answers: (number | null)[]) =>
    api.post<any>(`/api/assessments/${id}/submit`, { answers }),
  history: () => api.get<any[]>("/api/assessments/history/all"),
};

// Roadmap
export const roadmapApi = {
  get: () => api.get<any>("/api/roadmap"),
  updateTopic: (stageId: string, topicId: string, status: string) =>
    api.patch<any>(`/api/roadmap/topics/${stageId}`, { topic_id: topicId, status }),
  generate: () => api.post<any>("/api/roadmap/generate"),
};

// Courses
export const coursesApi = {
  list: (params?: { category?: string; difficulty?: string; enroll_status?: string }) => {
    const qs = new URLSearchParams();
    if (params?.category && params.category !== "All") qs.set("category", params.category);
    if (params?.difficulty) qs.set("difficulty", params.difficulty);
    if (params?.enroll_status) qs.set("enroll_status", params.enroll_status);
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return api.get<any[]>(`/api/courses${query}`);
  },
  enroll: (courseId: string) => api.post<any>(`/api/courses/${courseId}/enroll`),
  updateProgress: (courseId: string, progress: number) =>
    api.patch<any>(`/api/courses/${courseId}/progress`, { progress }),
};

// AI Mentor
export const aiApi = {
  chat: (content: string) => api.post<any>("/api/ai/chat", { content }),
  history: () => api.get<any[]>("/api/ai/history"),
  clearHistory: () => api.delete<any>("/api/ai/history"),
};

// Career
export const careerApi = {
  get: () => api.get<any>("/api/career"),
  updateActionItems: (action_items: any[]) =>
    api.put<any>("/api/career/action-items", { action_items }),
};

// Settings
export const settingsApi = {
  get: () => api.get<any>("/api/settings"),
  update: (data: any) => api.put<any>("/api/settings", data),
  changePassword: (current_password: string, new_password: string) =>
    api.put<any>("/api/settings/change-password", { current_password, new_password }),
};

// Admin
export const adminApi = {
  stats: () => api.get<any>("/api/admin/stats"),
  students: (search?: string) => {
    const qs = search ? `?search=${encodeURIComponent(search)}` : "";
    return api.get<any[]>(`/api/admin/students${qs}`);
  },
};

// ML
export const mlApi = {
  predict: (student_data: Record<string, any>) =>
    api.post<any>("/api/ml/predict", { student_data }),
  metrics: () => api.get<any>("/api/ml/metrics"),
};

// Projects
export const projectsApi = {
  list: () => api.get<any[]>("/api/projects"),
};

// Hackathons
export const hackathonsApi = {
  list: () => api.get<any[]>("/api/hackathons"),
};

// Coding Problems
export const codingApi = {
  list: () => api.get<any[]>("/api/coding"),
  toggleStatus: (id: string, solved: boolean) => api.put<any>(`/api/coding/${id}/toggle`, { solved }),
};

// Certifications
export const certificationsApi = {
  list: () => api.get<any[]>("/api/certifications"),
};
