// src/stores/profile.js
import { defineStore } from 'pinia'
import { getProfile as apiGetProfile, updateProfile as apiUpdateProfile } from '@/api/profile'

export const useProfile = defineStore('profile', {
  state: () => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}, // 初始化从 localStorage 获取
  }),

  actions: {
    // 获取当前用户资料
    async getUserInfo() {
      try {
        const response = await apiGetProfile()
        if (response.code === 200) {
          // 成功获取用户资料后，更新 state 和 localStorage
          this.userInfo = response.data
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        } else {
          console.error('获取当前用户资料失败:', response.message)
        }
        return response
      } catch (error) {
        console.error('获取当前用户信息失败:', error)
        return { code: 500, message: '获取当前用户信息失败' }
      }
    },

    // 更新当前用户资料
    async updateProfile(newUserInfo) {
      try {
        const response = await apiUpdateProfile(newUserInfo)
        if (response.code === 200) {
          // 成功更新资料，更新 state 和 localStorage
          this.userInfo = { ...this.userInfo, ...newUserInfo }
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        } else {
          console.error('更新当前用户信息失败:', response.message)
        }
        return response
      } catch (error) {
        console.error('更新当前用户信息失败:', error)
        return { code: 500, message: '更新当前用户信息失败' }
      }
    },
  },
})
