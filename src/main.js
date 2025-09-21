// main.js
// Vue 核心库
import { createApp } from 'vue'

// 路由管理
import router from './router'

// 状态管理（Pinia）
import { createPinia } from 'pinia'

// 应用根组件
import App from './App.vue'

// 样式
import '@/styles/global.scss'
import 'element-plus/theme-chalk/src/index.scss'

// UI 组件库（Element Plus）
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 主题相关 store
import { useThemeStore } from '@/stores/theme'

// 创建应用实例
const app = createApp(App)

// 安装 Pinia
const pinia = createPinia()
app.use(pinia)

// 安装路由
app.use(router)

// 安装 Element Plus
app.use(ElementPlus)

// 初始化主题
const themeStore = useThemeStore(pinia)
themeStore.initTheme()

// 全局注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 挂载应用
app.mount('#app')
