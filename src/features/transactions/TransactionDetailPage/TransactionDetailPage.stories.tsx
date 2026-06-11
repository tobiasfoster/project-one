import type { Meta, StoryObj } from "@storybook/react-vite"
import { delay, http, HttpResponse } from "msw"
import { TransactionDetailPage } from "./TransactionDetailPage"
import { transactions } from "@/mocks/data/transactions"
import { withRouter } from "@/test/storybook"

const transaction = transactions[0]

const meta = {
  title: "Features/Transactions/TransactionDetailPage",
  component: TransactionDetailPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    withRouter("/app/transactions/$id", `/transactions/${transaction.id}`),
  ],
} satisfies Meta<typeof TransactionDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/transactions/:id", () => HttpResponse.json(transaction)),
      ],
    },
  },
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/transactions/:id", async () => {
          await delay("infinite")
          return HttpResponse.json(transaction)
        }),
      ],
    },
  },
}

export const NotFound: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/transactions/:id", () =>
          HttpResponse.json(
            { message: "Transaction not found" },
            { status: 404 },
          ),
        ),
      ],
    },
  },
}
