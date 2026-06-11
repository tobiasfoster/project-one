import { motion } from "framer-motion"
import type { LucideIcon } from "@/components/ui/icons/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card/Card"
import { cn } from "@/lib/utils/cn"

type DashboardSummaryCardProps = {
  title: string
  value: string
  icon: LucideIcon
  color: string
  bg: string
  index: number
}

export function DashboardSummaryCard({
  title,
  value,
  icon: Icon,
  color,
  bg,
  index,
}: DashboardSummaryCardProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 10 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-sm">
          <CardTitle as="h2" className="text-sm font-medium text-eb-primary-500">
            {title}
          </CardTitle>
          <div className={cn("rounded-lg p-eb-sm", bg)}>
            <Icon aria-hidden="true" className={cn("h-4 w-4", color)} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-eb-primary-900">{value}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
