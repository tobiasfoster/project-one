import type { IncomingMessage, ServerResponse } from "node:http"
import type { Plugin } from "vite"
import { createMiddleware } from "@mswjs/http-middleware"
import { handlers } from "./handlers"

type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (error?: unknown) => void,
) => void

function shouldEnableMocks(): boolean {
  return process.env.VITE_ENABLE_MOCKS !== "false"
}

function asExpressRequest(req: IncomingMessage): IncomingMessage {
  const expressReq = req as IncomingMessage & {
    protocol: string
    get: (name: string) => string | undefined
    header: (name: string) => string | undefined
  }

  expressReq.protocol = "http"
  expressReq.get = (name: string) => {
    const value = req.headers[name.toLowerCase()]
    return Array.isArray(value) ? value[0] : value
  }
  expressReq.header = expressReq.get

  return expressReq
}

/**
 * Serves mock API responses from the Vite dev/preview server so `/api/*`
 * requests never fall through to the SPA HTML fallback when the browser
 * service worker is inactive or bypasses a request.
 */
export function mswDevServerPlugin(): Plugin {
  const mswMiddleware = createMiddleware(...handlers)
  const middleware: Middleware = (req, res, next) => {
    if (!req.url?.startsWith("/api/")) {
      next()
      return
    }

    mswMiddleware(asExpressRequest(req), res, next)
  }

  const attachMiddleware = (middlewares: { use: (fn: Middleware) => void }) => {
    if (!shouldEnableMocks()) return
    middlewares.use(middleware)
  }

  return {
    name: "msw-dev-server",
    configureServer(server) {
      attachMiddleware(server.middlewares)
    },
    configurePreviewServer(server) {
      attachMiddleware(server.middlewares)
    },
  }
}
