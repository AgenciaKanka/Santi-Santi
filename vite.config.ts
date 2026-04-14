import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/** Garante barra final: evita `/santiesanti` + `logo.svg` → `/santiesantilogo.svg` em produção */
function viteBase(): string {
  const raw = (process.env.VITE_BASE_URL || '/').trim();
  if (raw === '' || raw === '/') return '/';
  return raw.endsWith('/') ? raw : `${raw}/`;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: viteBase(),
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
