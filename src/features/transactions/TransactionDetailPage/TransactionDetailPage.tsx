import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "@tanstack/react-router"
import { ArrowLeftIcon } from "@/components/ui/icons/ArrowLeftIcon/ArrowLeftIcon"
import { getTransaction } from "../api/transactions.api"
import { queryKeys } from "@/lib/api/query-keys"
import { formatCurrency } from "@/lib/utils/format-currency/formatCurrency"
import { formatDate } from "@/lib/utils/format-date/formatDate"
import { PageHeader } from "@/components/shared/PageHeader/PageHeader"
import { ApiErrorState } from "@/components/shared/ApiErrorState/ApiErrorState"
import { Badge } from "@/components/ui/Badge/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card/Card"
import { Skeleton } from "@/components/ui/Skeleton/Skeleton"
import { Button } from "@/components/ui/Button/Button"
import { cn } from "@/lib/utils/cn"

export function TransactionDetailPage() {
  const { id } = useParams({ from: "/app/transactions/$id" })
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.transactions.detail(id),
    queryFn: () => getTransaction(id),
  })

  if (isError) {
    return (
      <div>
        <PageHeader title="Transaction Details" />
        <ApiErrorState
          title="Transaction not found"
          onRetry={() => refetch()}
        />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <Skeleton className="mb-eb-lg h-8 w-48" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    )
  }

  return (
    <div>
      <Button
        className="mb-eb-md"
        render={<Link to="/transactions" />}
        size="sm"
        variant="ghost"
      >
        <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
        Back to transactions
      </Button>

      <PageHeader description="Transaction details" title={data!.description} />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-eb-sm">
            <CardTitle as="h2">Transaction Information</CardTitle>
            <Badge casing="upper">{data!.type}</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-eb-md sm:grid-cols-2">
          <div>
            <p className="text-sm text-eb-primary-500">Amount</p>
            <p
              className={cn(
                "text-2xl font-bold",
                data!.amount >= 0 ? "text-eb-accent-600" : "text-eb-primary-900",
              )}
            >
              {formatCurrency(data!.amount)}
            </p>
          </div>
          <div>
            <p className="text-sm text-eb-primary-500">Date</p>
            <p className="text-lg font-medium text-eb-primary-900">
              {formatDate(data!.date)}
            </p>
          </div>
          <div>
            <p className="text-sm text-eb-primary-500">Account ID</p>
            <p className="font-mono text-sm text-eb-primary-700">{data!.accountId}</p>
          </div>
          {data!.counterparty && (
            <div>
              <p className="text-sm text-eb-primary-500">Counterparty</p>
              <p className="text-lg font-medium text-eb-primary-900">
                {data!.counterparty}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
