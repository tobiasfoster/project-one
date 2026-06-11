import type { Meta, StoryObj } from "@storybook/react-vite"
import { TypeCell } from "./TypeCell"

const meta = {
  title: "Features/Transactions/Cells/TypeCell",
  component: TypeCell,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["deposit", "withdrawal", "transfer"],
    },
  },
} satisfies Meta<typeof TypeCell>

export default meta
type Story = StoryObj<typeof meta>

export const Deposit: Story = {
  args: { type: "deposit" },
}

export const Withdrawal: Story = {
  args: { type: "withdrawal" },
}

export const Transfer: Story = {
  args: { type: "transfer" },
}
