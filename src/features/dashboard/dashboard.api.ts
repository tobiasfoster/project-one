import { apiClient } from "@/lib/api/client"
import type { DashboardSummary } from "@/types"

export async function getDashboard(): Promise<DashboardSummary> {
  return apiClient<DashboardSummary>("/api/dashboard")
}
