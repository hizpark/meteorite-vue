/**
 * @file index.js
 * @description 全局状态管理 store
 *
 * 功能概览：
 * 1. useUserStore：管理用户登录状态
 * 2. useListStore：管理用户列表和内容列表（mock 数据）
 *
 * 使用组合式 API + reactive 响应式数据
 * 所有 store 均通过 Pinia 提供给组件使用
 */

// Pinia 导入 -------------------------------------------------------------
import { defineStore } from 'pinia'
import { reactive } from 'vue'

/* ===========================================================================
 * 用户状态管理 store
 * ===========================================================================
 */
export const useUserStore = defineStore('user', () => {
  // 响应式用户信息对象 -----------------------------------------------
  const userInfo = reactive({
    username: null, // 当前登录用户名，null 表示未登录
  })

  // 登录操作 ---------------------------------------------------------
  const login = ({ username }) => {
    userInfo.username = username
  }

  // 注销操作 ---------------------------------------------------------
  const logout = () => {
    userInfo.username = null
  }

  return { userInfo, login, logout }
})

/* ===========================================================================
 * 列表数据管理 store（用户列表 & 内容列表）
 * ===========================================================================
 */
export const useListStore = defineStore('list', () => {
  // mock 用户列表 -----------------------------------------------------
  const users = reactive([
    { id: 1, username: 'admin', email: 'admin@example.com' },
    { id: 2, username: 'test', email: 'test@example.com' },
  ])

  // mock 内容列表 -----------------------------------------------------
  const contents = reactive([
    { id: 1, title: '第一篇文章', author: 'admin', status: 'published' },
    { id: 2, title: '第二篇文章', author: 'test', status: 'draft' },
  ])

  return { users, contents }
})
