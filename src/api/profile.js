// src/api/profile.js
import apiClient from '@/api/index'

// 获取当前用户资料
export const getProfile = () => {
  return apiClient.get('/user-info') // 获取当前登录用户的资料
}

// 更新当前用户资料
export const updateProfile = (newProfile) => {
  return apiClient.post('/user-info', newProfile) // 更新当前用户资料
}
