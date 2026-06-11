import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { XIcon } from "@/components/ui/icons/XIcon/XIcon"
import { cn } from "@/lib/utils/cn"
import { Button } from "@/components/ui/Button/Button"

export const Dialog = BaseDialog

export function DialogContent({
  className,
  children,
  title,
  description,
  onClose,
}: {
  className?: string
  children: React.ReactNode
  title: string
  description?: string
  onClose?: () => void
}) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-eb-brand-950/60 backdrop-blur-sm data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 transition-opacity" />
      <BaseDialog.Popup
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-eb-primary-100 bg-eb-surface p-eb-lg shadow-xl",
          "data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 transition-all",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-eb-md">
          <div>
            <BaseDialog.Title className="text-lg font-semibold text-eb-primary-900">
              {title}
            </BaseDialog.Title>
            {description && (
              <BaseDialog.Description className="mt-eb-xs text-sm text-eb-primary-500">
                {description}
              </BaseDialog.Description>
            )}
          </div>
          {onClose && (
            <BaseDialog.Close
              render={<Button aria-label="Close dialog" size="icon" variant="ghost" />}
              onClick={onClose}
            >
              <XIcon aria-hidden="true" className="h-4 w-4" />
            </BaseDialog.Close>
          )}
        </div>
        <div className="mt-eb-md">{children}</div>
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}
