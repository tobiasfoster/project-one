import { QueryClientProvider } from "@tanstack/react-query"
import { MotionConfig } from "framer-motion"
import { ToastProvider } from "@/components/ui/Toast/Toast"
import { queryClient } from "@/lib/query/queryClient"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <ToastProvider>{children}</ToastProvider>
      </MotionConfig>
    </QueryClientProvider>
  )
}
