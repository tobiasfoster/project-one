import { ArrowDownIcon } from "@/components/ui/icons/ArrowDownIcon/ArrowDownIcon"
import { ArrowUpIcon } from "@/components/ui/icons/ArrowUpIcon/ArrowUpIcon"

interface SortableHeaderProps {
  label: string
  active: boolean
  order: "asc" | "desc"
  onSort: () => void
}

export function SortableHeader({
  label,
  active,
  order,
  onSort,
}: SortableHeaderProps) {
  return (
    <button
      className="flex items-center gap-xs font-medium"
      type="button"
      onClick={onSort}
    >
      {label}
      {active
        && (order === "asc"
          ? (
              <ArrowUpIcon aria-hidden="true" className="h-3 w-3" />
            )
          : (
              <ArrowDownIcon aria-hidden="true" className="h-3 w-3" />
            ))}
    </button>
  )
}
