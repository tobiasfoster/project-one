import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { TransactionsTable } from "./TransactionsTable"
import { transactions } from "@/mocks/data/transactions"
import { withRouter } from "@/test/storybook"

const meta = {
  title: "Features/Transactions/TransactionsTable",
  component: TransactionsTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  // Description cells render <Link>s to the detail route.
  decorators: [withRouter("/app/transactions", "/transactions")],
  args: { onToggleSort: fn(), sortBy: "date", sortOrder: "desc" },
} satisfies Meta<typeof TransactionsTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { transactions: transactions.slice(0, 8) },
}

export const SortedByAmount: Story = {
  args: {
    transactions: transactions.slice(0, 8),
    sortBy: "amount",
    sortOrder: "asc",
  },
}

export const Empty: Story = {
  args: { transactions: [] },
}
