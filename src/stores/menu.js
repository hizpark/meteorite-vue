import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMenuListApi } from '@/api/menu.js'

export const useMenuStore = defineStore('menu', () => {
  const menuList = ref([])

  // 获取菜单数据
  async function getMenuList() {
    const res = await getMenuListApi()
    if (res.success) {
      menuList.value = res.list
    } else {
      menuList.value = []
    }
    return menuList.value
  }

  return { menuList, getMenuList }
})
