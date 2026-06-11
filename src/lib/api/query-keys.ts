export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  dashboard: ["dashboard"] as const,
  accounts: {
    all: ["accounts"] as const,
    detail: (id: string) => ["accounts", id] as const,
  },
  transactions: {
    list: (params: Record<string, string>) =>
      ["transactions", params] as const,
    detail: (id: string) => ["transactions", id] as const,
  },
  profile: ["profile"] as const,
}
