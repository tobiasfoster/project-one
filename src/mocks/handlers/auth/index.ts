import { authSessionHandler } from "./session"
import { loginHandler } from "./login"
import { logoutHandler } from "./logout"

export const authHandlers = [loginHandler, logoutHandler, authSessionHandler]
