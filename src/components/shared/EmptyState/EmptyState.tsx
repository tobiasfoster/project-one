import { InboxIcon } from "@/components/ui/icons/InboxIcon/InboxIcon"

interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-eb-primary-200 bg-eb-surface px-eb-lg py-eb-xl text-center">
      <div className="mb-eb-md rounded-full bg-eb-surface-muted p-eb-sm">
        <InboxIcon aria-hidden="true" className="h-6 w-6 text-eb-primary-400" />
      </div>
      <h3 className="text-base font-semibold text-eb-primary-900">{title}</h3>
      {description && (
        <p className="mt-eb-xs max-w-sm text-sm text-eb-primary-500">{description}</p>
      )}
      {action && <div className="mt-eb-md">{action}</div>}
    </div>
  )
}
