import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    // @vue-flow/core 内部使用 process.env.NODE_ENV，浏览器环境需显式替换
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      // vue / element-plus 通过框架 importmap 在运行时提供，保证单一 Vue 实例
      external: ['vue', 'element-plus'],
    },
    outDir: '../src/main/resources/frontend',
    emptyOutDir: true,
  },
})
