import { describe, expect, it } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { LoginPage } from "./LoginPage"
import { renderWithProviders } from "@/test/test-utils"

describe("LoginPage", () => {
  it("renders login form", () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByRole("heading", { name: /welcome back/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it("shows validation errors for empty submit", async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginPage />)

    await user.clear(screen.getByLabelText(/email/i))
    await user.clear(screen.getByLabelText(/password/i))
    await user.click(screen.getByRole("button", { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    })
  })

  it("logs in with valid credentials", async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginPage />)

    await user.click(screen.getByRole("button", { name: /sign in/i }))

    await waitFor(() => {
      expect(localStorage.getItem("eagle-bank-token")).toBeTruthy()
    })
  })

  it("shows error for invalid credentials", async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginPage />)

    await user.clear(screen.getByLabelText(/email/i))
    await user.type(screen.getByLabelText(/email/i), "wrong@email.com")
    await user.clear(screen.getByLabelText(/password/i))
    await user.type(screen.getByLabelText(/password/i), "wrongpassword")
    await user.click(screen.getByRole("button", { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()
    })
  })
})
