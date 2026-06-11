import type { Meta, StoryObj } from "@storybook/react-vite"
import { http, HttpResponse } from "msw"
import { LoginPage } from "./LoginPage"
import { users } from "@/mocks/data/users"
import { WithRouter } from "@/test/storybook"

const { ...sessionUser } = users[0]

const meta = {
  title: "Features/Auth/LoginPage",
  component: LoginPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [WithRouter("/login", "/login")],
} satisfies Meta<typeof LoginPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("/api/auth/login", () =>
          HttpResponse.json({ user: sessionUser }),
        ),
      ],
    },
  },
}

export const InvalidCredentials: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("/api/auth/login", () =>
          HttpResponse.json(
            { message: "Invalid email or password", code: "INVALID_CREDENTIALS" },
            { status: 401 },
          ),
        ),
      ],
    },
  },
}
