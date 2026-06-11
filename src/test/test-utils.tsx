import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, type RenderOptions } from "@testing-library/react"
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterContextProvider,
} from "@tanstack/react-router"

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

// Registering the app's known paths lets <Link> targets resolve during tests
// without pulling in the real (auth-guarded, lazy) route tree.
const APP_PATHS = [
  "/login",
  "/register",
  "/dashboard",
  "/accounts",
  "/accounts/$id",
  "/transactions",
  "/transactions/$id",
  "/profile",
] as const

export function renderWithProviders(
  ui: React.ReactElement,
  { route = "/" }: { route?: string } = {},
  options?: Omit<RenderOptions, "wrapper">,
) {
  const queryClient = createTestQueryClient()

  const rootRoute = createRootRoute()
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => null,
  })
  const childRoutes = APP_PATHS.map(path =>
    createRoute({ getParentRoute: () => rootRoute, path, component: () => null }),
  )
  const routeTree = rootRoute.addChildren([indexRoute, ...childRoutes])

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [route] }),
    defaultPendingMinMs: 0,
  })

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {/* RouterContextProvider supplies router context while rendering
            `children` directly, so components mount synchronously. */}
        <RouterContextProvider router={router}>
          {children}
        </RouterContextProvider>
      </QueryClientProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...options })
}
