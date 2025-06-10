import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  server: {
    port: 3000,
    allowedHosts: true,
  },
  build: {
    minify: false,
  },
  test: {
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/index.ts", "src/bootstrap/bootstrap.ts"],
    },
  },
});
