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
        "flex h-10 w-full rounded-lg border bg-eb-surface p-eb-sm text-sm text-eb-primary-900 placeholder:text-eb-primary-400 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eb-accent-500 focus-visible:ring-offset-xs",
        "disabled:cursor-not-allowed disabled:opacity-50",
        hasError
          ? "border-eb-danger-500 focus-visible:ring-eb-danger-500"
          : "border-eb-primary-200 hover:border-eb-primary-300",
        className,
      )}
      {...props}
    />
  )
}
