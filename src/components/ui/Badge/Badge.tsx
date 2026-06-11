import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-sm py-xs text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-db-primary-100 text-db-primary-700",
        success: "bg-db-accent-100 text-db-accent-700",
        warning: "bg-db-warning-100 text-db-warning-700",
        danger: "bg-db-danger-100 text-db-danger-700",
        savings: "bg-db-info-100 text-db-info-700",
        credit: "bg-db-credit-100 text-db-credit-700",
      },
      casing: {
        normal: "normal-case",
        upper: "uppercase",
        lower: "lowercase",
      },
    },
    defaultVariants: {
      variant: "default",
      casing: "normal",
    },
  },
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, casing, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, casing }), className)}
      {...props}
    />
  )
}
