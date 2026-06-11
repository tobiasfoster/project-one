export const apiPaths = {
  auth: {
    register: "/api/auth/register",
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    me: "/api/auth/me",
    unauthorized: "/api/auth/unauthorized",
  },
  dashboard: {
    get: "/api/dashboard",
  },
  accounts: {
    list: "/api/accounts",
    detail: (id: string) => `/api/accounts/${id}`,
  },
  transactions: {
    list: "/api/transactions",
    detail: (id: string) => `/api/transactions/${id}`,
  },
  profile: {
    get: "/api/profile",
    update: "/api/profile",
  },
} as const
