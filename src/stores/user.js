import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue'
import { loginApi, getUserInfoApi, logoutApi, getUserListApi } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = reactive({ username: null })

  // token 状态
  const token = ref(localStorage.getItem('token') || null)

  // 用户列表
  const userList = ref([])
  const loadingUserList = ref(false)

  // 登录状态 getter
  const isLoggedIn = computed(() => !!token.value)

  // 登录方法
  const login = async ({ username, password }) => {
    const res = await loginApi({ username, password })
    if (!res.success) return false

    token.value = res.token
    localStorage.setItem('token', res.token)
    userInfo.username = res.username
    return true
  }

  // 登出方法
  const logout = async () => {
    if (!token.value) return

    try {
      await logoutApi(token.value)
    } catch (err) {
      console.error('登出请求失败:', err)
    } finally {
      token.value = null
      userInfo.username = null
      localStorage.removeItem('token')
    }
  }

  // 初始化用户信息
  const initUser = async () => {
    if (!token.value) return
    try {
      const res = await getUserInfoApi(token.value)
      if (res.success) {
        userInfo.username = res.username
      } else {
        await logout() // token 失效，自动登出
      }
    } catch (err) {
      console.error('初始化用户信息失败', err)
      await logout()
    }
  }

  // 获取用户列表
  const getUserList = async () => {
    loadingUserList.value = true
    try {
      const res = await getUserListApi()
      if (res.success) userList.value = res.list
      else userList.value = []
    } catch (err) {
      console.error('获取用户列表出错:', err)
      userList.value = []
    } finally {
      loadingUserList.value = false
    }
  }

  return {
    userInfo,
    token,
    isLoggedIn,
    login,
    logout,
    initUser,
    userList,
    loadingUserList,
    getUserList,
  }
})
