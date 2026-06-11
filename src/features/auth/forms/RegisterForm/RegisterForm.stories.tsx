import type { Meta, StoryObj } from "@storybook/react-vite"
import { http, HttpResponse } from "msw"
import { RegisterForm } from "./RegisterForm"
import { users } from "@/mocks/data/users"
import { WithRouter } from "@/test/storybook"

const { ...sessionUser } = users[0]

const meta = {
  title: "Features/Auth/RegisterForm",
  component: RegisterForm,
  tags: ["autodocs"],
  decorators: [WithRouter("/register", "/register")],
} satisfies Meta<typeof RegisterForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("/api/auth/register", () =>
          HttpResponse.json({ token: "story-token", user: sessionUser }),
        ),
      ],
    },
  },
}

export const EmailTaken: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("/api/auth/register", () =>
          HttpResponse.json(
            {
              message: "Validation failed",
              fields: { email: "Email is already registered" },
            },
            { status: 400 },
          ),
        ),
      ],
    },
  },
}
