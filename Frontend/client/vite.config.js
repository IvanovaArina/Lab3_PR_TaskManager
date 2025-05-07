import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    //https: true, // Включает HTTPS
    proxy: {
      '/api': {
        target: 'http://back:5044', // Обновите порт бэкенда
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});