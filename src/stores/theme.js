// src/stores/theme.js
import { defineStore } from 'pinia'

const THEME_KEY = 'app-theme'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light', // 默认亮色
  }),

  actions: {
    // 初始化主题（应用启动时调用一次）
    initTheme() {
      // 1. 优先使用本地存储
      const savedTheme = localStorage.getItem(THEME_KEY)
      if (savedTheme) {
        this.setTheme(savedTheme)
        return
      }

      // 2. 没有本地存储 → 跟随系统主题
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      this.setTheme(prefersDark ? 'dark' : 'light')

      // 监听系统主题变化（仅在未手动选择时生效）
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
          this.setTheme(e.matches ? 'dark' : 'light')
        }
      })
    },

    // 设置主题
    setTheme(mode) {
      if (mode !== 'light' && mode !== 'dark') return
      this.theme = mode
      localStorage.setItem(THEME_KEY, mode)

      const html = document.documentElement
      // 根元素 class 统一为 dark
      if (mode === 'dark') html.classList.add('dark')
      else html.classList.remove('dark')
    },

    // 手动切换主题
    toggleTheme() {
      this.setTheme(this.theme === 'light' ? 'dark' : 'light')
    },
  },
})
