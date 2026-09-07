import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  base: "/Healthcare-Medical-dashboard/",

  build: {
    outDir: "docs",
  },

  server: {
    port: 5173,
  },
});