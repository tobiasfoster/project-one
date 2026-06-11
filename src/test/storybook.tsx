import type { Decorator } from "@storybook/react-vite"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router"
import { useState, type ComponentType } from "react"
import { validateTransactionsSearch } from "@/features/transactions/utils"
import { useProfileStore } from "@/features/profile/store/profile.store"
import type { Profile } from "@/types"

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

/**
 * Provides a fresh React Query client per story so cached data never bleeds
 * between stories.
 */
export const WithQueryClient: Decorator = (Story) => {
  const [queryClient] = useState(makeQueryClient)
  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  )
}

/**
 * Route ids mirror the real application router (see `app/Router/Router.tsx`) so
 * components relying on `useParams`/`useSearch` with a `from` resolve correctly.
 */
export type ActiveRouteId
  = | "/login"
    | "/register"
    | "/app/dashboard"
    | "/app/accounts"
    | "/app/accounts/$id"
    | "/app/transactions"
    | "/app/transactions/$id"
    | "/app/profile"

/**
 * Renders the story inside a real TanStack Router so `<Link>`, `useNavigate`,
 * `useParams`, and `useSearch` behave the same way they do in the app.
 *
 * @param active        Which route should render the story component.
 * @param initialEntry  The URL the in-memory history starts at.
 */
export function WithRouter(
  active: ActiveRouteId,
  initialEntry: string,
): Decorator {
  return function RouterDecorator(Story) {
    const [router] = useState(() => {
      const story: ComponentType = () => <Story />
      const outlet: ComponentType = () => <Outlet />
      const pick = (id: ActiveRouteId) => (id === active ? story : outlet)

      const rootRoute = createRootRoute({ component: outlet })

      const loginRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/login",
        validateSearch: (search: Record<string, unknown>) => ({
          redirect:
            typeof search.redirect === "string" ? search.redirect : undefined,
        }),
        component: pick("/login"),
      })
      const registerRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/register",
        component: pick("/register"),
      })
      const appRoute = createRoute({
        getParentRoute: () => rootRoute,
        id: "app",
        component: outlet,
      })
      const dashboardRoute = createRoute({
        getParentRoute: () => appRoute,
        path: "/dashboard",
        component: pick("/app/dashboard"),
      })
      const accountsRoute = createRoute({
        getParentRoute: () => appRoute,
        path: "/accounts",
        component: pick("/app/accounts"),
      })
      const accountDetailRoute = createRoute({
        getParentRoute: () => appRoute,
        path: "/accounts/$id",
        component: pick("/app/accounts/$id"),
      })
      const transactionsRoute = createRoute({
        getParentRoute: () => appRoute,
        path: "/transactions",
        validateSearch: validateTransactionsSearch,
        component: pick("/app/transactions"),
      })
      const transactionDetailRoute = createRoute({
        getParentRoute: () => appRoute,
        path: "/transactions/$id",
        component: pick("/app/transactions/$id"),
      })
      const profileRoute = createRoute({
        getParentRoute: () => appRoute,
        path: "/profile",
        component: pick("/app/profile"),
      })

      const routeTree = rootRoute.addChildren([
        loginRoute,
        registerRoute,
        appRoute.addChildren([
          dashboardRoute,
          accountsRoute,
          accountDetailRoute,
          transactionsRoute,
          transactionDetailRoute,
          profileRoute,
        ]),
      ])

      return createRouter({
        routeTree,
        history: createMemoryHistory({ initialEntries: [initialEntry] }),
        defaultPendingMinMs: 0,
      })
    })

    return <RouterProvider router={router} />
  }
}

/** Seeds the persisted profile store so greeting/avatar UIs have data. */
export function WithProfile(profile: Profile | null): Decorator {
  return function ProfileDecorator(Story) {
    useProfileStore.setState({ profile })
    return <Story />
  }
}
