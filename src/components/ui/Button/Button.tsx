import { Button as BaseButton } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-sm rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-db-accent-500 focus-visible:ring-offset-sm disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-db-brand-800 text-db-on-accent hover:bg-db-brand-700",
        secondary:
          "bg-db-primary-100 text-db-primary-800 hover:bg-db-primary-200 border border-db-primary-200",
        ghost: "text-db-primary-700 hover:bg-db-primary-100",
        destructive: "bg-db-danger-500 text-db-on-accent hover:bg-db-danger-600",
        accent: "bg-db-accent-500 text-db-on-accent hover:bg-db-accent-600",
      },
      size: {
        sm: "h-8 px-sm text-sm",
        md: "h-10 px-md text-sm",
        lg: "h-12 px-lg text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

interface ButtonProps
  extends React.ComponentProps<typeof BaseButton>,
  VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { buttonVariants }
