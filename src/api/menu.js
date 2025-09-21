// src/api/menu.js
import request from '@/utils/request'

// 获取所有菜单
export const getMenus = () => {
  return request.get('/menus')
}
