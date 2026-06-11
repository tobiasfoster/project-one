import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it } from "vitest"
import { http, HttpResponse } from "msw"
import { ProfileForm } from "./ProfileForm"
import { useProfileStore } from "../store/profile.store"
import { server } from "@/mocks/server"
import { renderWithProviders } from "@/test/test-utils"
import type { Profile } from "@/types"

const profile: Profile = {
  id: "profile-1",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@email.com",
  phone: "+1 (555) 123-4567",
  address: "123 Eagle Street, New York, NY 10001",
}

const updatedProfile: Profile = {
  ...profile,
  firstName: "Janet",
}

describe("ProfileForm", () => {
  afterEach(() => {
    useProfileStore.setState({ profile: null })
    localStorage.clear()
  })

  it("submits updated profile fields and stores the returned profile", async () => {
    const user = userEvent.setup()
    let requestBody: unknown

    server.use(
      http.put("/api/profile", async ({ request }) => {
        requestBody = await request.json()
        return HttpResponse.json(updatedProfile)
      }),
    )

    renderWithProviders(<ProfileForm profile={profile} />, { route: "/profile" })

    await user.clear(screen.getByLabelText(/first name/i))
    await user.type(screen.getByLabelText(/first name/i), "Janet")
    await user.click(screen.getByRole("button", { name: /save changes/i }))

    await waitFor(() => {
      expect(requestBody).toEqual({
        firstName: "Janet",
        lastName: "Doe",
        email: "jane.doe@email.com",
        phone: "+1 (555) 123-4567",
        address: "123 Eagle Street, New York, NY 10001",
        avatarUrl: undefined,
      })
    })
    await waitFor(() => expect(useProfileStore.getState().profile).toEqual(updatedProfile))
  })

  it("includes avatar preview in the update request when provided", async () => {
    const user = userEvent.setup()
    let requestBody: unknown

    server.use(
      http.put("/api/profile", async ({ request }) => {
        requestBody = await request.json()
        return HttpResponse.json({ ...profile, avatarUrl: "blob:preview" })
      }),
    )

    renderWithProviders(
      <ProfileForm avatarPreview="blob:preview" profile={profile} />,
      { route: "/profile" },
    )

    await user.click(screen.getByRole("button", { name: /save changes/i }))

    await waitFor(() => {
      expect(requestBody).toMatchObject({ avatarUrl: "blob:preview" })
    })
  })

  it("shows field errors when the server rejects the update", async () => {
    const user = userEvent.setup()

    server.use(
      http.put("/api/profile", () =>
        HttpResponse.json(
          {
            message: "Validation failed",
            fields: { email: "Email is already in use" },
          },
          { status: 400 },
        ),
      ),
    )

    renderWithProviders(<ProfileForm profile={profile} />, { route: "/profile" })

    await user.clear(screen.getByLabelText(/email/i))
    await user.type(screen.getByLabelText(/email/i), "taken@email.com")
    await user.click(screen.getByRole("button", { name: /save changes/i }))

    expect(await screen.findByText("Email is already in use")).toBeInTheDocument()
    expect(useProfileStore.getState().profile).toBeNull()
  })

  it("shows a server error when the update fails", async () => {
    const user = userEvent.setup()

    server.use(
      http.put("/api/profile", () =>
        HttpResponse.json({ message: "Something went wrong" }, { status: 500 }),
      ),
    )

    renderWithProviders(<ProfileForm profile={profile} />, { route: "/profile" })

    await user.clear(screen.getByLabelText(/first name/i))
    await user.type(screen.getByLabelText(/first name/i), "Janet")
    await user.click(screen.getByRole("button", { name: /save changes/i }))

    expect(await screen.findByRole("alert")).toHaveTextContent("Something went wrong")
    expect(useProfileStore.getState().profile).toBeNull()
  })

  it("disables save when the form is pristine and enables after edits", async () => {
    renderWithProviders(<ProfileForm profile={profile} />, { route: "/profile" })

    expect(screen.getByRole("button", { name: /save changes/i })).toBeDisabled()

    const user = userEvent.setup()
    await user.clear(screen.getByLabelText(/first name/i))
    await user.type(screen.getByLabelText(/first name/i), "Janet")

    expect(screen.getByRole("button", { name: /save changes/i })).toBeEnabled()
  })
})
