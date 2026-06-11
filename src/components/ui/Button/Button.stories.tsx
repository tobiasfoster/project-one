import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  title: "Design System/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive", "accent"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { children: "Primary", variant: "primary" },
}

export const Secondary: Story = {
  args: { children: "Secondary", variant: "secondary" },
}

export const Accent: Story = {
  args: { children: "Accent", variant: "accent" },
}

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
}
