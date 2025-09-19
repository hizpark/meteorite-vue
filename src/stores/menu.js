// src/stores/menuStore.js
import { defineStore } from 'pinia'
import { getMenus as apiGetMenus } from '@/api/menu'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menus: [], // 保存所有的菜单数据
    loading: false, // 加载状态
    error: null, // 错误信息
  }),

  actions: {
    // 获取所有菜单数据
    async fetchMenus() {
      this.loading = true
      this.error = null

      try {
        const response = await apiGetMenus() // 调用你的 API

        // 判断返回的 response 是否成功
        if (response.code === 200) {
          this.menus = response.data
        }

        return response // 返回完整的响应，方便调用者做进一步处理
      } catch (error) {
        console.error('获取菜单失败:', error)
        this.error = '获取菜单失败'
        return { code: 500, message: '获取菜单失败' } // 返回错误信息
      } finally {
        this.loading = false
      }
    },
  },

  getters: {
    // 获取所有菜单的一级菜单列表
    topMenus(state) {
      return state.menus.filter((menu) => !menu.children) // 一级菜单没有 children 字段
    },

    // 获取所有菜单项（包括二级菜单）
    allMenuItems(state) {
      return state.menus.reduce((items, menu) => {
        if (menu.children) {
          items.push(...menu.children)
        }
        return items
      }, [])
    },

    // 获取特定菜单的所有二级菜单项
    getMenuByIndex: (state) => (index) => {
      const menu = state.menus.find((menu) => menu.index === index)
      return menu ? menu.children : []
    },
  },
})
