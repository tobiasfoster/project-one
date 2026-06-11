import { flexRender, type Table } from "@tanstack/react-table"
import type { Transaction } from "@/types"

export function TransactionsTableBody({
  table,
}: {
  table: Table<Transaction>
}) {
  return (
    <tbody>
      {table.getRowModel().rows.map(row => (
        <tr
          key={row.id}
          className="border-b border-db-primary-50 transition-colors hover:bg-db-primary-50/50"
        >
          {row.getVisibleCells().map(cell => (
            <td key={cell.id} className="px-md py-sm">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
