import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000, // Frontend will run on port 8000
    proxy: {
      // Proxy API requests to the backend (replace with your actual backend URL)
      '/api': 'http://localhost:8000', // Backend server URL (adjust if needed)
    },
  },
})
