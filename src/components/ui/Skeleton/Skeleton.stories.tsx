import type { Meta, StoryObj } from "@storybook/react-vite"
import { Skeleton } from "./Skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "Design System/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-64 space-y-sm rounded-xl border border-db-primary-100 bg-db-surface p-md">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
    </div>
  ),
}
