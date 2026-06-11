import { Field as BaseField } from "@base-ui/react/field"
import { cn } from "@/lib/utils/cn"

export function Field({ className, ...props }: React.ComponentProps<typeof BaseField.Root>) {
  return <BaseField.Root className={cn("flex flex-col gap-eb-sm", className)} {...props} />
}

export function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Label>) {
  return (
    <BaseField.Label
      className={cn("text-sm font-medium text-eb-primary-700", className)}
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
      className={cn("text-xs text-eb-primary-500", className)}
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
      className={cn("text-xs text-eb-danger-500", className)}
      {...props}
    />
  )
}
