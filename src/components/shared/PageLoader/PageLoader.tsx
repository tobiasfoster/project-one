import { Spinner } from "@/components/ui/Spinner/Spinner"

export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  )
}
