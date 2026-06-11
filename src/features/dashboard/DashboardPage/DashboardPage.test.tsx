import { beforeEach, describe, expect, it } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { DashboardPage } from "./DashboardPage"
import { server } from "@/mocks/server"
import { loginAsTestUser } from "@/test/auth-helpers"
import { renderWithProviders } from "@/test/test-utils"

describe("DashboardPage", () => {
  beforeEach(async () => {
    await loginAsTestUser()
  })

  it("loads and displays dashboard data", async () => {
    renderWithProviders(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText(/welcome back, jane/i)).toBeInTheDocument()
    })
    expect(screen.getByText(/primary savings/i)).toBeInTheDocument()
    expect(screen.getByText(/monthly deposits/i)).toBeInTheDocument()
  })

  it("shows error state with retry on API failure", async () => {
    server.use(
      http.get("/api/dashboard", () =>
        HttpResponse.json({ message: "Server error" }, { status: 500 }),
      ),
    )

    renderWithProviders(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument()
    })

    server.resetHandlers()

    const user = userEvent.setup()
    await user.click(screen.getByRole("button", { name: /try again/i }))

    await waitFor(() => {
      expect(screen.getByText(/welcome back/i)).toBeInTheDocument()
    })
  })
})
