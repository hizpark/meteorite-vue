// src/api/menu.js
import apiClient from '@/api/index'

// 获取所有菜单
export const getMenus = () => {
  return apiClient.get('/menus')
}
