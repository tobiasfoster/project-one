/**
 * Origin the API is served from, sourced from `VITE_API_ORIGIN`.
 *
 * Defaults to an empty string so requests stay same-origin (relative paths),
 * which keeps the MSW mock layer and the nginx reverse proxy working without
 * any extra configuration. Set it to an absolute origin (e.g.
 * `https://api.example.com`) to point the app at a remote backend.
 */
export const API_ORIGIN = import.meta.env.VITE_API_ORIGIN ?? ""

/**
 * Builds a request URL from a logical API path (e.g. `/api/auth/login`) by
 * prefixing the configured origin. With an empty origin the path is returned
 * unchanged so it resolves relative to the current host.
 */
export function apiUrl(path: string): string {
  return `${API_ORIGIN}${path}`
}
