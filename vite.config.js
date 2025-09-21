import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
    ElementPlus({
      useSource: true,
    }),
    viteMockServe({
      mockPath: 'src/mock', // mock 文件目录
      localEnabled: true, // 开发环境开启
      prodEnabled: true, // 生产环境也开启
      watchFiles: true, // 监听文件变化
      supportTs: false, // ts 文件支持
      timeout: 300, // 模拟请求延迟，单位 ms
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000, // 调整 chunk 警告阈值为 1 MB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('element-plus')) return 'vendor-element-plus'
            if (id.includes('echarts')) return 'vendor-echarts'
            return 'vendor'
          }
        },
      },
    },
  },
})
