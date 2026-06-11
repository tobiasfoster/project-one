import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "@tanstack/react-router"
import { ArrowLeftIcon } from "@/components/ui/icons/ArrowLeftIcon/ArrowLeftIcon"
import { getAccount } from "../api/api"
import { queryKeys } from "@/lib/api/query-keys"
import { formatAccountNumber } from "@/lib/utils/format-account-number/formatAccountNumber"
import { formatCurrency } from "@/lib/utils/format-currency/formatCurrency"
import { PageHeader } from "@/components/shared/PageHeader/PageHeader"
import { ApiErrorState } from "@/components/shared/ApiErrorState/ApiErrorState"
import { Badge } from "@/components/ui/Badge/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card/Card"
import { Skeleton } from "@/components/ui/Skeleton/Skeleton"
import { Button } from "@/components/ui/Button/Button"
import { cn } from "@/lib/utils/cn"

export function AccountDetailPage() {
  const { id } = useParams({ from: "/app/accounts/$id" })
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.accounts.detail(id),
    queryFn: () => getAccount(id),
  })

  if (isError) {
    return (
      <div>
        <PageHeader title="Account Details" />
        <ApiErrorState
          message="We couldn't find this account."
          title="Account not found"
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
        render={<Link to="/accounts" />}
        size="sm"
        variant="ghost"
      >
        <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
        Back to accounts
      </Button>

      <PageHeader description="Account details and balance" title={data!.name} />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-eb-sm">
            <CardTitle as="h2">Account Information</CardTitle>
            <Badge casing="upper" variant={data!.type === "savings" ? "savings" : "credit"}>
              {data!.type}
            </Badge>
            <Badge casing="upper" variant={data!.status === "active" ? "success" : "warning"}>
              {data!.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-eb-md">
          <div>
            <p className="text-sm text-eb-primary-500">Account Number</p>
            <p className="font-mono text-lg font-medium text-eb-primary-900">
              {formatAccountNumber(data!.accountNumber)}
            </p>
          </div>
          <div>
            <p className="text-sm text-eb-primary-500">Available Balance</p>
            <p
              className={cn(
                "text-3xl font-bold",
                data!.availableBalance < 0 ? "text-eb-danger-600" : "text-eb-primary-900",
              )}
            >
              {formatCurrency(data!.availableBalance)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
