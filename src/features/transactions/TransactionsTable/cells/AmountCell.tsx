import { formatCurrency } from "@/lib/utils/format-currency/formatCurrency"

export function AmountCell({ amount }: { amount: number }) {
  return (
    <span
      className={
        amount >= 0
          ? "font-medium text-db-accent-600"
          : "font-medium text-db-primary-900"
      }
    >
      {formatCurrency(amount)}
    </span>
  )
}
