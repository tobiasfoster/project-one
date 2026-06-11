type NavigateFn = (options: { to: string }) => void

let navigateImpl: NavigateFn | null = null

/**
 * Registers the router's navigate function. Called once after the router is
 * created. This indirection lets non-React modules (e.g. the query client)
 * trigger navigation without statically importing the router, which would
 * otherwise create a module-init import cycle.
 */
export function registerNavigate(fn: NavigateFn) {
  navigateImpl = fn
}

export function navigateTo(to: string) {
  navigateImpl?.({ to })
}
