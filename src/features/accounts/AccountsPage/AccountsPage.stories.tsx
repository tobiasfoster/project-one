import type { Meta, StoryObj } from "@storybook/react-vite"
import { delay, http, HttpResponse } from "msw"
import { AccountsPage } from "./AccountsPage"
import { accounts } from "@/mocks/data/accounts"
import { withRouter } from "@/test/storybook"

const meta = {
  title: "Features/Accounts/AccountsPage",
  component: AccountsPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withRouter("/app/accounts", "/accounts")],
} satisfies Meta<typeof AccountsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [http.get("/api/accounts", () => HttpResponse.json(accounts))],
    },
  },
}

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [http.get("/api/accounts", () => HttpResponse.json([]))],
    },
  },
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/accounts", async () => {
          await delay("infinite")
          return HttpResponse.json(accounts)
        }),
      ],
    },
  },
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/accounts", () =>
          HttpResponse.json({ message: "Server error" }, { status: 500 }),
        ),
      ],
    },
  },
}
