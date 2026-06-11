import type { Decorator, Meta, StoryObj } from "@storybook/react-vite"
import { delay, http, HttpResponse } from "msw"
import { ProfilePage } from "./ProfilePage"
import { users } from "@/mocks/data/users"
import { ToastProvider } from "@/components/ui/Toast/Toast"
import { withRouter } from "@/test/storybook"
import type { Profile } from "@/types"

const profile = users[0].profile

/** Mirrors the app shell so success toasts render after a save. */
const withToaster: Decorator = Story => (
  <ToastProvider>
    <Story />
  </ToastProvider>
)

const meta = {
  title: "Features/Profile/ProfilePage",
  component: ProfilePage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withToaster, withRouter("/app/profile", "/profile")],
} satisfies Meta<typeof ProfilePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/profile", () => HttpResponse.json(profile)),
        http.put("/api/profile", async ({ request }) => {
          const body = (await request.json()) as Partial<Profile>
          return HttpResponse.json({ ...profile, ...body })
        }),
      ],
    },
  },
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/profile", async () => {
          await delay("infinite")
          return HttpResponse.json(profile)
        }),
      ],
    },
  },
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/profile", () =>
          HttpResponse.json({ message: "Server error" }, { status: 500 }),
        ),
      ],
    },
  },
}
