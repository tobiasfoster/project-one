/// <reference types="vitest/config" />
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type PluginOption } from "vite"
import { analyzer } from "vite-bundle-analyzer"

export default defineConfig(() => {
  const plugins: PluginOption[] = [react(), tailwindcss(), analyzer({
    analyzerMode: "json",
  })]

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return

            // Keep MSW in its own chunk so it stays behind the lazy
            // import() in main.tsx and is only fetched when mocks are enabled.
            if (id.includes("/msw/") || id.includes("@mswjs")) return "msw"

            // Group the large, eagerly-loaded vendors into stable chunks for
            // better long-term browser caching. Everything else is left to
            // the bundler's default chunking so lazy boundaries are preserved.
            if (id.includes("react-dom") || /[\\/]react[\\/]/.test(id)) {
              return "react-vendor"
            }
            if (id.includes("@tanstack")) return "tanstack"
            if (id.includes("framer-motion")) return "motion"
          },
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],
    },
  }
})
