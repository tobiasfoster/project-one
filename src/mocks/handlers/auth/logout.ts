import { http, HttpResponse } from "msw"

import { clearSessionCookie } from "../utils"

export const logoutHandler = http.post("/api/auth/logout", () => {
  return new HttpResponse(null, { status: 204, headers: { "set-cookie": clearSessionCookie() } })
})
