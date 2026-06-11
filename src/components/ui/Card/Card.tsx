import { cn } from "@/lib/utils/cn"

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-eb-primary-100 bg-eb-surface shadow-sm",
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-xs p-eb-lg pb-md", className)} {...props} />
  )
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4"
}

export function CardTitle({
  className,
  as: Heading = "h3",
  ...props
}: CardTitleProps) {
  return (
    <Heading
      className={cn("text-lg font-semibold text-eb-primary-900", className)}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-eb-primary-500", className)} {...props} />
  )
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-eb-lg pt-0", className)} {...props} />
}
