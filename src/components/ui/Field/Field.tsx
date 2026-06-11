import { Field as BaseField } from "@base-ui/react/field"
import { cn } from "@/lib/utils/cn"

export function Field({ className, ...props }: React.ComponentProps<typeof BaseField.Root>) {
  return <BaseField.Root className={cn("flex flex-col gap-sm", className)} {...props} />
}

export function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Label>) {
  return (
    <BaseField.Label
      className={cn("text-sm font-medium text-db-primary-700", className)}
      {...props}
    />
  )
}

export function FieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Description>) {
  return (
    <BaseField.Description
      className={cn("text-xs text-db-primary-500", className)}
      {...props}
    />
  )
}

export function FieldError({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Error>) {
  return (
    <BaseField.Error
      className={cn("text-xs text-db-danger-500", className)}
      {...props}
    />
  )
}
