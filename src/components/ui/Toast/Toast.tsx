import { Toast as BaseToast } from "@base-ui/react/toast"
import { XIcon } from "@/components/ui/icons/XIcon/XIcon"
import { CheckCircleIcon } from "@/components/ui/icons/CheckCircleIcon/CheckCircleIcon"
import { AlertCircleIcon } from "@/components/ui/icons/AlertCircleIcon/AlertCircleIcon"
import { InfoIcon } from "@/components/ui/icons/InfoIcon/InfoIcon"
import { cn } from "@/lib/utils/cn"

export const toastManager = BaseToast.createToastManager()

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseToast.Provider toastManager={toastManager}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="fixed bottom-md right-md z-[100] flex w-full max-w-sm flex-col gap-sm outline-none">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  )
}

function ToastIcon({ type }: { type: string }) {
  switch (type) {
    case "success":
      return <CheckCircleIcon aria-hidden="true" className="h-5 w-5 text-db-accent-500" />
    case "error":
      return <AlertCircleIcon aria-hidden="true" className="h-5 w-5 text-db-danger-500" />
    default:
      return <InfoIcon aria-hidden="true" className="h-5 w-5 text-db-primary-500" />
  }
}

export function ToastList() {
  const { toasts } = BaseToast.useToastManager()

  return (
    <>
      {toasts.map(toast => (
        <BaseToast.Root
          key={toast.id}
          className={cn(
            "flex items-start gap-sm rounded-lg border border-db-primary-100 bg-db-surface p-md shadow-lg",
            "data-[ending-style]:opacity-0 data-[starting-style]:translate-y-sm data-[starting-style]:opacity-0 transition-all",
          )}
          toast={toast}
        >
          <ToastIcon type={toast.type ?? "info"} />
          <div className="flex-1">
            <BaseToast.Title className="text-sm font-medium text-db-primary-900" />
            <BaseToast.Description className="mt-xs text-sm text-db-primary-500" />
          </div>
          <BaseToast.Close
            aria-label="Dismiss"
            className="rounded p-xs text-db-primary-400 hover:bg-db-surface-hover hover:text-db-primary-700"
          >
            <XIcon aria-hidden="true" className="h-4 w-4" />
          </BaseToast.Close>
        </BaseToast.Root>
      ))}
    </>
  )
}

export function showToast(
  options: {
    title: string
    description?: string
    type?: "success" | "error" | "info"
  },
) {
  toastManager.add({
    title: options.title,
    description: options.description,
    type: options.type ?? "info",
  })
}
