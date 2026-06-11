import { useNavigate } from "@tanstack/react-router"
import { LogOutIcon } from "@/components/ui/icons/LogOutIcon/LogOutIcon"
import { MainNavigation } from "@/components/layout/MainNavigation/MainNavigation"
import { useAuthStore } from "@/features/auth/store/auth.store"
import { logout } from "@/features/auth/api/auth.api"
import { showToast } from "@/components/ui/Toast/toast-manager"
import { Button } from "@/components/ui/Button/Button"
import { Separator } from "@/components/ui/Separator/Separator"
import { useProfileStore } from "@/features/profile/store/profile.store"
import { queryClient } from "@/lib/query/queryClient"
import { queryKeys } from "@/lib/api/query-keys"

type SidebarProps = {
  onNavClick?: () => void
}

export function Sidebar({ onNavClick }: SidebarProps) {
  const profile = useProfileStore(s => s.profile)
  const clearAuth = useAuthStore(s => s.clearAuth)
  const clearProfile = useProfileStore(s => s.clearProfile)
  const navigate = useNavigate()

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

  return (
    <div className="flex h-full flex-col md:fixed md:max-h-screen md:overflow-y-auto">
      <div className="flex h-16 items-center gap-eb-sm px-eb-lg">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-eb-accent-500 text-sm font-bold text-eb-on-accent">
          E
        </div>
        <span className="text-lg font-bold text-eb-on-sidebar">Eagle Bank</span>
      </div>
      <Separator className="bg-eb-sidebar-border" />
      <MainNavigation onNavClick={onNavClick} />
      <div className="border-t border-eb-sidebar-border p-eb-md">
        <div className="mb-eb-sm py-eb-sm">
          <p className="truncate text-sm font-medium text-eb-on-sidebar">
            {profile?.firstName}
            {" "}
            {profile?.lastName}
          </p>
          <p className="truncate text-xs text-eb-on-sidebar-subtle">{profile?.email}</p>
        </div>
        <Button
          className="w-full justify-start text-eb-on-sidebar-muted hover:bg-eb-sidebar-hover hover:text-eb-on-sidebar"
          variant="ghost"
          onClick={handleLogout}
        >
          <LogOutIcon aria-hidden="true" className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  )
}
