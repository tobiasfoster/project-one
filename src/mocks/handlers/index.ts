import { accountsHandlers } from "./accounts"
import { authHandlers } from "./auth"
import { dashboardHandlers } from "./dashboard"
import { profileHandlers } from "./profile"
import { transactionsHandlers } from "./transactions"

// const registerHandler = http.post("/api/auth/register", async ({ request, cookies }) => {
//   const body = (await request.json()) as RegisterRequest

//   const fields: Record<string, string> = {}

//   if (!body.firstName?.trim()) fields.firstName = "First name is required"
//   if (!body.lastName?.trim()) fields.lastName = "Last name is required"
//   if (!body.email?.trim()) fields.email = "Email is required"
//   if (!body.password?.trim()) fields.password = "Password is required"

//   if (Object.keys(fields).length > 0) {
//     return HttpResponse.json({ message: "Validation failed", fields }, { status: 400 })
//   }

//   const user = db.createUser({
//     email: body.email!,
//     password: body.password!,
//     firstName: body.firstName!,
//     lastName: body.lastName!,
//     id: `user-${Date.now()}`,
//   })

//   return HttpResponse.json({ user }, { headers: { "set-cookie": `${SESSION_AUTH_COOKIE_NAME}=${SESSION_AUTH_COOKIE_VALUE}; Path=/; Max-Age=3600` } })
// })

export const handlers = [
  ...authHandlers,
  ...dashboardHandlers,
  ...accountsHandlers,
  ...transactionsHandlers,
  ...profileHandlers,
]
