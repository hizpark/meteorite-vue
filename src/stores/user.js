// src/stores/user.js
import { defineStore } from 'pinia'
import {
  getUserList as apiGetUserList,
  getUserInfo as apiGetUserInfo,
  createUser as apiCreateUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
  deleteUsers as apiDeleteUsers,
  toggleUserStatus as apiToggleUserStatus,
} from '@/api/user'

export const useUser = defineStore('user', {
  state: () => ({
    userList: [], // 存储用户列表
    userInfo: {}, // 存储单个用户信息
  }),

  actions: {
    // 获取用户列表（适用于管理员操作）
    async getUserList(params = {}) {
      try {
        const response = await apiGetUserList(params)
        if (response.code === 200) {
          this.userList = response.data
        }
        return response
      } catch (error) {
        console.error('获取用户列表失败:', error)
        return { code: 500, message: '获取用户列表失败' }
      }
    },

    // 获取单个用户信息
    async getUserInfo(userId) {
      try {
        const response = await apiGetUserInfo(userId)
        if (response.code === 200) {
          this.userInfo = response.data
        }
        return response
      } catch (error) {
        console.error('获取用户信息失败:', error)
        return { code: 500, message: '获取用户信息失败' }
      }
    },

    // 创建新用户
    async createUser(userData) {
      try {
        const response = await apiCreateUser(userData)
        if (response.code === 200) {
          // 创建成功后刷新用户列表
          await this.getUserList()
        }
        return response
      } catch (error) {
        console.error('创建用户失败:', error)
        return { code: 500, message: '创建用户失败' }
      }
    },

    // 更新用户信息
    async updateUser(userId, newUserInfo) {
      try {
        const response = await apiUpdateUser(userId, newUserInfo)
        if (response.code === 200) {
          // 更新成功后刷新用户列表
          await this.getUserList()
        }
        return response
      } catch (error) {
        console.error('更新用户资料失败:', error)
        return { code: 500, message: '更新用户资料失败' }
      }
    },

    // 删除用户
    async deleteUser(userId) {
      try {
        const response = await apiDeleteUser(userId)
        if (response.code === 200) {
          // 删除成功后刷新用户列表
          await this.getUserList()
        }
        return response
      } catch (error) {
        console.error('删除用户失败:', error)
        return { code: 500, message: '删除用户失败' }
      }
    },

    // 批量删除用户
    async deleteUsers(userIds) {
      try {
        const response = await apiDeleteUsers(userIds)
        if (response.code === 200) {
          // 批量删除成功后刷新用户列表
          await this.getUserList()
        }
        return response
      } catch (error) {
        console.error('批量删除用户失败:', error)
        return { code: 500, message: '批量删除用户失败' }
      }
    },

    // 启用/禁用用户
    async toggleUserStatus(userId, status) {
      try {
        const response = await apiToggleUserStatus(userId, status)
        if (response.code === 200) {
          // 状态更新成功后刷新用户列表
          await this.getUserList()
        }
        return response
      } catch (error) {
        console.error('修改用户状态失败:', error)
        return { code: 500, message: '修改用户状态失败' }
      }
    },
  },
})
