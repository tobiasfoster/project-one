export interface TransactionsSearch {
  page?: number
  sortBy?: "date" | "amount"
  sortOrder?: "asc" | "desc"
  startDate?: string
  endDate?: string
}

export interface TransactionsFilterValues {
  page: number
  sortBy: "date" | "amount"
  sortOrder: "asc" | "desc"
  startDate: string
  endDate: string
}

/**
 * Parses raw URL search params into a typed shape. Default values are omitted so
 * the URL stays clean (e.g. `/transactions` rather than `?page=1&sortBy=date&...`).
 */
export function validateTransactionsSearch(
  search: Record<string, unknown>,
): TransactionsSearch {
  const result: TransactionsSearch = {}

  const page = Math.floor(Number(search.page))
  if (Number.isFinite(page) && page > 1) result.page = page
  if (search.sortBy === "amount") result.sortBy = "amount"
  if (search.sortOrder === "asc") result.sortOrder = "asc"
  if (typeof search.startDate === "string" && search.startDate)
    result.startDate = search.startDate
  if (typeof search.endDate === "string" && search.endDate)
    result.endDate = search.endDate

  return result
}

/** Fills in defaults for any filter not present in the URL. */
export function resolveTransactionsSearch(
  search: TransactionsSearch,
): TransactionsFilterValues {
  return {
    page: search.page ?? 1,
    sortBy: search.sortBy ?? "date",
    sortOrder: search.sortOrder ?? "desc",
    startDate: search.startDate ?? "",
    endDate: search.endDate ?? "",
  }
}
