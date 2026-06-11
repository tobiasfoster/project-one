import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { motion } from "framer-motion"
import { getAccounts } from "../api"
import { queryKeys } from "@/lib/api/query-keys"
import type { Account } from "@/types"
import { formatAccountNumber } from "@/lib/utils/format-account-number/formatAccountNumber"
import { formatCurrency } from "@/lib/utils/format-currency/formatCurrency"
import { PageHeader } from "@/components/shared/PageHeader/PageHeader"
import { ApiErrorState } from "@/components/shared/ApiErrorState/ApiErrorState"
import { EmptyState } from "@/components/shared/EmptyState/EmptyState"
import { Badge } from "@/components/ui/Badge/Badge"
import { Card, CardContent } from "@/components/ui/Card/Card"
import { Skeleton } from "@/components/ui/Skeleton/Skeleton"
import { cn } from "@/lib/utils/cn"

const columnHelper = createColumnHelper<Account>()

const columns = [
  columnHelper.accessor("name", {
    header: "Account",
    cell: info => (
      <Link
        className="font-medium text-db-primary-900 hover:text-db-accent-600"
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
          info.getValue() < 0 ? "font-medium text-db-danger-600" : "font-medium"
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

function AccountCard({ account }: { account: Account }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 8 }}
    >
      <Link params={{ id: account.id }} to="/accounts/$id">
        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="p-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-db-primary-900">{account.name}</p>
                <p className="mt-xs font-mono text-xs text-db-primary-500">
                  {formatAccountNumber(account.accountNumber)}
                </p>
              </div>
              <Badge
                casing="upper"
                variant={account.type === "savings" ? "savings" : "credit"}
              >
                {account.type}
              </Badge>
            </div>
            <div className="mt-sm flex items-center justify-between">
              <p
                className={cn(
                  "text-lg font-bold",
                  account.availableBalance < 0 ? "text-db-danger-600" : "text-db-primary-900",
                )}
              >
                {formatCurrency(account.availableBalance)}
              </p>
              <Badge
                casing="upper"
                variant={
                  account.status === "active" ? "success" : "warning"
                }
              >
                {account.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

export function AccountsPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.accounts.all,
    queryFn: getAccounts,
  })

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isError) {
    return (
      <div>
        <PageHeader description="View and manage your bank accounts" title="Accounts" />
        <ApiErrorState onRetry={() => refetch()} />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        description="View and manage your bank accounts"
        title="Accounts"
      />

      {isLoading
        ? (
            <div className="grid gap-md md:grid-cols-2 lg:hidden">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
          )
        : !data?.length
            ? (
                <EmptyState
                  description="You don't have any accounts yet."
                  title="No accounts found"
                />
              )
            : (
                <>
                  <div className="grid gap-md md:grid-cols-2 lg:hidden">
                    {data.map(account => (
                      <AccountCard key={account.id} account={account} />
                    ))}
                  </div>

                  <div className="hidden overflow-hidden rounded-xl border border-db-primary-100 bg-db-surface lg:block">
                    <table className="w-full text-sm">
                      <caption className="sr-only">Your bank accounts</caption>
                      <thead className="border-b border-db-primary-100 bg-db-surface-muted">
                        {table.getHeaderGroups().map(headerGroup => (
                          <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                              <th
                                key={header.id}
                                className="px-md py-sm text-left font-medium text-db-primary-600"
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
                            className="border-b border-db-primary-50 transition-colors hover:bg-db-primary-50/50"
                          >
                            {row.getVisibleCells().map(cell => (
                              <td key={cell.id} className="px-md py-sm">
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
                </>
              )}
    </div>
  )
}
