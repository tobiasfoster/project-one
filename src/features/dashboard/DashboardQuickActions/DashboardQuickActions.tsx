import { Link } from "@tanstack/react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card/Card"
import { Button } from "@/components/ui/Button/Button"

export function DashboardQuickActions() {
  return (
    <Card className="mt-lg">
      <CardHeader>
        <CardTitle as="h2">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-sm">
        <Button render={<Link to="/accounts" />} variant="secondary">
          View Accounts
        </Button>
        <Button render={<Link to="/transactions" />} variant="secondary">
          Transaction History
        </Button>
        <Button render={<Link to="/profile" />} variant="accent">
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  )
}
