import { useQuery } from "@tanstack/react-query"
import { ArrowDownLeftIcon } from "@/components/ui/icons/ArrowDownLeftIcon/ArrowDownLeftIcon"
import { ArrowUpRightIcon } from "@/components/ui/icons/ArrowUpRightIcon/ArrowUpRightIcon"
import { CreditCardIcon } from "@/components/ui/icons/CreditCardIcon/CreditCardIcon"
import { HistoryIcon } from "@/components/ui/icons/HistoryIcon/HistoryIcon"
import { getDashboard } from "../dashboard.api"
import { DashboardQuickActions } from "../DashboardQuickActions/DashboardQuickActions"
import { DashboardSummaryCard } from "../DashboardSummaryCard/DashboardSummaryCard"
import { queryKeys } from "@/lib/api/query-keys"
import { formatCurrency } from "@/lib/utils/format-currency/formatCurrency"
import { PageHeader } from "@/components/shared/PageHeader/PageHeader"
import { ApiErrorState } from "@/components/shared/ApiErrorState/ApiErrorState"
import { Card, CardContent, CardHeader } from "@/components/ui/Card/Card"
import { Skeleton } from "@/components/ui/Skeleton/Skeleton"
import { useProfileStore } from "@/features/profile/profile.store"

function SummaryCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-sm">
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-32" />
      </CardContent>
    </Card>
  )
}

export function DashboardPage() {
  const profile = useProfileStore(s => s.profile)
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: getDashboard,
  })

  if (isError) {
    return (
      <div>
        <PageHeader title="Dashboard" />
        <ApiErrorState onRetry={() => refetch()} />
      </div>
    )
  }

  const accountColors = [
    { color: "text-db-primary-600", bg: "bg-db-surface-muted" },
    { color: "text-db-accent-600", bg: "bg-db-accent-50" },
    { color: "text-db-warning-600", bg: "bg-db-warning-50" },
  ] as const

  const cards = data
    ? [
        ...data.accounts.map((account, index) => ({
          key: account.id,
          title: account.name,
          value: formatCurrency(account.availableBalance),
          icon: CreditCardIcon,
          ...accountColors[index % accountColors.length],
        })),
        {
          key: "monthly-deposits",
          title: "Monthly Deposits",
          value: formatCurrency(data.monthlyDeposits),
          icon: ArrowDownLeftIcon,
          color: "text-db-accent-600",
          bg: "bg-db-accent-50",
        },
        {
          key: "monthly-withdrawals",
          title: "Monthly Withdrawals",
          value: formatCurrency(data.monthlyWithdrawals),
          icon: ArrowUpRightIcon,
          color: "text-db-warning-600",
          bg: "bg-db-warning-50",
        },
        {
          key: "recent-transactions",
          title: "Recent Transactions",
          value: data.recentTransactionsCount.toString(),
          icon: HistoryIcon,
          color: "text-db-credit-600",
          bg: "bg-db-credit-50",
        },
      ]
    : []

  return (
    <div>
      <PageHeader
        description={
          data
            ? `Here's your account overview`
            : "Loading your account overview..."
        }
        title={`Welcome back, ${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`}
      />
      <div className="flex flex-col gap-md">
        <DashboardQuickActions />
        <div className="grid gap-md sm:grid-cols-2 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <SummaryCardSkeleton key={i} />
              ))
            : cards.map((card, i) => (
                <DashboardSummaryCard
                  key={card.key}
                  bg={card.bg}
                  color={card.color}
                  icon={card.icon}
                  index={i}
                  title={card.title}
                  value={card.value}
                />
              ))}
        </div>
      </div>
    </div>
  )
}
