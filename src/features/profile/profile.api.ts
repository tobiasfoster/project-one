import { apiClient } from "@/lib/api/client"
import type { Profile } from "@/types"
import type { ProfileFormData } from "./profile.schema"

export async function getProfile(): Promise<Profile> {
  return apiClient<Profile>("/api/profile")
}

export async function updateProfile(data: ProfileFormData): Promise<Profile> {
  return apiClient<Profile>("/api/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  })
}
