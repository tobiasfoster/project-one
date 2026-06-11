import { InboxIcon } from "@/components/ui/icons/InboxIcon/InboxIcon"

interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-db-primary-200 bg-db-surface px-lg py-xl text-center">
      <div className="mb-md rounded-full bg-db-surface-muted p-sm">
        <InboxIcon aria-hidden="true" className="h-6 w-6 text-db-primary-400" />
      </div>
      <h3 className="text-base font-semibold text-db-primary-900">{title}</h3>
      {description && (
        <p className="mt-xs max-w-sm text-sm text-db-primary-500">{description}</p>
      )}
      {action && <div className="mt-md">{action}</div>}
    </div>
  )
}
