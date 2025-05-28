// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://todo-amw-ks-backend.onrender.com' // wszystkie zapytania do /api trafią do Twojego backendu
    }
  }
});