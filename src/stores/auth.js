// src/stores/auth.js
import { defineStore } from 'pinia'
import { login, logout as apiLogout } from '@/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    isAuthenticated: !!localStorage.getItem('token'), // 通过 token 判断用户是否认证
  }),

  actions: {
    // 登录方法
    async login(credentials) {
      try {
        const response = await login(credentials)
        if (response.code === 200) {
          this.token = response.data.token
          this.userInfo = response.data.userInfo
          this.isAuthenticated = true
          localStorage.setItem('token', this.token)
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
          return true
        }
        return false
      } catch (error) {
        console.error('登录失败:', error)
        return false
      }
    },

    // 退出登录方法
    async logout() {
      try {
        // 清理前端状态
        this.token = ''
        this.userInfo = {}
        this.isAuthenticated = false
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')

        // 调用后端的注销接口
        await apiLogout()

        return true
      } catch (error) {
        console.error('注销失败:', error)
        return false
      }
    },
  },
})
