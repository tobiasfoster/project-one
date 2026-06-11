import type { Meta, StoryObj } from "@storybook/react-vite"
import { ApiErrorState } from "./ApiErrorState"

const meta: Meta<typeof ApiErrorState> = {
  title: "Design System/ApiErrorState",
  component: ApiErrorState,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ApiErrorState>

export const Default: Story = {
  args: {
    onRetry: () => alert("Retry clicked"),
  },
}
