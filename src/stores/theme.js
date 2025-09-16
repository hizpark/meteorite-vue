/**
 * @file theme.js
 * @description Pinia 主题状态管理 store
 *
 * 功能概览：
 * 1. 管理全局主题状态（light / dark）
 * 2. 支持初始化主题：优先本地存储 → 系统主题
 * 3. 支持手动切换主题
 * 4. 自动同步到 html 根元素 class，便于全局暗/亮模式切换
 *
 * 流程概览：
 * initTheme() → setTheme(mode) → toggleTheme()
 *
 * 作者：Harper
 * 日期：2025-09-16
 */

// Pinia 导入 ---------------------------------------------------------------
import { defineStore } from 'pinia'

// 本地存储 key -----------------------------------------------------------
const THEME_KEY = 'app-theme'

// 定义 theme store --------------------------------------------------------
export const useThemeStore = defineStore('theme', {
  // state ---------------------------------------------------------------
  state: () => ({
    theme: 'light', // 默认亮色
  }),

  // actions -------------------------------------------------------------
  actions: {
    /**
     * 初始化主题（应用启动时调用）
     * 优先使用本地存储，若无则跟随系统主题
     * 并监听系统主题变化（仅在未手动选择时生效）
     */
    initTheme() {
      // 1. 优先使用本地存储 --------------------------------------------
      const savedTheme = localStorage.getItem(THEME_KEY)
      if (savedTheme) {
        this.setTheme(savedTheme)
        return
      }

      // 2. 跟随系统主题 -------------------------------------------------
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      this.setTheme(prefersDark ? 'dark' : 'light')

      // 3. 监听系统主题变化（未手动选择时生效） --------------------------
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
          this.setTheme(e.matches ? 'dark' : 'light')
        }
      })
    },

    /**
     * 设置主题
     * @param {string} mode - 'light' 或 'dark'
     */
    setTheme(mode) {
      if (mode !== 'light' && mode !== 'dark') return

      // 更新 state
      this.theme = mode

      // 同步本地存储 -----------------------------------------------
      localStorage.setItem(THEME_KEY, mode)

      // 根元素 class 切换 -------------------------------------------
      const html = document.documentElement
      if (mode === 'dark') html.classList.add('dark')
      else html.classList.remove('dark')
    },

    /**
     * 手动切换主题
     */
    toggleTheme() {
      this.setTheme(this.theme === 'light' ? 'dark' : 'light')
    },
  },
})
