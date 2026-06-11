import { Avatar as BaseAvatar } from "@base-ui/react/avatar"
import { cn } from "@/lib/utils/cn"

interface AvatarProps {
  src?: string
  alt?: string
  fallback: string
  className?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-20 w-20 text-xl",
}

export function Avatar({ src, alt, fallback, className, size = "md" }: AvatarProps) {
  return (
    <BaseAvatar.Root
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-eb-primary-200",
        sizeClasses[size],
        className,
      )}
    >
      {src && (
        <BaseAvatar.Image alt={alt ?? ""} className="h-full w-full object-cover" src={src} />
      )}
      <BaseAvatar.Fallback
        className="flex h-full w-full items-center justify-center font-semibold text-eb-primary-700"
        delay={0}
      >
        {fallback}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  )
}
