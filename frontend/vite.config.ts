// ============================================================
// ARKZEN — Vite Config (React+Vite stack) v1.4
//
// v1.1: arkzenReadyPlugin — polls for src/arkzen/generated/.arkzen-ready
//   before allowing Vite's buildStart to proceed. This ensures the
//   initial dep scan never reads stale generated pages from a
//   previous session (race condition fix).
// v1.2: arkzenApiPlugin — intercepts /api/arkzen/* in dev server
//   before the proxy can forward it to Laravel. Mirrors the pattern
//   used by Next.js (app/api/) and Astro (src/pages/api/) where the
//   frontend framework owns its own internal API routes.
// v1.3: wasm — fixes rapier2d/rapier3d ESM WASM proposal error.
//   Vite does not support bare .wasm ESM imports natively.
// v1.4: Vite 8 — ESM-only, __dirname removed, import.meta.dirname used
//   throughout. tailwindcss() plugin added (Tailwind v4 via @tailwindcss/vite).
//   vite-plugin-top-level-await removed — Vite 8/Rolldown handles it natively.
// ============================================================
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import wasm from 'vite-plugin-wasm'
import path from 'path'
import fs from 'fs'





export default defineConfig({
  plugins: [
    tailwindcss(),
    wasm(),
    react(),
  ],
  resolve: {
    alias: [
      {
        find: '@/arkzen/core/adapters',
        replacement: path.resolve(import.meta.dirname, './arkzen/core/adapters'),
      },
      {
        find: '@/arkzen/core',
        replacement: path.resolve(import.meta.dirname, './arkzen/core'),
      },
      {
        find: '@',
        replacement: path.resolve(import.meta.dirname, './src'),
      },
    ],
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
      },
      '/storage': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
})
