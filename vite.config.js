import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [
    react({
      babel: {
        babelrc: true, // Habilita a leitura do .babelrc
        configFile: true, // Habilita a leitura do babel.config.js
      }
    })
  ],
  build: {
    rollupOptions: {
      external: ['@tanstack/react-query'] 
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    mode: 'development'
  }
})
