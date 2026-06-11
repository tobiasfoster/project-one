import type { Meta, StoryObj } from "@storybook/react-vite"
import { EmptyState } from "./EmptyState"
import { Button } from "@/components/ui/Button/Button"

const meta: Meta<typeof EmptyState> = {
  title: "Design System/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    title: "No transactions found",
    description: "Try adjusting your filters or check back later.",
    action: <Button variant="secondary">Clear filters</Button>,
  },
}
