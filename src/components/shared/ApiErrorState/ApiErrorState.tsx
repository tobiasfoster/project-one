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
      className="flex flex-col items-center justify-center rounded-xl border border-eb-danger-100 bg-eb-danger-50 px-eb-lg py-eb-xl text-center"
      role="alert"
    >
      <div className="mb-eb-md rounded-full bg-eb-danger-100 p-eb-sm">
        <AlertTriangleIcon aria-hidden="true" className="h-6 w-6 text-eb-danger-500" />
      </div>
      <h3 className="text-base font-semibold text-eb-primary-900">{title}</h3>
      <p className="mt-eb-xs max-w-sm text-sm text-eb-primary-600">{message}</p>
      {onRetry && (
        <Button className="mt-eb-md" variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
