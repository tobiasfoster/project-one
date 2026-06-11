import { http, HttpResponse } from "msw"

import { db } from "../../data/db"
import { fakeDecrypt, hasSession, SESSION_AUTH_COOKIE_NAME } from "../utils"

export const accountsHandler = http.get("/api/accounts", ({ cookies }) => {
  if (!hasSession(cookies)) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const userId = db.getUserIdFromSession(fakeDecrypt(cookies[SESSION_AUTH_COOKIE_NAME]))

  if (!userId) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const accounts = db.getAccountsByUserId(userId)

  return HttpResponse.json(accounts)
})
