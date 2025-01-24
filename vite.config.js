import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {

      '/getLayout': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/save-layout': {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      }
    },
  },
});

