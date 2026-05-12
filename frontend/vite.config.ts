import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // <-- Tambahkan ini

export default defineConfig(async () => ({
  plugins: [react()],
  
  // <-- Tambahkan blok resolve ini
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // -------------------------

  // (Jangan ubah bagian bawah ini, biarkan bawaan Tauri)
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
}));
