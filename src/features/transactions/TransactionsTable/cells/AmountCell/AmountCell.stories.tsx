import type { Meta, StoryObj } from "@storybook/react-vite"
import { AmountCell } from "./AmountCell"

const meta = {
  title: "Features/Transactions/Cells/AmountCell",
  component: AmountCell,
  tags: ["autodocs"],
} satisfies Meta<typeof AmountCell>

export default meta
type Story = StoryObj<typeof meta>

export const Credit: Story = {
  args: { amount: 2500 },
}

export const Debit: Story = {
  args: { amount: -89.99 },
}

export const Zero: Story = {
  args: { amount: 0 },
}
