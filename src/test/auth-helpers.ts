import { login } from "@/features/auth/api/auth.api"
import { useAuthStore } from "@/features/auth/store/auth.store"

export async function loginAsTestUser() {
  const response = await login({
    email: "jane.doe@email.com",
    password: "Password123!",
  })
  useAuthStore.getState().setAuth(response.user)
  return response
}
