import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { SortableHeader } from "./SortableHeader"

const meta = {
  title: "Features/Transactions/SortableHeader",
  component: SortableHeader,
  tags: ["autodocs"],
  args: { onSort: fn() },
} satisfies Meta<typeof SortableHeader>

export default meta
type Story = StoryObj<typeof meta>

export const InactiveColumn: Story = {
  args: { label: "Amount", active: false, order: "desc" },
}

export const SortedDescending: Story = {
  args: { label: "Date", active: true, order: "desc" },
}

export const SortedAscending: Story = {
  args: { label: "Date", active: true, order: "asc" },
}
