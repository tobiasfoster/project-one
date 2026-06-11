import { http, HttpResponse } from "msw"

import type { LoginRequest } from "@/types"
import { db } from "../../data/db"
import { createSessionCookie } from "../utils"

export const loginHandler = http.post("/api/auth/login", async ({ request }) => {
  const body = (await request.json()) as LoginRequest

  const fields: Record<string, string> = {}

  if (!body.email?.trim()) fields.email = "Email is required"
  if (!body.password?.trim()) fields.password = "Password is required"

  if (Object.keys(fields).length > 0) {
    return HttpResponse.json({ message: "Validation failed", fields }, { status: 400 })
  }

  const user = db.getUserByEmailAndPassword(body.email!, body.password!)

  console.log("retrieved user by email and password", user)

  if (!user) {
    return HttpResponse.json(
      { message: "Invalid email or password", code: "INVALID_CREDENTIALS" },
      { status: 401 },
    )
  }

  return HttpResponse.json({ user }, { headers: { "set-cookie": createSessionCookie(user.id) } })
})
