import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "@tanstack/react-router"
import { LayoutDashboardIcon } from "@/components/ui/icons/LayoutDashboardIcon/LayoutDashboardIcon"
import { WalletIcon } from "@/components/ui/icons/WalletIcon/WalletIcon"
import { ArrowLeftRightIcon } from "@/components/ui/icons/ArrowLeftRightIcon/ArrowLeftRightIcon"
import { UserIcon } from "@/components/ui/icons/UserIcon/UserIcon"
import { LogOutIcon } from "@/components/ui/icons/LogOutIcon/LogOutIcon"
import { MenuIcon } from "@/components/ui/icons/MenuIcon/MenuIcon"
import { XIcon } from "@/components/ui/icons/XIcon/XIcon"
import { useAuthStore } from "@/features/auth/auth.store"
import { logout } from "@/features/auth/auth.api"
import { showToast } from "@/components/ui/Toast/toast-manager"
import { Button } from "@/components/ui/Button/Button"
import { Separator } from "@/components/ui/Separator/Separator"
import { useProfileStore } from "@/features/profile/profile.store"
import { queryClient } from "@/lib/query/queryClient"
import { queryKeys } from "@/lib/api/query-keys"

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { to: "/accounts", label: "Accounts", icon: WalletIcon },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRightIcon },
  { to: "/profile", label: "Profile", icon: UserIcon },
] as const

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const profile = useProfileStore(s => s.profile)
  const clearAuth = useAuthStore(s => s.clearAuth)
  const clearProfile = useProfileStore(s => s.clearProfile)
  const navigate = useNavigate()

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [mobileOpen])

  const handleLogout = async () => {
    try {
      await logout()
    }
    catch {
      // proceed with local logout even if API fails
    }
    clearAuth()
    clearProfile()
    // Drop the cached session so the guard re-validates on next sign-in.
    queryClient.removeQueries({ queryKey: queryKeys.auth.me })
    showToast({ title: "Signed out", description: "You have been logged out.", type: "info" })
    navigate({ to: "/login" })
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-sm px-lg">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-db-accent-500 text-sm font-bold text-db-on-accent">
          E
        </div>
        <span className="text-lg font-bold text-db-on-sidebar">Eagle Bank</span>
      </div>

      <Separator className="bg-db-sidebar-border" />

      <nav aria-label="Main navigation" className="flex-1 space-y-xs px-sm py-md">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            activeProps={{ className: "bg-db-sidebar-active text-db-on-sidebar" }}
            className="flex items-center gap-sm rounded-lg px-sm py-sm text-sm font-medium transition-colors"
            inactiveProps={{
              className: "text-db-on-sidebar-muted hover:bg-db-sidebar-hover hover:text-db-on-sidebar",
            }}
            to={to}
            onClick={() => setMobileOpen(false)}
          >
            <Icon aria-hidden="true" className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-db-sidebar-border p-md">
        <div className="mb-sm px-sm">
          <p className="truncate text-sm font-medium text-db-on-sidebar">
            {profile?.firstName}
            {" "}
            {profile?.lastName}
          </p>
          <p className="truncate text-xs text-db-on-sidebar-subtle">{profile?.email}</p>
        </div>
        <Button
          className="w-full justify-start text-db-on-sidebar-muted hover:bg-db-sidebar-hover hover:text-db-on-sidebar"
          variant="ghost"
          onClick={handleLogout}
        >
          <LogOutIcon aria-hidden="true" className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-md focus:top-md focus:z-[100] focus:rounded-lg focus:bg-db-surface focus:px-md focus:py-sm focus:text-sm focus:font-medium focus:text-db-primary-900 focus:shadow-lg focus-visible:ring-2 focus-visible:ring-db-accent-500"
        href="#main-content"
      >
        Skip to main content
      </a>

      <aside className="hidden w-64 shrink-0 bg-db-sidebar lg:block">{sidebar}</aside>

      {mobileOpen && (
        <div
          aria-label="Navigation menu"
          aria-modal="true"
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-db-brand-950/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-db-sidebar shadow-xl">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-db-primary-100 bg-db-surface px-md lg:px-lg">
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
          <p className="text-sm text-db-primary-500">
            Welcome,
            {" "}
            <span className="font-medium text-db-primary-800">
              {profile?.firstName}
              {" "}
              {profile?.lastName}
            </span>
          </p>
          {mobileOpen && (
            <Button
              aria-label="Close navigation menu"
              className="absolute right-md top-sm z-50 lg:hidden"
              size="icon"
              variant="ghost"
              onClick={() => setMobileOpen(false)}
            >
              <XIcon aria-hidden="true" className="h-5 w-5" />
            </Button>
          )}
        </header>

        <main className="flex-1 overflow-auto p-md lg:p-lg" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
