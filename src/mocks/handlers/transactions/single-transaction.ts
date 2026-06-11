import { http, HttpResponse } from "msw"

import { db } from "../../data/db"
import { fakeDecrypt, hasSession, SESSION_AUTH_COOKIE_NAME } from "../utils"

export const singleTransactionHandler = http.get("/api/transactions/:id", ({ params, cookies }) => {
  if (!hasSession(cookies)) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const userId = db.getUserIdFromSession(fakeDecrypt(cookies[SESSION_AUTH_COOKIE_NAME]))

  if (!userId) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const transaction = db.getTransactionById(params.id as string)

  if (!transaction) {
    return HttpResponse.json({ message: "Transaction not found" }, { status: 404 })
  }

  return HttpResponse.json(transaction)
})
