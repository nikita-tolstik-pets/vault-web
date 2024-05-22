import path from "node:path";

import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";

import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  resolve: {
    alias: {
      modules: path.resolve(__dirname, "src/modules"),
      shared: path.resolve(__dirname, "src/shared"),
    },
  },
  envPrefix: "APP_",
});
