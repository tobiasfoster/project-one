import { formatCurrency } from "@/lib/utils/format-currency/formatCurrency"

export function AmountCell({ amount }: { amount: number }) {
  return (
    <span
      className={
        amount >= 0
          ? "font-medium text-eb-accent-600"
          : "font-medium text-eb-primary-900"
      }
    >
      {formatCurrency(amount)}
    </span>
  )
}
