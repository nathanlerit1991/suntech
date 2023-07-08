import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  transpileDependencies: [
    '@jsonforms/core',
    '@jsonforms/vue2',
    '@jsonforms/vue2-vanilla',
  ],
})
