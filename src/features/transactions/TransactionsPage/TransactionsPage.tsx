import { useNavigate, useSearch } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeftIcon } from "@/components/ui/icons/ChevronLeftIcon/ChevronLeftIcon"
import { ChevronRightIcon } from "@/components/ui/icons/ChevronRightIcon/ChevronRightIcon"
import { getTransactions } from "../api/transactions.api"
import { TransactionsFilters } from "../TransactionsFilters/TransactionsFilters"
import { TransactionsTable } from "../TransactionsTable/TransactionsTable"
import {
  resolveTransactionsSearch,
} from "../utils"
import { queryKeys } from "@/lib/api/query-keys"
import { PageHeader } from "@/components/shared/PageHeader/PageHeader"
import { ApiErrorState } from "@/components/shared/ApiErrorState/ApiErrorState"
import { EmptyState } from "@/components/shared/EmptyState/EmptyState"
import { Button } from "@/components/ui/Button/Button"
import { Skeleton } from "@/components/ui/Skeleton/Skeleton"
import type { TransactionsSearch } from "../types"

const LIMIT = 8

export function TransactionsPage() {
  const search = useSearch({ from: "/app/transactions" })
  const navigate = useNavigate({ from: "/transactions" })
  const { page, sortBy, sortOrder, startDate, endDate }
    = resolveTransactionsSearch(search)

  const filters = { page, limit: LIMIT, sortBy, sortOrder, startDate, endDate }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.transactions.list(
      Object.fromEntries(
        Object.entries(filters).map(([k, v]) => [k, String(v)]),
      ),
    ),
    queryFn: () => getTransactions(filters),
  })

  // Filter changes reset back to the first page.
  const updateFilters = (next: Partial<TransactionsSearch>) => {
    navigate({ search: prev => ({ ...prev, ...next, page: undefined }) })
  }

  const goToPage = (next: number) => {
    navigate({ search: prev => ({ ...prev, page: next }) })
  }

  const toggleSort = (column: "date" | "amount") => {
    if (sortBy === column) {
      updateFilters({ sortOrder: sortOrder === "asc" ? "desc" : "asc" })
    }
    else {
      updateFilters({ sortBy: column, sortOrder: "desc" })
    }
  }

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0

  if (isError) {
    return (
      <div>
        <PageHeader title="Transactions" />
        <ApiErrorState onRetry={() => refetch()} />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        description="View and filter your transaction history"
        title="Transactions"
      />

      <TransactionsFilters
        endDate={endDate}
        sortBy={sortBy}
        sortOrder={sortOrder}
        startDate={startDate}
        onChange={updateFilters}
      />

      {isLoading
        ? (
            <div className="space-y-eb-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 rounded-lg" />
              ))}
            </div>
          )
        : !data?.transactions.length
            ? (
                <EmptyState
                  description="Try adjusting your date filters or check back later."
                  title="No transactions found"
                />
              )
            : (
                <>
                  <TransactionsTable
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    transactions={data.transactions}
                    onToggleSort={toggleSort}
                  />

                  {totalPages > 1 && (
                    <div className="mt-eb-md flex items-center justify-between">
                      <p className="text-sm text-eb-primary-500">
                        Page
                        {" "}
                        {page}
                        {" "}
                        of
                        {" "}
                        {totalPages}
                        {" "}
                        (
                        {data!.total}
                        {" "}
                        transactions)
                      </p>
                      <div className="flex gap-eb-sm">
                        <Button
                          disabled={page <= 1}
                          size="sm"
                          variant="secondary"
                          onClick={() => goToPage(page - 1)}
                        >
                          <ChevronLeftIcon aria-hidden="true" className="h-4 w-4" />
                          Previous
                        </Button>
                        <Button
                          disabled={page >= totalPages}
                          size="sm"
                          variant="secondary"
                          onClick={() => goToPage(page + 1)}
                        >
                          Next
                          <ChevronRightIcon aria-hidden="true" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
    </div>
  )
}
