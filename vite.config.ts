import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/RARE-VISUAL-CATALYST-3.5/',
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/gemini-proxy': {
        target: 'http://127.0.0.1:8045',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/gemini-proxy/, ''),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
