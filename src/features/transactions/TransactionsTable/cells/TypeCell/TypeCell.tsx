import type { TransactionType } from "@/types"
import { Badge } from "@/components/ui/Badge/Badge"

const typeVariant: Record<TransactionType, "success" | "warning" | "default"> = {
  deposit: "success",
  withdrawal: "warning",
  transfer: "default",
}

export function TypeCell({ type }: { type: TransactionType }) {
  return <Badge casing="upper" variant={typeVariant[type]}>{type}</Badge>
}
