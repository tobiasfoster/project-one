import { createColumnHelper } from "@tanstack/react-table"
import type { Transaction } from "@/types"
import { formatDate } from "@/lib/utils/format-date/formatDate"
import { SortableHeader } from "../TransactionsTable/headers/SortableHeader/SortableHeader"
import { AmountCell } from "../TransactionsTable/cells/AmountCell/AmountCell"
import { DescriptionCell } from "../TransactionsTable/cells/DescriptionCell/DescriptionCell"
import { TypeCell } from "../TransactionsTable/cells/TypeCell/TypeCell"

const columnHelper = createColumnHelper<Transaction>()

interface ColumnOptions {
  sortBy: "date" | "amount"
  sortOrder: "asc" | "desc"
  onToggleSort: (column: "date" | "amount") => void
}

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
