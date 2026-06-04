// All API calls go through the Next.js Route Handler proxy at /api/backend/*.
// This means the browser always calls the same origin — no CORS issues.
// The proxy (src/app/api/backend/[...path]/route.ts) forwards requests to
// the real backend server-to-server with the Vercel bypass secret if needed.
const BASE_URL = "/api/backend";

interface RequestOptions {
  method?: string;
  body?: any;
  token?: string;
  headers?: Record<string, string>;
}

async function request(path: string, options: RequestOptions = {}) {
  const method = options.method || "GET";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (options.token) {
    headers["Authorization"] = `Bearer ${options.token}`;
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (options.body && method !== "GET") {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${BASE_URL}${path}`, fetchOptions);

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Request failed" }));
    throw new Error(errorData.message || "Request failed");
  }

  return response.json();
}

export const FitForgeApi = {
  // Auth
  auth: {
    register: (body: any) =>
      request("/auth/register", { method: "POST", body }),
    login: (body: any) => request("/auth/login", { method: "POST", body }),
    refreshToken: (token: string) =>
      request("/auth/refresh-token", { method: "POST", body: { token } }),
  },

  // Users
  users: {
    getAll: (token: string) => request("/users", { token }),
    getById: (id: string, token: string) => request(`/users/${id}`, { token }),
    update: (id: string, body: any, token: string) =>
      request(`/users/${id}`, { method: "PATCH", body, token }),
    delete: (id: string, token: string) =>
      request(`/users/${id}`, { method: "DELETE", token }),
    updateRole: (body: { userId: string; role: string }, token: string) =>
      request("/users/role", { method: "PATCH", body, token }),
    getMyAiLogs: (token: string) => request("/users/ai-logs/me", { token }),
  },

  // Items / Blueprints
  items: {
    getAll: (
      params: {
        search?: string;
        category?: string;
        page?: number;
        limit?: number;
        sort?: string;
      } = {},
    ) => {
      const query = new URLSearchParams();
      if (params.search) query.append("search", params.search);
      if (params.category) query.append("category", params.category);
      if (params.page) query.append("page", params.page.toString());
      if (params.limit) query.append("limit", params.limit.toString());
      if (params.sort) query.append("sort", params.sort);
      const qs = query.toString();
      return request(`/items${qs ? `?${qs}` : ""}`);
    },
    getById: (id: string) => request(`/items/${id}`),
    create: (body: any, token: string) =>
      request("/items", { method: "POST", body, token }),
    update: (id: string, body: any, token: string) =>
      request(`/items/${id}`, { method: "PATCH", body, token }),
    delete: (id: string, token: string) =>
      request(`/items/${id}`, { method: "DELETE", token }),
  },

  // Reviews
  reviews: {
    getByItem: (itemId: string) => request(`/reviews/item/${itemId}`),
    create: (
      body: { itemId: string; rating: number; comment: string },
      token: string,
    ) => request("/reviews", { method: "POST", body, token }),
    delete: (id: string, token: string) =>
      request(`/reviews/${id}`, { method: "DELETE", token }),
  },

  // Bookings
  bookings: {
    getAll: (token: string, status?: string) => {
      const path = status ? `/bookings?status=${status}` : "/bookings";
      return request(path, { token });
    },
    create: (body: { itemId: string }, token: string) =>
      request("/bookings", { method: "POST", body, token }),
    updateStatus: (id: string, body: { status: string }, token: string) =>
      request(`/bookings/${id}`, { method: "PATCH", body, token }),
    delete: (id: string, token: string) =>
      request(`/bookings/${id}`, { method: "DELETE", token }),
  },

  // Dashboard
  dashboard: {
    getStats: (token: string) => request("/dashboard/stats", { token }),
    getChartData: (token: string) =>
      request("/dashboard/chart-data", { token }),
  },

  // AI
  ai: {
    chat: (prompt: string, token: string) =>
      request("/ai/chat", { method: "POST", body: { prompt }, token }),
    generateDescription: (title: string, token: string) =>
      request("/ai/generate-description", {
        method: "POST",
        body: { title },
        token,
      }),
    modify: (
      body: { content: string; modificationProfile: string },
      token: string,
    ) => request("/ai/modify", { method: "POST", body, token }),
    reviewSummary: (itemId: string, token: string) =>
      request("/ai/review-summary", {
        method: "POST",
        body: { itemId },
        token,
      }),
  },
};
