import { http, HttpResponse } from "msw"

import { db } from "../../data/db"
import { fakeDecrypt, hasSession, SESSION_AUTH_COOKIE_NAME } from "../utils"

export const singleAccountHandler = http.get("/api/accounts/:id", ({ params, cookies }) => {
  console.log("cookies", cookies)

  if (!hasSession(cookies)) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const userId = db.getUserIdFromSession(fakeDecrypt(cookies[SESSION_AUTH_COOKIE_NAME]))

  if (!userId) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const account = db.getAccountById(params.id as string, userId)

  if (!account) {
    return HttpResponse.json({ message: "Account not found" }, { status: 404 })
  }

  return HttpResponse.json(account)
})
