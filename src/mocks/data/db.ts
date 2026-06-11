import type { Account, StoredUser, Transaction, User } from "@/types"

import { users as seedUsers } from "./users"
import { accounts as seedAccounts } from "./accounts"
import { transactions as seedTransactions } from "./transactions"

class Database {
  private users: StoredUser[] = []
  private accounts: Account[] = []
  private transactions: Transaction[] = []

  constructor() {
    this.users = seedUsers
    this.accounts = seedAccounts
    this.transactions = seedTransactions
  }

  private createAccount(account: Account): Account {
    const newAccount = { ...account, id: `account-${Date.now()}` }
    this.accounts.push(newAccount)
    return newAccount
  }

  createUser(user: StoredUser): User {
    const id = `user-${Date.now()}`
    const newUser = { ...user, id }

    const newAccount = this.createAccount({
      userId: newUser.id,
      accountNumber: `1234567890`,
      type: "savings",
      availableBalance: 0,
      status: "active",
      name: `Savings Account`,
      id: `account-${Date.now()}`,
    })

    this.users.push(newUser)
    this.accounts.push(newAccount)

    return Object.assign(newUser, { password: undefined })
  }

  getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id)
  }

  getUserByEmailAndPassword(email: string, password: string): User | undefined {
    const user = this.users.find(user => user.email === email && user.password === password)
    return user ? Object.assign(user, { password: undefined }) : undefined
  }

  getAccountsByUserId(userId: string): Account[] {
    console.log("returning accounts by user id", userId)
    return this.accounts
  }

  getTransactionsByUserId(userId: string): Transaction[] {
    console.log("returning transactions by user id", userId)
    return this.transactions
  }

  getUserIdFromSession(session: string): string | undefined {
    console.log("returning user id from session", session)
    return "user-1"
  }

  getAccountById(id: string, userId: string): Account | undefined {
    console.log("returning account by id", id)
    return this.accounts.find(account => account.id === id && account.userId === userId)
  }

  getTransactionById(id: string): Transaction | undefined {
    console.log("returning transaction by id", id)
    return this.transactions.find(transaction => transaction.id === id)
  }
}

export const db = new Database()
