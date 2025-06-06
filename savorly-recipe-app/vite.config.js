import { defineConfig, loadEnv } from 'vite'
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

const baseURL = process.env.VITE_BASE_URL || 'http://localhost:3000';

// https://vite.dev/config/
export default defineConfig({
  //const env = loadEnv(mode, process.cwd(), ''),
  plugins: [react()],
  server: {
    proxy: {
      "/auth": {
        target: baseURL, // backend
        changeOrigin: true,
      },
      "/recipe-details": {
        target: baseURL,
        changeOrigin: true,
      },
      "/create_recipe": {
        target: baseURL,
        changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/my_kitchen/recipes": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      },
    },
  },
});
