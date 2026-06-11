import { AlertTriangleIcon } from "@/components/ui/icons/AlertTriangleIcon/AlertTriangleIcon"
import { Button } from "@/components/ui/Button/Button"

interface ApiErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ApiErrorState({
  title = "Something went wrong",
  message = "We could not load this data. Please try again.",
  onRetry,
}: ApiErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl border border-db-danger-100 bg-db-danger-50 px-lg py-xl text-center"
      role="alert"
    >
      <div className="mb-md rounded-full bg-db-danger-100 p-sm">
        <AlertTriangleIcon aria-hidden="true" className="h-6 w-6 text-db-danger-500" />
      </div>
      <h3 className="text-base font-semibold text-db-primary-900">{title}</h3>
      <p className="mt-xs max-w-sm text-sm text-db-primary-600">{message}</p>
      {onRetry && (
        <Button className="mt-md" variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
