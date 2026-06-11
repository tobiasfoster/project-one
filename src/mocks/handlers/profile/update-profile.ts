import { http, HttpResponse } from "msw"

import type { Profile } from "@/types"
import { db } from "../../data/db"
import { fakeDecrypt, hasSession, SESSION_AUTH_COOKIE_NAME, updateUser } from "../utils"

export const updateProfileHandler = http.put("/api/profile", async ({ request, cookies }) => {
  if (!hasSession(cookies)) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const userId = db.getUserIdFromSession(fakeDecrypt(cookies[SESSION_AUTH_COOKIE_NAME]))

  if (!userId) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const user = db.getUserById(userId)

  if (!user) {
    return HttpResponse.json({ message: "User not found" }, { status: 404 })
  }

  const body = (await request.json()) as Omit<Profile, "id">

  console.log("body for update profile", body)

  const fields: Record<string, string> = {}
  if (!body.firstName?.trim()) fields.firstName = "Invalid first name"
  if (!body.lastName?.trim()) fields.lastName = "Invalid last name"
  if (!body.email?.trim()) fields.email = "Invalid email"
  if (!body.phone?.trim()) fields.phone = "Invalid phone"
  if (!body.address?.trim()) fields.address = "Invalid address"

  if (Object.keys(fields).length > 0) {
    return HttpResponse.json(
      { message: "Validation failed", fields },
      { status: 400 },
    )
  }

  if (body.firstName === "error") {
    return HttpResponse.json({ message: "An unexpected error occurred" }, { status: 400 })
  }

  if (body.firstName === "unauth") {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const updatedUser = updateUser(user, body)

  return HttpResponse.json(updatedUser)
})
