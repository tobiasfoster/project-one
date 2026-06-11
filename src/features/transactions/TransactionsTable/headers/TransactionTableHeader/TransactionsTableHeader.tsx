import { flexRender, type Table } from "@tanstack/react-table"
import type { Transaction } from "@/types"

const SORTABLE_COLUMNS = new Set(["date", "amount"])

export function TransactionsTableHeader({
  table,
  sortBy,
  sortOrder,
}: {
  table: Table<Transaction>
  sortBy: "date" | "amount"
  sortOrder: "asc" | "desc"
}) {
  return (
    <thead className="border-b border-eb-primary-100 bg-eb-primary-50">
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const isSortable = SORTABLE_COLUMNS.has(header.column.id)
            const isActive = isSortable && header.column.id === sortBy
            const ariaSort = isActive
              ? (sortOrder === "asc" ? "ascending" : "descending")
              : isSortable
                ? "none"
                : undefined

            return (
              <th
                key={header.id}
                aria-sort={ariaSort}
                className="px-eb-md py-eb-sm text-left text-eb-primary-600"
                scope="col"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            )
          })}
        </tr>
      ))}
    </thead>
  )
}
