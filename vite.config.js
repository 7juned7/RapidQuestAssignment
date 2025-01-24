import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {

      '/getLayout': {
        target: 'https://rapidquestassignment.onrender.com/',
        changeOrigin: true,
        secure: false,
      },
      '/save-layout': {
        target: "https://rapidquestassignment.onrender.com/",
        changeOrigin: true,
        secure: false,
      }
    },
  },
});

