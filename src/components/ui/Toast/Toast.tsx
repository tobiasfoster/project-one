import { Toast as BaseToast } from "@base-ui/react/toast"
import { XIcon } from "@/components/ui/icons/XIcon/XIcon"
import { CheckCircleIcon } from "@/components/ui/icons/CheckCircleIcon/CheckCircleIcon"
import { AlertCircleIcon } from "@/components/ui/icons/AlertCircleIcon/AlertCircleIcon"
import { InfoIcon } from "@/components/ui/icons/InfoIcon/InfoIcon"
import { cn } from "@/lib/utils/cn"
import { toastManager } from "./toast-manager"

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseToast.Provider toastManager={toastManager}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="fixed bottom-md right-md z-[100] flex w-full max-w-sm flex-col gap-eb-sm outline-none">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  )
}

function ToastIcon({ type }: { type: string }) {
  switch (type) {
    case "success":
      return <CheckCircleIcon aria-hidden="true" className="h-5 w-5 text-eb-accent-500" />
    case "error":
      return <AlertCircleIcon aria-hidden="true" className="h-5 w-5 text-eb-danger-500" />
    default:
      return <InfoIcon aria-hidden="true" className="h-5 w-5 text-eb-primary-500" />
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
            "flex items-start gap-eb-sm rounded-lg border border-eb-primary-100 bg-eb-surface p-eb-md shadow-lg",
            "data-[ending-style]:opacity-0 data-[starting-style]:translate-y-sm data-[starting-style]:opacity-0 transition-all",
          )}
          toast={toast}
        >
          <ToastIcon type={toast.type ?? "info"} />
          <div className="flex-1">
            <BaseToast.Title className="text-sm font-medium text-eb-primary-900" />
            <BaseToast.Description className="mt-eb-xs text-sm text-eb-primary-500" />
          </div>
          <BaseToast.Close
            aria-label="Dismiss"
            className="rounded p-xs text-eb-primary-400 hover:bg-eb-surface-hover hover:text-eb-primary-700"
          >
            <XIcon aria-hidden="true" className="h-4 w-4" />
          </BaseToast.Close>
        </BaseToast.Root>
      ))}
    </>
  )
}
