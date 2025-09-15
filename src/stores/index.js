// src/stores/index.js
import { defineStore } from 'pinia'
import { reactive } from 'vue'

// 用户状态管理
export const useUserStore = defineStore('user', () => {
  const userInfo = reactive({
    username: null,
  })

  const login = ({ username }) => {
    userInfo.username = username
  }

  const logout = () => {
    userInfo.username = null
  }

  return { userInfo, login, logout }
})

// 用户列表 / 内容列表管理
export const useListStore = defineStore('list', () => {
  // mock 用户列表
  const users = reactive([
    { id: 1, username: 'admin', email: 'admin@example.com' },
    { id: 2, username: 'test', email: 'test@example.com' },
  ])

  // mock 内容列表
  const contents = reactive([
    { id: 1, title: '第一篇文章', author: 'admin', status: 'published' },
    { id: 2, title: '第二篇文章', author: 'test', status: 'draft' },
  ])

  return { users, contents }
})
