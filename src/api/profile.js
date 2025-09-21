import request from '@/utils/request'

// 获取当前用户资料
export const getProfile = () => {
  return request.get('/user-info') // 获取当前登录用户的资料
}

// 更新当前用户资料
export const updateProfile = (newProfile) => {
  return request.post('/user-info', newProfile) // 更新当前用户资料
}
