import type { QueryClient } from "@tanstack/react-query"
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Outlet,
  redirect,
} from "@tanstack/react-router"
import { AppShell } from "@/components/layout/AppShell/AppShell"
import { NotFoundPage } from "@/components/shared/NotFound/NotFoundPage"
import { PageErrorState } from "@/components/shared/PageErrorState/PageErrorState"
import { PageLoader } from "@/components/shared/PageLoader/PageLoader"
import { LoginPage } from "@/features/auth/LoginPage/LoginPage"
import { RegisterPage } from "@/features/auth/RegisterPage/RegisterPage"
import { meQueryOptions } from "@/features/auth/api/auth.api"
import { useAuthStore } from "@/features/auth/store/auth.store"
import { useProfileStore } from "@/features/profile/store/profile.store"
import { validateTransactionsSearch } from "@/features/transactions/utils"
import { registerNavigate } from "@/lib/navigation/navigation"
import { queryClient } from "@/lib/query/queryClient"

const rootRoute = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  beforeLoad: ({ search }) => {
    if (useAuthStore.getState().isAuthenticated()) {
      throw redirect({ to: search.redirect || "/dashboard" })
    }
  },
  component: LoginPage,
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  beforeLoad: () => {
    if (useAuthStore.getState().isAuthenticated()) {
      throw redirect({ to: "/dashboard" })
    }
  },
  component: RegisterPage,
})

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  beforeLoad: async ({ context, location }) => {
    try {
      // Resolves the session once per cold session (cached + in-flight
      // deduped) and only for protected routes.
      const user = await context.queryClient.ensureQueryData(meQueryOptions)
      useAuthStore.getState().setAuth(user)

      // Only seed the profile store when empty so we never clobber a profile
      // the user just edited (ProfileForm keeps the store fresh itself).
      if (!useProfileStore.getState().profile) {
        useProfileStore.getState().setProfile(user.profile)
      }
    }
    catch {
      throw redirect({ to: "/login", search: { redirect: location.href } })
    }
  },
  component: AppShell,
})

const indexRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" })
  },
})

const dashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/dashboard",
  component: lazyRouteComponent(
    () => import("@/features/dashboard/DashboardPage/DashboardPage"),
    "DashboardPage",
  ),
})

const accountsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/accounts",
  component: lazyRouteComponent(
    () => import("@/features/accounts/AccountsPage/AccountsPage"),
    "AccountsPage",
  ),
})

const accountDetailRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/accounts/$id",
  component: lazyRouteComponent(
    () => import("@/features/accounts/AccountDetailPage/AccountDetailPage"),
    "AccountDetailPage",
  ),
})

const transactionsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/transactions",
  validateSearch: validateTransactionsSearch,
  component: lazyRouteComponent(
    () => import("@/features/transactions/TransactionsPage/TransactionsPage"),
    "TransactionsPage",
  ),
})

const transactionDetailRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/transactions/$id",
  component: lazyRouteComponent(
    () =>
      import(
        "@/features/transactions/TransactionDetailPage/TransactionDetailPage",
      ),
    "TransactionDetailPage",
  ),
})

const profileRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/profile",
  component: lazyRouteComponent(
    () => import("@/features/profile/ProfilePage/ProfilePage"),
    "ProfilePage",
  ),
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  appLayoutRoute.addChildren([
    indexRoute,
    dashboardRoute,
    accountsRoute,
    accountDetailRoute,
    transactionsRoute,
    transactionDetailRoute,
    profileRoute,
  ]),
])

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPendingComponent: PageLoader,
  // Show the pending UI immediately on cold load / slow connections instead of
  // waiting for the router default (1000ms), which leaves a blank screen.
  defaultPendingMs: 0,
  defaultErrorComponent: () => <PageErrorState />,
})

registerNavigate((options) => {
  void router.navigate(options)
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
