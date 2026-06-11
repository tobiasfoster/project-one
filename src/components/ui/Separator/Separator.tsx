import { Separator as BaseSeparator } from "@base-ui/react/separator"
import { cn } from "@/lib/utils/cn"

export function Separator({
  className,
  orientation = "horizontal",
}: {
  className?: string
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <BaseSeparator
      className={cn(
        "shrink-0 bg-db-primary-200",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      orientation={orientation}
    />
  )
}
