import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    open: true,
    port: 3000,
  },
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      exclude: ["**/*.{js,ts}"],
    },
    setupFiles: ["./src/__tests__/utils/vitest.setup.ts"],
    environment: "happy-dom",
  },
});
