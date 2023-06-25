import { defineConfig } from "vite";
import vercel from "vite-plugin-vercel";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vercel()],
});
