import { Input as BaseInput } from "@base-ui/react/input"
import { cn } from "@/lib/utils/cn"

interface InputProps extends React.ComponentProps<typeof BaseInput> {
  hasError?: boolean
}

export function Input({ className, hasError, ...props }: InputProps) {
  return (
    <BaseInput
      aria-invalid={hasError || undefined}
      className={cn(
        "flex h-10 w-full rounded-lg border bg-db-surface px-sm py-sm text-sm text-db-primary-900 placeholder:text-db-primary-400 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-db-accent-500 focus-visible:ring-offset-xs",
        "disabled:cursor-not-allowed disabled:opacity-50",
        hasError
          ? "border-db-danger-500 focus-visible:ring-db-danger-500"
          : "border-db-primary-200 hover:border-db-primary-300",
        className,
      )}
      {...props}
    />
  )
}
