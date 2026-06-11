import { createColumnHelper } from "@tanstack/react-table"
import type { Transaction } from "@/types"
import { formatDate } from "@/lib/utils/format-date/formatDate"
import { SortableHeader } from "../TransactionsTable/headers/SortableHeader/SortableHeader"
import { AmountCell } from "../TransactionsTable/cells/AmountCell/AmountCell"
import { DescriptionCell } from "../TransactionsTable/cells/DescriptionCell/DescriptionCell"
import { TypeCell } from "../TransactionsTable/cells/TypeCell/TypeCell"
import type { TransactionsSearch, TransactionsFilterValues, ColumnOptions } from "../types"

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

const columnHelper = createColumnHelper<Transaction>()

export function createTransactionColumns({
  sortBy,
  sortOrder,
  onToggleSort,
}: ColumnOptions) {
  return [
    columnHelper.accessor("date", {
      header: () => (
        <SortableHeader
          active={sortBy === "date"}
          label="Date"
          order={sortOrder}
          onSort={() => onToggleSort("date")}
        />
      ),
      cell: info => formatDate(info.getValue()),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: info => (
        <DescriptionCell
          description={info.getValue()}
          id={info.row.original.id}
        />
      ),
    }),
    columnHelper.accessor("type", {
      header: "Type",
      cell: info => <TypeCell type={info.getValue()} />,
    }),
    columnHelper.accessor("amount", {
      header: () => (
        <SortableHeader
          active={sortBy === "amount"}
          label="Amount"
          order={sortOrder}
          onSort={() => onToggleSort("amount")}
        />
      ),
      cell: info => <AmountCell amount={info.getValue()} />,
    }),
    columnHelper.accessor("counterparty", {
      header: "Counterparty",
      cell: info => info.getValue() ?? "—",
    }),
  ]
}
