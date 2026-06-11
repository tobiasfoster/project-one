import type { Account } from "@/types"

export const accounts: Account[] = [
  {
    id: "acc-1",
    accountNumber: "4829103847",
    type: "savings",
    availableBalance: 12450.75,
    status: "active",
    name: "Primary Savings",
    userId: "user-1",
  },
  {
    id: "acc-2",
    accountNumber: "7392014856",
    type: "credit",
    availableBalance: -2340.5,
    status: "active",
    name: "Eagle Credit Card",
    userId: "user-1",
  },
  {
    id: "acc-3",
    accountNumber: "9182736450",
    type: "savings",
    availableBalance: 8750.0,
    status: "active",
    name: "Emergency Fund",
    userId: "user-1",
  },
]
