import { http, HttpResponse } from "msw"

import { db } from "../../data/db"
import { createSessionCookie, fakeDecrypt, hasSession, SESSION_AUTH_COOKIE_NAME } from "../utils"

export const authSessionHandler = http.get("/api/auth/me", ({ cookies }) => {
  if (!hasSession(cookies)) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const userId = db.getUserIdFromSession(fakeDecrypt(cookies[SESSION_AUTH_COOKIE_NAME]))

  if (!userId) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const user = db.getUserById(userId)

  if (!user) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const newSessionCookie = createSessionCookie(userId)

  return HttpResponse.json(
    Object.assign({}, user, { password: undefined }),
    { headers: { "set-cookie": newSessionCookie } },
  )
})
