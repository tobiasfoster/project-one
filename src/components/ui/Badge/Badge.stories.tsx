import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "./Badge"

const meta: Meta<typeof Badge> = {
  title: "Design System/Badge",
  component: Badge,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { children: "Default" } }
export const Success: Story = { args: { children: "Active", variant: "success" } }
export const Savings: Story = { args: { children: "Savings", variant: "savings" } }
export const Credit: Story = { args: { children: "Credit", variant: "credit" } }
