import { Link } from "@tanstack/react-router"
import { LayoutDashboardIcon } from "@/components/ui/icons/LayoutDashboardIcon/LayoutDashboardIcon"
import { WalletIcon } from "@/components/ui/icons/WalletIcon/WalletIcon"
import { ArrowLeftRightIcon } from "@/components/ui/icons/ArrowLeftRightIcon/ArrowLeftRightIcon"
import { UserIcon } from "@/components/ui/icons/UserIcon/UserIcon"

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { to: "/accounts", label: "Accounts", icon: WalletIcon },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRightIcon },
  { to: "/profile", label: "Profile", icon: UserIcon },
] as const

type MainNavigationProps = {
  onNavClick?: () => void
}

export function MainNavigation({ onNavClick }: MainNavigationProps) {
  return (
    <nav aria-label="Main navigation" className="flex-1 space-y-eb-xs py-eb-sm px-eb-md">
      {navItems.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          activeProps={{ className: "bg-eb-sidebar-active text-eb-on-sidebar" }}
          className="flex items-center gap-eb-sm rounded-lg px-eb-sm py-eb-sm text-sm font-medium transition-colors"
          inactiveProps={{
            className: "text-eb-on-sidebar-muted hover:bg-eb-sidebar-hover hover:text-eb-on-sidebar",
          }}
          to={to}
          onClick={onNavClick}
        >
          <Icon aria-hidden="true" className="h-5 w-5" />
          {label}
        </Link>
      ))}
    </nav>
  )
}
