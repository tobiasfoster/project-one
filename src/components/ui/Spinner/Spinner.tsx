import { Loader2Icon } from "@/components/ui/icons/Loader2Icon/Loader2Icon"
import { cn } from "@/lib/utils/cn"

interface SpinnerProps {
  className?: string
  label?: string
}

export function Spinner({ className, label = "Loading" }: SpinnerProps) {
  return (
    <Loader2Icon
      aria-label={label}
      className={cn("h-5 w-5 animate-spin text-eb-primary-500", className)}
      role="status"
    />
  )
}
