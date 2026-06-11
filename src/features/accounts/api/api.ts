import { apiClient } from "@/lib/api/client"
import type { Account } from "@/types"

export async function getAccounts(): Promise<Account[]> {
  return apiClient<Account[]>("/api/accounts")
}

export async function getAccount(id: string): Promise<Account> {
  return apiClient<Account>(`/api/accounts/${id}`)
}
