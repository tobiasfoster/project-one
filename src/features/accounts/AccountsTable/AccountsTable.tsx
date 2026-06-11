import { Link } from "@tanstack/react-router"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type { Account } from "@/types"
import { formatAccountNumber } from "@/lib/utils/format-account-number/formatAccountNumber"
import { formatCurrency } from "@/lib/utils/format-currency/formatCurrency"
import { Badge } from "@/components/ui/Badge/Badge"

const columnHelper = createColumnHelper<Account>()

const columns = [
  columnHelper.accessor("name", {
    header: "Account",
    cell: info => (
      <Link
        className="font-medium text-eb-primary-900 hover:text-eb-accent-600"
        params={{ id: info.row.original.id }}
        to="/accounts/$id"
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("accountNumber", {
    header: "Account Number",
    cell: info => (
      <span className="font-mono text-sm">
        {formatAccountNumber(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: info => (
      <Badge casing="upper" variant={info.getValue() === "savings" ? "savings" : "credit"}>
        {info.getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor("availableBalance", {
    header: "Balance",
    cell: info => (
      <span
        className={
          info.getValue() < 0 ? "font-medium text-eb-danger-600" : "font-medium"
        }
      >
        {formatCurrency(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: info => (
      <Badge
        casing="upper"
        variant={
          info.getValue() === "active"
            ? "success"
            : info.getValue() === "frozen"
              ? "warning"
              : "danger"
        }
      >
        {info.getValue()}
      </Badge>
    ),
  }),
]

interface AccountsTableProps {
  accounts: Account[]
}

export function AccountsTable({ accounts }: AccountsTableProps) {
  const table = useReactTable({
    data: accounts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-hidden rounded-xl border border-eb-primary-100 bg-eb-surface">
      <table className="w-full text-sm">
        <caption className="sr-only">Your bank accounts</caption>
        <thead className="border-b border-eb-primary-100 bg-eb-surface-muted">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-eb-md py-eb-sm text-left font-medium text-eb-primary-600"
                  scope="col"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="border-b border-eb-primary-50 transition-colors hover:bg-eb-primary-50/50"
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-eb-md py-eb-sm">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
