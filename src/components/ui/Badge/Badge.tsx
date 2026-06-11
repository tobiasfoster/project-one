import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full p-eb-sm text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-eb-primary-100 text-eb-primary-700",
        success: "bg-eb-accent-100 text-eb-accent-700",
        warning: "bg-eb-warning-100 text-eb-warning-700",
        danger: "bg-eb-danger-100 text-eb-danger-700",
        savings: "bg-eb-info-100 text-eb-info-700",
        credit: "bg-eb-credit-100 text-eb-credit-700",
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
