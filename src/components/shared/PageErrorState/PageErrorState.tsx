import { AlertTriangleIcon } from "@/components/ui/icons/AlertTriangleIcon/AlertTriangleIcon"
import { Button } from "@/components/ui/Button/Button"

interface PageErrorStateProps {
  onRetry?: () => void
}

export function PageErrorState({ onRetry }: PageErrorStateProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-eb-md text-center">
      <AlertTriangleIcon aria-hidden="true" className="mb-eb-md h-12 w-12 text-eb-danger-500" />
      <h2 className="text-xl font-semibold text-eb-primary-900">
        Something went wrong
      </h2>
      <p className="mt-eb-sm max-w-md text-sm text-eb-primary-500">
        An unexpected error occurred. Please refresh the page or try again
        later.
      </p>
      <Button
        className="mt-eb-lg"
        onClick={() => {
          if (onRetry) onRetry()
          else window.location.reload()
        }}
      >
        Refresh page
      </Button>
    </div>
  )
}
