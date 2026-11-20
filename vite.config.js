import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()],
    server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',               // your Node backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // /api/logout → /logout (same as nginx)
      },
    },
  },
})
