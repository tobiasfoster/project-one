import { http, HttpResponse } from "msw"

import type { AuthResponse, RegisterRequest } from "@/types"
import { createSessionCookie } from "../utils"

export const registerHandler = http.post("/api/auth/register", async ({ request }) => {
  const body = (await request.json()) as RegisterRequest

  const fields: Record<string, string> = {}

  if (!body.firstName?.trim()) fields.firstName = "First name is required"
  if (!body.lastName?.trim()) fields.lastName = "Last name is required"
  if (!body.email?.trim()) fields.email = "Email is required"
  if (!body.password?.trim()) fields.password = "Password is required"

  if (Object.keys(fields).length > 0) {
    return HttpResponse.json({ message: "Validation failed", fields }, { status: 400 })
  }

  const response: AuthResponse = {
    token: "mock-token",
    user: {
      id: "user-1",
      email: body.email!,
      profile: {
        id: "profile-1",
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
      },
    },
  }

  return HttpResponse.json(response, { headers: { "set-cookie": createSessionCookie("user-1") } })
})
