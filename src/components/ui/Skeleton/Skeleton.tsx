import { cn } from "@/lib/utils/cn"

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-eb-primary-100", className)}
      {...props}
    />
  )
}
