import { login } from "@/features/auth/auth.api"
import { useAuthStore } from "@/features/auth/auth.store"

export async function loginAsTestUser() {
  const response = await login({
    email: "jane.doe@email.com",
    password: "Password123!",
  })
  useAuthStore.getState().setAuth(response.user)
  return response
}
