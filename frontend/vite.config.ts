import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:9090',
      // SSE 需关闭响应缓冲，否则浏览器收不到事件
      '/sse': {
        target: 'http://localhost:9090',
        changeOrigin: true,
        ws: false,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            proxyRes.headers['x-accel-buffering'] = 'no'
          })
        },
      },
    },
  },
  build: {
    outDir: '../framework/src/main/resources/static',
    emptyOutDir: true,
    rollupOptions: {
      // 追加 vue / element-plus 专用入口，生成稳定命名的 ES 模块
      // 插件通过 importmap 引用，保证单一 Vue 实例
      preserveEntrySignatures: 'exports-only',
      input: {
        index: resolve(__dirname, 'index.html'),
        vue: resolve(__dirname, 'src/shared-vue.ts'),
        'element-plus': resolve(__dirname, 'src/shared-element-plus.ts'),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === 'vue') return 'assets/vue.js'
          if (chunk.name === 'element-plus') return 'assets/element-plus.js'
          return 'assets/[name]-[hash].js'
        },
        chunkFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
})
