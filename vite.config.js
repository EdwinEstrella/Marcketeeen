import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['facebook-nodejs-business-sdk'],
    include: ['util', 'process', 'buffer', 'stream', 'crypto']
  },
  define: {
    global: 'globalThis',
    'process.env': {},
    'process.version': '"v16.0.0"'
  },
  resolve: {
    alias: {
      util: './src/utils/polyfills.js',
      process: './src/utils/process-polyfill.js',
      buffer: './src/utils/buffer-polyfill.js',
      stream: './src/utils/stream-polyfill.js',
      crypto: './src/utils/crypto-polyfill.js',
      '@': path.resolve(__dirname, './src')
    }
  }
})
