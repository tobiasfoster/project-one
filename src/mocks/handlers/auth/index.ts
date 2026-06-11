import { authSessionHandler } from "./session"
import { loginHandler } from "./login"
import { logoutHandler } from "./logout"
import { registerHandler } from "./register"
import { unauthorizedHandler } from "./unauthorized"

export const authHandlers = [loginHandler, logoutHandler, registerHandler, authSessionHandler, unauthorizedHandler]
