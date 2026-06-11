import type { Meta, StoryObj } from "@storybook/react-vite"
import { Input } from "./Input"
import { Field, FieldLabel } from "../Field/Field"
import { FormError } from "../FormError/FormError"

const meta: Meta<typeof Input> = {
  title: "Design System/Input",
  component: Input,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" placeholder="you@example.com" />
    </Field>
  ),
}

export const WithError: Story = {
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="email-error">Email</FieldLabel>
      <Input defaultValue="invalid" hasError id="email-error" />
      <FormError>Invalid email address</FormError>
    </Field>
  ),
}
