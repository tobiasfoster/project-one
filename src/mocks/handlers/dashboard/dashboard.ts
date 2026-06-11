import { http, HttpResponse } from "msw"

import { db } from "../../data/db"
import { fakeDecrypt, getDashboardData, hasSession, SESSION_AUTH_COOKIE_NAME } from "../utils"

export const dashboardHandler = http.get("/api/dashboard", ({ cookies }) => {
  console.log("cookies", cookies)

  if (!hasSession(cookies)) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const userId = db.getUserIdFromSession(fakeDecrypt(cookies[SESSION_AUTH_COOKIE_NAME]))

  if (!userId) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const accounts = db.getAccountsByUserId(userId)
  const transactions = db.getTransactionsByUserId(userId)

  const dashboardData = getDashboardData(accounts, transactions)

  return HttpResponse.json(dashboardData)
})
