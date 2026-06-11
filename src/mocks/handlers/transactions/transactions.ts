import { http, HttpResponse } from "msw"

import { db } from "../../data/db"
import { hasSession, SESSION_AUTH_COOKIE_NAME } from "../utils"

export const transactionsHandler = http.get("/api/transactions", ({ request, cookies }) => {
  console.log("cookies", cookies)

  if (!hasSession(cookies)) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const userId = db.getUserIdFromSession(cookies[SESSION_AUTH_COOKIE_NAME])

  if (!userId) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const transactions = db.getTransactionsByUserId(userId)

  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get("page") ?? "1", 10)
  const limit = parseInt(url.searchParams.get("limit") ?? "10", 10)
  const sortBy = url.searchParams.get("sortBy") ?? "date"
  const sortOrder = url.searchParams.get("sortOrder") ?? "desc"
  const startDate = url.searchParams.get("startDate")
  const endDate = url.searchParams.get("endDate")

  let filtered = [...transactions]

  if (startDate) {
    filtered = filtered.filter(
      t => new Date(t.date) >= new Date(startDate),
    )
  }
  if (endDate) {
    filtered = filtered.filter(t => new Date(t.date) <= new Date(endDate))
  }

  filtered.sort((a, b) => {
    if (sortBy === "amount") {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
    }
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA
  })

  const total = filtered.length
  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  return HttpResponse.json({
    transactions: paginated,
    total,
    page,
    limit,
  })
})
