import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it } from "vitest"
import { http, HttpResponse } from "msw"
import { LoginForm } from "./LoginForm"
import { useAuthStore } from "@/features/auth/store/auth.store"
import { useProfileStore } from "@/features/profile/store/profile.store"
import { server } from "@/mocks/server"
import { renderWithProviders } from "@/test/test-utils"
import type { User } from "@/types"

const sessionUser: User = {
  id: "user-1",
  email: "jane.doe@email.com",
  profile: {
    id: "profile-1",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@email.com",
  },
}

describe("LoginForm", () => {
  afterEach(() => {
    useAuthStore.setState({ user: null })
    useProfileStore.setState({ profile: null })
    sessionStorage.clear()
    localStorage.clear()
  })

  it("submits email and password then stores the returned user and profile", async () => {
    const user = userEvent.setup()
    let requestBody: unknown

    server.use(
      http.post("/api/auth/login", async ({ request }) => {
        requestBody = await request.json()

        return HttpResponse.json({ token: "test-token", user: sessionUser })
      }),
    )

    renderWithProviders(<LoginForm />, { route: "/login" })

    await user.clear(screen.getByLabelText(/email/i))
    await user.type(screen.getByLabelText(/email/i), "jane.doe@email.com")
    await user.clear(screen.getByLabelText(/^password$/i))
    await user.type(screen.getByLabelText(/^password$/i), "Password123!")
    await user.click(screen.getByRole("button", { name: /sign in/i }))

    await waitFor(() => {
      expect(requestBody).toEqual({
        email: "jane.doe@email.com",
        password: "Password123!",
      })
    })
    await waitFor(() => expect(useAuthStore.getState().user).toEqual(sessionUser))
    expect(useProfileStore.getState().profile).toEqual(sessionUser.profile)
  })

  it("shows a server error when login fails", async () => {
    const user = userEvent.setup()

    server.use(
      http.post("/api/auth/login", () =>
        HttpResponse.json(
          { message: "Invalid email or password", code: "INVALID_CREDENTIALS" },
          { status: 401 },
        ),
      ),
    )

    renderWithProviders(<LoginForm />, { route: "/login" })

    await user.click(screen.getByRole("button", { name: /sign in/i }))

    expect(await screen.findByRole("alert")).toHaveTextContent("Invalid email or password")
    expect(useAuthStore.getState().user).toBeNull()
  })
})
