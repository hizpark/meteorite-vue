/**
 * @file main.js
 * @description Vue 应用入口文件
 *
 * 功能概览：
 * 1. 创建 Vue 应用实例
 * 2. 安装全局插件：
 *    - Pinia：状态管理
 *    - Router：页面路由管理
 *    - Element Plus：UI 组件库
 * 3. 初始化应用主题（深色/浅色）
 * 4. 全局注册 Element Plus 图标
 * 5. 挂载应用到 HTML DOM
 *
 * 流程概览：
 * createApp(App) -> 安装插件 (Pinia -> Router -> Element Plus)
 * -> 初始化主题 -> 注册图标 -> app.mount('#app')
 *
 * 注意事项：
 * - 插件安装顺序很重要
 * - themeStore.initTheme() 必须在 Pinia 安装后执行
 *
 * 作者：Harper
 * 日期：2025-09-16
 */

// Vue 核心 ----------------------------------------------------------------
import { createApp } from 'vue'

// 根组件 ------------------------------------------------------------------
import App from './App.vue'

// 路由 --------------------------------------------------------------------
import router from './router'

// 状态管理 ----------------------------------------------------------------
import { createPinia } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/user'

// UI 库 ------------------------------------------------------------------
import 'element-plus/theme-chalk/src/index.scss'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局样式 ---------------------------------------------------------------
import '@/styles/global.scss'
;(async () => {
  // 创建应用实例
  const app = createApp(App)

  // 安装 Pinia
  const pinia = createPinia()
  app.use(pinia)

  // 初始化主题
  const themeStore = useThemeStore(pinia)
  themeStore.initTheme()

  // 初始化用户状态（从 localStorage / token 恢复）
  const userStore = useUserStore(pinia)
  await userStore.initUser()

  // 安装路由和 Element Plus
  app.use(router)
  app.use(ElementPlus)

  // 全局注册 Element Plus 图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  // 挂载应用
  app.mount('#app')
})()
