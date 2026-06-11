import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { TransactionsFilters } from "./TransactionsFilters"

const meta: Meta<typeof TransactionsFilters> = {
  title: "Features/Transactions/TransactionsFilters",
  component: TransactionsFilters,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof TransactionsFilters>

/** Controlled wrapper so the date/sort inputs are interactive in the canvas. */
function InteractiveFilters({
  startDate: initialStartDate = "",
  endDate: initialEndDate = "",
  sortBy: initialSortBy = "date",
  sortOrder: initialSortOrder = "desc",
}: {
  startDate?: string
  endDate?: string
  sortBy?: "date" | "amount"
  sortOrder?: "asc" | "desc"
}) {
  const [filters, setFilters] = useState({
    startDate: initialStartDate,
    endDate: initialEndDate,
    sortBy: initialSortBy,
    sortOrder: initialSortOrder,
  })

  return (
    <TransactionsFilters
      endDate={filters.endDate}
      sortBy={filters.sortBy}
      sortOrder={filters.sortOrder}
      startDate={filters.startDate}
      onChange={next => setFilters(prev => ({ ...prev, ...next }))}
    />
  )
}

export const Default: Story = {
  render: () => <InteractiveFilters />,
}

export const WithDateRange: Story = {
  render: () => (
    <InteractiveFilters
      endDate="2026-06-30"
      sortBy="amount"
      sortOrder="asc"
      startDate="2026-06-01"
    />
  ),
}
