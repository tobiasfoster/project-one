import { setupWorker } from "msw/browser"
import { handlers } from "./handlers"

export const worker = setupWorker(...handlers)

worker.events.on("request:match", ({ request, requestId }) => {
  console.log("[MSW] request started", requestId, request.method, request.url, Object.fromEntries(request.headers.entries()), request.body)
})
worker.events.on("response:mocked", async ({ request, response }) => {
  const body = await response.json()

  console.log("[MSW] response mocked", request.method, request.url, response.status, response.headers, body)
})
