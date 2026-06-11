import { useQuery } from "@tanstack/react-query"
import { getAccounts } from "../api/api"
import { AccountCard } from "../AccountCard/AccountCard"
import { AccountsTable } from "../AccountsTable/AccountsTable"
import { queryKeys } from "@/lib/api/query-keys"
import { PageHeader } from "@/components/shared/PageHeader/PageHeader"
import { ApiErrorState } from "@/components/shared/ApiErrorState/ApiErrorState"
import { EmptyState } from "@/components/shared/EmptyState/EmptyState"
import { Skeleton } from "@/components/ui/Skeleton/Skeleton"

export function AccountsPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.accounts.all,
    queryFn: getAccounts,
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
            <div className="grid gap-eb-md md:grid-cols-2 lg:hidden">
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
                  <div className="grid gap-eb-md md:grid-cols-2 lg:hidden">
                    {data.map(account => (
                      <AccountCard key={account.id} account={account} />
                    ))}
                  </div>

                  <div className="hidden lg:block">
                    <AccountsTable accounts={data} />
                  </div>
                </>
              )}
    </div>
  )
}
