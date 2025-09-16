import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { loginApi, getUserInfoApi, logoutApi, getUserListApi } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive({ username: null })

  // 新增用户列表状态
  const userList = ref([])
  const loadingUserList = ref(false)

  const login = async ({ username, password }) => {
    const res = await loginApi({ username, password })
    if (!res.success) return false

    localStorage.setItem('token', res.token)
    userInfo.username = res.username
    return true
  }

  const logout = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      await logoutApi(token) // 等待后端登出完成
    } catch (err) {
      console.error('登出请求失败:', err)
      // 即使失败，也继续清理前端状态
    } finally {
      localStorage.removeItem('token')
      userInfo.username = null
    }
  }

  const initUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    const res = await getUserInfoApi(token)
    if (res.success) userInfo.username = res.username
    else logout()
  }

  // 新增：获取用户列表方法
  const getUserList = async () => {
    loadingUserList.value = true
    try {
      const res = await getUserListApi()
      if (res.success) {
        userList.value = res.list
      } else {
        userList.value = []
        console.error('获取用户列表失败')
      }
    } catch (err) {
      console.error('获取用户列表出错:', err)
      userList.value = []
    } finally {
      loadingUserList.value = false
    }
  }

  return { userInfo, login, logout, initUser, userList, loadingUserList, getUserList }
})
