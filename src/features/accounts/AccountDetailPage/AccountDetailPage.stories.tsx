import type { Meta, StoryObj } from "@storybook/react-vite"
import { delay, http, HttpResponse } from "msw"
import { AccountDetailPage } from "./AccountDetailPage"
import { accounts } from "@/mocks/data/accounts"
import { WithRouter } from "@/test/storybook"

const account = accounts[0]

const meta = {
  title: "Features/Accounts/AccountDetailPage",
  component: AccountDetailPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [WithRouter("/app/accounts/$id", `/accounts/${account.id}`)],
} satisfies Meta<typeof AccountDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/accounts/:id", () => HttpResponse.json(account)),
      ],
    },
  },
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/accounts/:id", async () => {
          await delay("infinite")
          return HttpResponse.json(account)
        }),
      ],
    },
  },
}

export const NotFound: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/accounts/:id", () =>
          HttpResponse.json({ message: "Account not found" }, { status: 404 }),
        ),
      ],
    },
  },
}
