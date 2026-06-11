import type { Meta, StoryObj } from "@storybook/react-vite"
import { DashboardQuickActions } from "./DashboardQuickActions"
import { WithRouter } from "@/test/storybook"

const meta = {
  title: "Features/Dashboard/DashboardQuickActions",
  component: DashboardQuickActions,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  // Buttons render <Link>s, so a router context is required.
  decorators: [WithRouter("/app/dashboard", "/dashboard")],
} satisfies Meta<typeof DashboardQuickActions>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
