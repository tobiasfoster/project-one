import type { Account, Transaction, User } from "@/types"

export const SESSION_AUTH_COOKIE_NAME = "eagle-bank-session-cookie"

export function createSessionCookie(userId: string) {
  const fakeEncrypt = (value: string) => value
  const sessionCookie = `${SESSION_AUTH_COOKIE_NAME}=${fakeEncrypt(userId)}; Path=/; Max-Age=600`

  return sessionCookie
}

export function fakeDecrypt(value: string) {
  return value
}

export function hasSession(cookies: Record<string, string>) {
  const sessionAuthCookie = cookies[SESSION_AUTH_COOKIE_NAME]
  return sessionAuthCookie !== undefined
}

export function clearSessionCookie() {
  const sessionCookie = `${SESSION_AUTH_COOKIE_NAME}=; Path=/; Max-Age=0`

  return sessionCookie
}

export function updateUser(user: User, data: Partial<User>): User | undefined {
  const updatedUser = { ...user, ...data }
  return updatedUser
}

export function getDashboardData(accounts: Account[], transactions: Transaction[]) {
  const monthlyDeposits = transactions.filter(transaction => transaction.type === "deposit").reduce((sum, transaction) => sum + transaction.amount, 0)
  const monthlyWithdrawals = transactions.filter(transaction => transaction.type === "withdrawal").reduce((sum, transaction) => sum + transaction.amount, 0)
  const recentTransactionsCount = transactions.filter(transaction => new Date(transaction.date).getTime() > new Date().getTime() - 30 * 24 * 60 * 60 * 1000).length

  return {
    accounts,
    monthlyDeposits,
    monthlyWithdrawals,
    recentTransactionsCount,
  }
}
