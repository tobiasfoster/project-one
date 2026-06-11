import { useAuthStore } from "@/features/auth/store/auth.store"
import type { ApiError } from "@/types"
import { apiUrl } from "./config"

export class ApiClientError extends Error {
  status: number
  code?: string
  fields?: Record<string, string>

  constructor(status: number, body: ApiError) {
    super(body.message)
    this.name = "ApiClientError"
    this.status = status
    this.code = body.code
    this.fields = body.fields
  }
}

function isAuthEndpoint(path: string): boolean {
  if (path.includes("unauthorized")) {
    return false
  }

  return path.startsWith("/api/auth/")
}

async function parseErrorBody(response: Response): Promise<ApiError> {
  try {
    return (await response.json()) as ApiError
  }
  catch {
    return { message: response.statusText || "Something went wrong" }
  }
}

async function parseResponse<T>(response: Response, path: string): Promise<T> {
  if (!response.ok) {
    if (response.status === 401 && !isAuthEndpoint(path)) {
      useAuthStore.getState().clearAuth()
    }

    const body = await parseErrorBody(response)
    throw new ApiClientError(response.status, body)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export async function apiClient<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers)

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  const response = await fetch(apiUrl(path), { ...options, headers })
  return parseResponse<T>(response, path)
}
