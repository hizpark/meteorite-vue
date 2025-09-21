import request from '@/utils/request'

// 获取用户列表
export const getUsers = (params = {}) => {
  return request.get('/users', { params })
}

// 获取单个用户信息（需要补充）
export const getUser = (userId) => {
  return request.get(`/users/${userId}`)
}

// 创建用户（需要补充）
export const createUser = (userData) => {
  return request.post('/users', userData)
}

// 更新用户（需要补充）
export const updateUser = (userId, userData) => {
  return request.put(`/users/${userId}`, userData)
}

// 删除用户（需要补充）
export const deleteUser = (userId) => {
  return request.delete(`/users/${userId}`)
}

// 批量删除用户
export const deleteUsers = (userIds) => {
  return request.delete('/users', { data: { userIds } })
}

// 启用/禁用用户
export const toggleUserStatus = (userId, status) => {
  return request.patch(`/users/${userId}/status`, { status })
}
