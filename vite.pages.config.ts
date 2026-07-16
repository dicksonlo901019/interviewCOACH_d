import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "github-pages",
  base: "/interviewCOACH_d/",
  publicDir: "../public",
  plugins: [react()],
  build: {
    outDir: "../pages-dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "github-pages/index.html"),
        coach: resolve(import.meta.dirname, "github-pages/coach/index.html"),
      },
    },
  },
});
