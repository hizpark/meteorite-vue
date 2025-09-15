// src/main.js

// 从 Vue 导入 createApp，用于创建 Vue 应用实例
import { createApp } from 'vue'

// 导入路由实例，用于页面跳转和路由管理
import router from './router'

// 导入 Pinia，用于状态管理
import { createPinia } from 'pinia'

// 引入 Element Plus 基础样式
import 'element-plus/theme-chalk/src/index.scss'

// 导入 Element Plus UI 框架
import ElementPlus from 'element-plus'

// 导入根组件 App.vue，整个应用的顶层组件
import App from './App.vue'

import { useThemeStore } from '@/stores/theme'

// 全局注册图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/styles/global.scss'

// 创建 Vue 应用实例
const app = createApp(App)

// 安装 Pinia 插件，用于全局状态管理
const pinia = createPinia()
// 初始化主题（必须在 app 挂载后调用）
const themeStore = useThemeStore(pinia)
themeStore.initTheme()

// 安装路由插件，使 <router-view /> 能够生效
app.use(router)
app.use(pinia)

// 安装 Element Plus，使所有 Element Plus 组件可用
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 挂载 Vue 应用到 index.html 中的 <div id="app"></div>
app.mount('#app')
