import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  base:"./",
  server:{
    proxy: {
      '/api': {
        target: 'https://www.cheongchul-eolam.shop/',
        changeOrigin: true,
        rewrite: path => path.replace('/api', '')
      }
    }
  }
})
