import type { Meta, StoryObj } from "@storybook/react-vite"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { fn } from "storybook/test"
import { TransactionsTableBody } from "./TransactionsTableBody"
import { createTransactionColumns } from "./create-columns"
import { transactions } from "@/mocks/data/transactions"
import { WithRouter } from "@/test/storybook"

const noop = fn()

/** Builds a real TanStack table so the body receives a valid instance. */
function BodyHarness({ rows }: { rows: number }) {
  const table = useReactTable({
    data: transactions.slice(0, rows),
    columns: createTransactionColumns({
      sortBy: "date",
      sortOrder: "desc",
      onToggleSort: noop,
    }),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="w-full overflow-hidden rounded-xl border border-db-primary-100 bg-db-surface text-sm">
      <TransactionsTableBody table={table} />
    </table>
  )
}

const meta: Meta<typeof TransactionsTableBody> = {
  title: "Features/Transactions/TransactionsTableBody",
  component: TransactionsTableBody,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  // Description cells render <Link>s to the detail route.
  decorators: [WithRouter("/app/transactions", "/transactions")],
}

export default meta
type Story = StoryObj<typeof TransactionsTableBody>

export const Default: Story = {
  render: () => <BodyHarness rows={8} />,
}

export const SingleRow: Story = {
  render: () => <BodyHarness rows={1} />,
}
