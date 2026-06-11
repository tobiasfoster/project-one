import type { Preview } from "@storybook/react-vite"
import { initialize, mswLoader } from "msw-storybook-addon"
import { WithQueryClient } from "../src/test/storybook"
import "../src/index.css"

initialize({ onUnhandledRequest: "bypass" })

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "todo" },
  },
  loaders: [mswLoader],
  decorators: [WithQueryClient],
}

export default preview
