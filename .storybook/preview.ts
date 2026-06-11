import type { Preview } from "@storybook/react-vite"
import { initialize, mswLoader } from "msw-storybook-addon"
import { withQueryClient } from "../src/test/storybook"
import "@fontsource-variable/inter/wght.css"
import "../src/index.css"

initialize({ onUnhandledRequest: "bypass" })

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "todo" },
  },
  loaders: [mswLoader],
  decorators: [withQueryClient],
}

export default preview
