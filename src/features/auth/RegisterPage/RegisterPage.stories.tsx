import type { Meta, StoryObj } from "@storybook/react-vite"
import { http, HttpResponse } from "msw"
import { RegisterPage } from "./RegisterPage"
import { users } from "@/mocks/data/users"
import { withRouter } from "@/test/storybook"

const { password: _password, ...sessionUser } = users[0]

const meta = {
  title: "Features/Auth/RegisterPage",
  component: RegisterPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withRouter("/register", "/register")],
} satisfies Meta<typeof RegisterPage>

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
