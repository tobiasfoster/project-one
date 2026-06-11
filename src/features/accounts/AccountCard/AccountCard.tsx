import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import type { Account } from "@/types"
import { formatAccountNumber } from "@/lib/utils/format-account-number/formatAccountNumber"
import { formatCurrency } from "@/lib/utils/format-currency/formatCurrency"
import { Badge } from "@/components/ui/Badge/Badge"
import { Card, CardContent } from "@/components/ui/Card/Card"
import { cn } from "@/lib/utils/cn"

export function AccountCard({ account }: { account: Account }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 8 }}
    >
      <Link params={{ id: account.id }} to="/accounts/$id">
        <Card className="transition-shadow hover:shadow-md pt-eb-md">
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-eb-primary-900">{account.name}</p>
                <p className="mt-eb-xs font-mono text-xs text-eb-primary-500">
                  {formatAccountNumber(account.accountNumber)}
                </p>
              </div>
              <Badge
                casing="upper"
                variant={account.type === "savings" ? "savings" : "credit"}
              >
                {account.type}
              </Badge>
            </div>
            <div className="mt-eb-sm flex items-center justify-between">
              <p
                className={cn(
                  "text-lg font-bold",
                  account.availableBalance < 0 ? "text-eb-danger-600" : "text-eb-primary-900",
                )}
              >
                {formatCurrency(account.availableBalance)}
              </p>
              <Badge
                casing="upper"
                variant={
                  account.status === "active" ? "success" : "warning"
                }
              >
                {account.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
