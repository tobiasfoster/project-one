import { RouterProvider } from "@tanstack/react-router"
import { Providers } from "../Providers/Providers"
import { router } from "../Router/Router"
import { ErrorBoundary } from "@/components/shared/ErrorBoundary/ErrorBoundary"

export function App() {
  return (
    <ErrorBoundary>
      <Providers>
        <div className="root">
          <RouterProvider router={router} />
        </div>
      </Providers>
    </ErrorBoundary>
  )
}
