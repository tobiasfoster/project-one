import type { Meta, StoryObj } from "@storybook/react-vite"
import { delay, http, HttpResponse } from "msw"
import { DashboardPage } from "./DashboardPage"
import { accounts } from "@/mocks/data/accounts"
import { transactions } from "@/mocks/data/transactions"
import { users } from "@/mocks/data/users"
import { getDashboardData } from "@/mocks/handlers/utils"
import { withProfile, withRouter } from "@/test/storybook"

const dashboardData = getDashboardData(accounts, transactions)

const meta = {
  title: "Features/Dashboard/DashboardPage",
  component: DashboardPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    withProfile(users[0].profile),
    withRouter("/app/dashboard", "/dashboard"),
  ],
} satisfies Meta<typeof DashboardPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [http.get("/api/dashboard", () => HttpResponse.json(dashboardData))],
    },
  },
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/dashboard", async () => {
          await delay("infinite")
          return HttpResponse.json(dashboardData)
        }),
      ],
    },
  },
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/dashboard", () =>
          HttpResponse.json({ message: "Server error" }, { status: 500 }),
        ),
      ],
    },
  },
}
