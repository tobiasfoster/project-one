import { http, HttpResponse } from "msw"

import { db } from "../../data/db"
import { fakeDecrypt, hasSession, SESSION_AUTH_COOKIE_NAME } from "../utils"

export const profileHandler = http.get("/api/profile", ({ cookies }) => {
  console.log("getting request for profile")

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

  return HttpResponse.json(user.profile)
})
