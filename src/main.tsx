import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@fontsource-variable/inter/wght.css"
import "./index.css"
import { App } from "./app/App/App"

async function enableMocking() {
  const { worker } = await import("./mocks/browser")
  await worker.start({ onUnhandledRequest: "bypass" })
  if (!navigator.serviceWorker.controller) {
    // First registration didn't take control of this document yet - reload once.
    window.location.reload()
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
