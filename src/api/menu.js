import menus from '@/mocks/menus.json'

export const getMenuListApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        resolve({ success: true, list: menus })
      } catch {
        resolve({ success: false, list: [] })
      }
    }, 1000) // 模拟 1 秒网络延迟
  })
}
