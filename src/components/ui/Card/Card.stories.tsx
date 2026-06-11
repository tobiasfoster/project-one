import type { Meta, StoryObj } from "@storybook/react-vite"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card"

const meta: Meta<typeof Card> = {
  title: "Design System/Card",
  component: Card,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Account Balance</CardTitle>
        <CardDescription>Your current savings balance</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-db-primary-900">$12,450.75</p>
      </CardContent>
    </Card>
  ),
}
