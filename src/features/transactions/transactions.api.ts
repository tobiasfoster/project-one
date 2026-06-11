import { apiClient } from "@/lib/api/client"
import type { Transaction, TransactionsResponse } from "@/types"

export interface TransactionFilters {
  page?: number
  limit?: number
  sortBy?: "date" | "amount"
  sortOrder?: "asc" | "desc"
  startDate?: string
  endDate?: string
}

export async function getTransactions(
  filters: TransactionFilters = {},
): Promise<TransactionsResponse> {
  const params = new URLSearchParams()
  if (filters.page) params.set("page", String(filters.page))
  if (filters.limit) params.set("limit", String(filters.limit))
  if (filters.sortBy) params.set("sortBy", filters.sortBy)
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder)
  if (filters.startDate) params.set("startDate", filters.startDate)
  if (filters.endDate) params.set("endDate", filters.endDate)

  const query = params.toString()
  return apiClient<TransactionsResponse>(
    `/api/transactions${query ? `?${query}` : ""}`,
  )
}

export async function getTransaction(id: string): Promise<Transaction> {
  return apiClient<Transaction>(`/api/transactions/${id}`)
}
