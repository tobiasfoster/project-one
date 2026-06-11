import type { Meta, StoryObj } from "@storybook/react-vite"
import { DescriptionCell } from "./DescriptionCell"
import { WithRouter } from "@/test/storybook"

const meta = {
  title: "Features/Transactions/Cells/DescriptionCell",
  component: DescriptionCell,
  tags: ["autodocs"],
  // Renders a router-aware <Link> to the transaction detail page.
  decorators: [WithRouter("/app/transactions", "/transactions")],
} satisfies Meta<typeof DescriptionCell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { id: "txn-1", description: "Payroll deposit" },
}

export const LongDescription: Story = {
  args: {
    id: "txn-2",
    description: "Recurring monthly subscription — Premium streaming bundle",
  },
}
