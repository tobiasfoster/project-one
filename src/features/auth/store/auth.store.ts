import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { User } from "@/types"

interface AuthState {
  user: User | null
  setAuth: (user: User) => void
  clearAuth: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({

      user: null,
      setAuth: user => set({ user: user }),
      clearAuth: () => set({ user: null }),
      isAuthenticated: () => !!get().user,
    }),
    {
      name: "eagle-bank-auth",
      partialize: state => ({ user: state.user }),
      storage: createJSONStorage(() => sessionStorage),
    }),
)
