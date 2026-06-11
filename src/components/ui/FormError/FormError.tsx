import { cn } from "@/lib/utils/cn"

export function FormError({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  if (!children) return null
  return (
    <p className={cn("text-xs text-db-danger-500", className)} role="alert">
      {children}
    </p>
  )
}
