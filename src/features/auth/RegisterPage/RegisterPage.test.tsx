import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it } from "vitest"
import { http, HttpResponse } from "msw"
import { RegisterPage } from "./RegisterPage"
import { useAuthStore } from "../store/auth.store"
import { useProfileStore } from "@/features/profile/store/profile.store"
import { server } from "@/mocks/server"
import { renderWithProviders } from "@/test/test-utils"
import type { User } from "@/types"

const registeredUser: User = {
  id: "user-1",
  email: "sam.taylor@email.com",
  profile: {
    id: "profile-1",
    firstName: "Sam",
    lastName: "Taylor",
    email: "sam.taylor@email.com",
  },
}

describe("RegisterPage", () => {
  afterEach(() => {
    useAuthStore.setState({ user: null })
    useProfileStore.setState({ profile: null })
    sessionStorage.clear()
    localStorage.clear()
  })

  it("submits first name, last name, email, and password then stores the returned user", async () => {
    const user = userEvent.setup()
    let requestBody: unknown

    server.use(
      http.post("/api/auth/register", async ({ request }) => {
        requestBody = await request.json()

        return HttpResponse.json({ token: "test-token", user: registeredUser })
      }),
    )

    renderWithProviders(<RegisterPage />, { route: "/register" })

    await user.type(screen.getByLabelText(/first name/i), "Sam")
    await user.type(screen.getByLabelText(/last name/i), "Taylor")
    await user.type(screen.getByLabelText(/email/i), "sam.taylor@email.com")
    await user.type(screen.getByLabelText(/^password$/i), "Password1")
    await user.type(screen.getByLabelText(/confirm password/i), "Password1")
    await user.click(screen.getByRole("button", { name: /create account/i }))

    await waitFor(() => {
      expect(requestBody).toEqual({
        firstName: "Sam",
        lastName: "Taylor",
        email: "sam.taylor@email.com",
        password: "Password1",
      })
    })
    await waitFor(() => expect(useAuthStore.getState().user).toEqual(registeredUser))
    expect(useProfileStore.getState().profile).toEqual(registeredUser.profile)
  })
})
