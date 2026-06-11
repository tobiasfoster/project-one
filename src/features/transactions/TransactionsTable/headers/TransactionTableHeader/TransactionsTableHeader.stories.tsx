import type { Meta, StoryObj } from "@storybook/react-vite"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { fn } from "storybook/test"
import { TransactionsTableHeader } from "./TransactionsTableHeader"
import { createTransactionColumns } from "../utils/create-columns"
import { transactions } from "@/mocks/data/transactions"

const noop = fn()

/** Builds a real TanStack table so the header receives a valid instance. */
function HeaderHarness({
  sortBy,
  sortOrder,
}: {
  sortBy: "date" | "amount"
  sortOrder: "asc" | "desc"
}) {
  const table = useReactTable({
    data: transactions.slice(0, 5),
    columns: createTransactionColumns({ sortBy, sortOrder, onToggleSort: noop }),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="w-full overflow-hidden rounded-xl border border-eb-primary-100 bg-eb-surface text-sm">
      <TransactionsTableHeader sortBy={sortBy} sortOrder={sortOrder} table={table} />
    </table>
  )
}

const meta: Meta<typeof TransactionsTableHeader> = {
  title: "Features/Transactions/TransactionsTableHeader",
  component: TransactionsTableHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof TransactionsTableHeader>

export const SortedByDate: Story = {
  render: () => <HeaderHarness sortBy="date" sortOrder="desc" />,
}

export const SortedByAmount: Story = {
  render: () => <HeaderHarness sortBy="amount" sortOrder="asc" />,
}
