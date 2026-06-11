import { Button as BaseButton } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-eb-sm rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eb-accent-500 focus-visible:ring-offset-sm disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-eb-brand-800 text-eb-on-accent hover:bg-eb-brand-700",
        secondary:
          "bg-eb-primary-100 text-eb-primary-800 hover:bg-eb-primary-200 border border-eb-primary-200",
        ghost: "text-eb-primary-700 hover:bg-eb-primary-100",
        destructive: "bg-eb-danger-500 text-eb-on-accent hover:bg-eb-danger-600",
        accent: "bg-eb-accent-500 text-eb-on-accent hover:bg-eb-accent-600",
      },
      size: {
        sm: "h-8 px-eb-sm text-sm",
        md: "h-10 px-eb-md text-sm",
        lg: "h-12 px-eb-lg text-base",
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
