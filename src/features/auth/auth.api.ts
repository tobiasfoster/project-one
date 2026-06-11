import { queryOptions } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { queryKeys } from "@/lib/api/query-keys"
import type { AuthResponse, User } from "@/types"
import type { LoginFormData, RegisterFormData } from "./auth.schemas"
import { useAuthStore } from "./auth.store"

export async function login(data: LoginFormData): Promise<AuthResponse> {
  return apiClient<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function register(
  data: Omit<RegisterFormData, "confirmPassword">,
): Promise<AuthResponse> {
  return apiClient<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function logout(): Promise<void> {
  return apiClient<void>("/api/auth/logout", { method: "POST" })
}

export async function getMe(): Promise<User> {
  return apiClient<User>("/api/auth/me")
}

/**
 * Resolves the current session via `/api/auth/me`.
 *
 * `initialData` seeds the cache from the persisted auth store so a warm reload
 * renders instantly without flashing a loader, while `staleTime: Infinity`
 * guarantees the network check runs at most once per cold session. Stale
 * sessions are still caught: any subsequent 401 clears this cache and redirects
 * to login (see `handleUnauthorized` in the query client).
 */
export const meQueryOptions = queryOptions({
  queryKey: queryKeys.auth.me,
  queryFn: getMe,
  initialData: () => useAuthStore.getState().user ?? undefined,
  staleTime: Infinity,
})
