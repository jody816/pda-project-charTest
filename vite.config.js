import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  resolve: {
    alias: [
      // 절대경로로 접근하기
      { find: "~/components", replacement: "/src/components" },
      { find: "~/lib", replacement: "/src/lib" },
      { find: "~/routes", replacement: "/src/routes" },
      { find: "~/assets", replacement: "/src/assets" },
      { find: "~/apis", replacement: "/src/lib/apis" },
      { find: "~/store", replacement: "/src/store" },
    ],
  },
});
