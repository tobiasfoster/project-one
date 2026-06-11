export interface User {
  id: string
  email: string
  profile: Profile
}

export interface StoredUser extends User {
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface DashboardSummary {
  welcomeName: string
  accounts: Account[]
  totalBalance?: number
  currentBalance?: number
  monthlyDeposits: number
  monthlyWithdrawals: number
  recentTransactionsCount: number
}

export type AccountType = "savings" | "credit"
export type AccountStatus = "active" | "frozen" | "closed"

export interface Account {
  id: string
  accountNumber: string
  type: AccountType
  availableBalance: number
  status: AccountStatus
  name: string
  userId: string
}

export type TransactionType = "deposit" | "withdrawal" | "transfer"

export interface Transaction {
  id: string
  accountId: string
  type: TransactionType
  amount: number
  description: string
  date: string
  counterparty?: string
  userId?: string
}

export interface TransactionsResponse {
  transactions: Transaction[]
  total: number
  page: number
  limit: number
}

export interface ApiError {
  message: string
  code?: string
  fields?: Record<string, string>
}

export interface RegisterRequest {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
}

export interface LoginRequest {
  email?: string
  password?: string
}

export interface Profile {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  address?: string
  postalCode?: string
  avatarUrl?: string
}
