import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), TanStackRouterVite(), visualizer()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/')
          ) {
            return 'react'
          }
          if (id.includes('tanstack') || id.includes('zod')) {
            return 'tanstack'
          }
          if (id.includes('recharts')) {
            return 'recharts'
          }
          if (id.includes('radix-ui')) {
            return 'radix'
          }
          if (id.includes('react-hook-form')) {
            return 'hookform'
          }
        },
      },
    },
  },
})
