import { useEffect, useState } from "react"
import { Outlet } from "@tanstack/react-router"
import { Sidebar } from "@/components/layout/Sidebar/Sidebar"
import { MenuIcon } from "@/components/ui/icons/MenuIcon/MenuIcon"
import { XIcon } from "@/components/ui/icons/XIcon/XIcon"
import { Button } from "@/components/ui/Button/Button"
import { useProfileStore } from "@/features/profile/store/profile.store"
import { unauthorized } from "@/features/auth/api/auth.api"

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const profile = useProfileStore(s => s.profile)

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [mobileOpen])

  return (
    <div className="flex min-h-screen">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-md focus:top-md focus:z-[100] focus:rounded-lg focus:bg-eb-surface focus:px-eb-md focus:py-eb-sm focus:text-sm focus:font-medium focus:text-eb-primary-900 focus:shadow-lg focus-visible:ring-2 focus-visible:ring-eb-accent-500"
        href="#main-content"
      >
        Skip to main content
      </a>

      <aside className="hidden w-64 shrink-0 bg-eb-sidebar lg:block">
        <Sidebar />
      </aside>

      {mobileOpen && (
        <div
          aria-label="Navigation menu"
          aria-modal="true"
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-eb-brand-950/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-eb-sidebar shadow-xl">
            <Sidebar onNavClick={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-eb-primary-100 bg-eb-surface px-eb-md lg:px-eb-lg">
          <Button
            aria-label="Open navigation menu"
            className="lg:hidden"
            size="icon"
            variant="ghost"
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon aria-hidden="true" className="h-5 w-5" />
          </Button>
          <div className="hidden lg:block" />
          <p className="text-sm text-eb-primary-500">
            Welcome,
            {" "}
            <Button onClick={() => unauthorized()}>
              <span className="font-medium text-eb-primary-800">
                {profile?.firstName}
                {" "}
                {profile?.lastName}
              </span>
            </Button>
          </p>
          {mobileOpen && (
            <Button
              aria-label="Close navigation menu"
              className="right-md top-sm z-50 lg:hidden"
              size="icon"
              variant="ghost"
              onClick={() => setMobileOpen(false)}
            >
              <XIcon aria-hidden="true" className="h-5 w-5" />
            </Button>
          )}
        </header>

        <main className="flex-1 overflow-auto p-eb-md lg:p-eb-lg" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
