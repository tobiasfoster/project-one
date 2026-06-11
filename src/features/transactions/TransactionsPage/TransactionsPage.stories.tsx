import type { Meta, StoryObj } from "@storybook/react-vite"
import { delay, http, HttpResponse } from "msw"
import { TransactionsPage } from "./TransactionsPage"
import { transactions } from "@/mocks/data/transactions"
import { withRouter } from "@/test/storybook"

/** Mimics the real API's sort + pagination so filters and paging work. */
function buildTransactionsResponse(url: URL) {
  const page = Number.parseInt(url.searchParams.get("page") ?? "1", 10)
  const limit = Number.parseInt(url.searchParams.get("limit") ?? "10", 10)
  const sortBy = url.searchParams.get("sortBy") ?? "date"
  const sortOrder = url.searchParams.get("sortOrder") ?? "desc"

  const sorted = [...transactions].sort((a, b) => {
    if (sortBy === "amount") {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
    }
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA
  })

  const start = (page - 1) * limit
  return {
    transactions: sorted.slice(start, start + limit),
    total: sorted.length,
    page,
    limit,
  }
}

const meta = {
  title: "Features/Transactions/TransactionsPage",
  component: TransactionsPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withRouter("/app/transactions", "/transactions")],
} satisfies Meta<typeof TransactionsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/transactions", ({ request }) =>
          HttpResponse.json(buildTransactionsResponse(new URL(request.url))),
        ),
      ],
    },
  },
}

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/transactions", () =>
          HttpResponse.json({ transactions: [], total: 0, page: 1, limit: 8 }),
        ),
      ],
    },
  },
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/transactions", async ({ request }) => {
          await delay("infinite")
          return HttpResponse.json(buildTransactionsResponse(new URL(request.url)))
        }),
      ],
    },
  },
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/transactions", () =>
          HttpResponse.json({ message: "Server error" }, { status: 500 }),
        ),
      ],
    },
  },
}
