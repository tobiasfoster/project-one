import { authSessionHandler } from "./session"
import { loginHandler } from "./login"
import { logoutHandler } from "./logout"
import { registerHandler } from "./register"

export const authHandlers = [loginHandler, logoutHandler, registerHandler, authSessionHandler]
