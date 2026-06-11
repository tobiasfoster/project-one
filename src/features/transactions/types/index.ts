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

export interface ColumnOptions {
  sortBy: "date" | "amount"
  sortOrder: "asc" | "desc"
  onToggleSort: (column: "date" | "amount") => void
}
