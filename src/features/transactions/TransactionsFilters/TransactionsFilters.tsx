import { Field, FieldLabel } from "@/components/ui/Field/Field"
import { Input } from "@/components/ui/Input/Input"
import { Select } from "@/components/ui/Select/Select"

interface TransactionsFiltersProps {
  startDate: string
  endDate: string
  sortBy: "date" | "amount"
  sortOrder: "asc" | "desc"
  onChange: (next: {
    startDate?: string
    endDate?: string
    sortBy?: "date" | "amount"
    sortOrder?: "asc" | "desc"
  }) => void
}

export function TransactionsFilters({
  startDate,
  endDate,
  sortBy,
  sortOrder,
  onChange,
}: TransactionsFiltersProps) {
  return (
    <div className="mb-eb-lg grid gap-eb-md rounded-xl border border-eb-primary-100 bg-eb-surface p-eb-md sm:grid-cols-2 lg:grid-cols-4">
      <Field>
        <FieldLabel htmlFor="startDate">From</FieldLabel>
        <Input
          id="startDate"
          type="date"
          value={startDate}
          onChange={e => onChange({ startDate: e.target.value })}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="endDate">To</FieldLabel>
        <Input
          id="endDate"
          type="date"
          value={endDate}
          onChange={e => onChange({ endDate: e.target.value })}
        />
      </Field>
      <Select
        label="Sort by"
        options={[
          { value: "date", label: "Date" },
          { value: "amount", label: "Amount" },
        ]}
        value={sortBy}
        onValueChange={(v) => {
          if (v) onChange({ sortBy: v as "date" | "amount" })
        }}
      />
      <Select
        label="Order"
        options={[
          { value: "desc", label: "Descending" },
          { value: "asc", label: "Ascending" },
        ]}
        value={sortOrder}
        onValueChange={(v) => {
          if (v) onChange({ sortOrder: v as "asc" | "desc" })
        }}
      />
    </div>
  )
}
