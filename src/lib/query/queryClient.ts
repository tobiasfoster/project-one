import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"
import { ApiClientError } from "@/lib/api/client"
import { queryKeys } from "@/lib/api/query-keys"
import { navigateTo } from "@/lib/navigation/navigation"
import { useAuthStore } from "@/features/auth/store/auth.store"
import { useProfileStore } from "@/features/profile/store/profile.store"

function handleUnauthorized(error: unknown) {
  if (!(error instanceof ApiClientError) || error.status !== 401) return

  useAuthStore.getState().clearAuth()
  useProfileStore.getState().clearProfile()
  queryClient.removeQueries({ queryKey: queryKeys.auth.me })

  navigateTo("/login")
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleUnauthorized }),
  mutationCache: new MutationCache({ onError: handleUnauthorized }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: (failureCount, error) => {
        if (error instanceof ApiClientError && error.status === 401) return false
        return failureCount < 1
      },
      refetchOnWindowFocus: false,
    },
  },
})
