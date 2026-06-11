import { Toast as BaseToast } from "@base-ui/react/toast"

export const toastManager = BaseToast.createToastManager()

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
