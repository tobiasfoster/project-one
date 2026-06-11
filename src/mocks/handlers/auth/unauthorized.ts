import { http, HttpResponse } from "msw"

export const unauthorizedHandler = http.post("api/auth/unauthorized", () => {
  return new HttpResponse(null, { status: 401 })
})
