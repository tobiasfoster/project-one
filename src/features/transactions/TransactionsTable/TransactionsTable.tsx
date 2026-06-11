import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import type { Transaction } from "@/types"
import { TransactionsTableBody } from "./tablebody/TransactionsTableBody"
import { TransactionsTableHeader } from "./headers/TransactionTableHeader/TransactionsTableHeader"
import { formatDate } from "@/lib/utils/format-date/formatDate"
import { SortableHeader } from "../TransactionsTable/headers/SortableHeader/SortableHeader"
import { AmountCell } from "../TransactionsTable/cells/AmountCell/AmountCell"
import { DescriptionCell } from "../TransactionsTable/cells/DescriptionCell/DescriptionCell"
import { TypeCell } from "../TransactionsTable/cells/TypeCell/TypeCell"
import type { ColumnOptions } from "../types"

const columnHelper = createColumnHelper<Transaction>()

function createTransactionColumns({
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

interface TransactionsTableProps {
  transactions: Transaction[]
  sortBy: "date" | "amount"
  sortOrder: "asc" | "desc"
  onToggleSort: (column: "date" | "amount") => void
}

export function TransactionsTable({
  transactions,
  sortBy,
  sortOrder,
  onToggleSort,
}: TransactionsTableProps) {
  const columns = createTransactionColumns({ sortBy, sortOrder, onToggleSort })

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-x-auto rounded-xl border border-eb-primary-100 bg-eb-surface overflow-x-auto">
      <table className="w-full text-sm">
        <caption className="sr-only">Transaction history</caption>
        <TransactionsTableHeader sortBy={sortBy} sortOrder={sortOrder} table={table} />
        <TransactionsTableBody table={table} />
      </table>
    </div>
  )
}
