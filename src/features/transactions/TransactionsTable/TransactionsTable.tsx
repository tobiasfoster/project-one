import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import type { Transaction } from "@/types"
import { createTransactionColumns } from "./create-columns"
import { TransactionsTableBody } from "./TransactionsTableBody"
import { TransactionsTableHeader } from "./TransactionsTableHeader"

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
    <div className="overflow-hidden rounded-xl border border-db-primary-100 bg-db-surface">
      <table className="w-full text-sm">
        <caption className="sr-only">Transaction history</caption>
        <TransactionsTableHeader sortBy={sortBy} sortOrder={sortOrder} table={table} />
        <TransactionsTableBody table={table} />
      </table>
    </div>
  )
}
