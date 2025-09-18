// src/api/user.js
import apiClient from '@/api/index'

// 获取单个用户的详细信息
export const getUserInfo = (userId) => {
  return apiClient.get(`/users/${userId}`)
}

// 获取用户列表
export const getUserList = (params = {}) => {
  return apiClient.get('/users', { params })
}

// 创建新用户
export const createUser = (userData) => {
  return apiClient.post('/users', userData)
}

// 更新用户信息
export const updateUser = (userId, userData) => {
  return apiClient.put(`/users/${userId}`, userData)
}

// 删除用户
export const deleteUser = (userId) => {
  return apiClient.delete(`/users/${userId}`)
}

// 批量删除用户
export const deleteUsers = (userIds) => {
  return apiClient.delete('/users', { data: { userIds } })
}

// 启用/禁用用户
export const toggleUserStatus = (userId, status) => {
  return apiClient.patch(`/users/${userId}/status`, { status }) // status: 'active' or 'inactive'
}
