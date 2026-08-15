import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// A relative base keeps every asset URL relative to the current page, which lets
// the exact same build run from a domain root (Vercel / Netlify) or a sub-path
// (GitHub Pages project site) without any configuration.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
