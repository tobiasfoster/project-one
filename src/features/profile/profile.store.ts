import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { Profile } from "@/types"

interface ProfileState {
  profile: Profile | null
  setProfile: (profile: Profile) => void
  clearProfile: () => void
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({

      profile: null,
      setProfile: profile => set({ profile: profile }),
      clearProfile: () => set({ profile: null }),
      getProfile: () => get().profile,
    }),
    {
      name: "eagle-bank-profile",
      partialize: state => ({ profile: state.profile }),
      storage: createJSONStorage(() => localStorage),
    }),
)
