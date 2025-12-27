import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue({
      template: {
        compilerOptions: {
          // 👇 aqui está o segredo
          isCustomElement: (tag) => tag.startsWith('dfx-') || tag.startsWith('machina-'),
        },
      },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
