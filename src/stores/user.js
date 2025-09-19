import { defineStore } from 'pinia'
import {
  getUsers as apiGetUsers,
  getUser as apiGetUserInfo,
  createUser as apiCreateUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    userList: [],
    userInfo: {},
    loading: {
      list: false,
      detail: false,
      create: false,
      update: false,
      delete: false,
    },
    currentPage: 1,
    pageSize: 15,
    totalCount: 0,
    error: null,
    columns: [
      { prop: 'id', label: 'ID', width: 80 },
      { prop: 'username', label: '用户名' },
      { prop: 'email', label: '邮箱' },
      { prop: 'actions', label: '操作', width: 150, slot: 'actions' },
    ],
  }),

  actions: {
    /** 统一处理 API 响应 */
    _handleResponse(response) {
      if (!response) return { code: 500, message: '接口无返回', data: [], total: 0 }

      const { code, message, data } = response
      return {
        code,
        message: message || '',
        data: data?.users || [], // 取 users 数组
        total: data?.total || 0,
      }
    },

    /** 获取用户列表 */
    async getUserList({ page = this.currentPage, limit = this.pageSize, search = '' } = {}) {
      this.loading.list = true
      this.error = null

      try {
        const response = await apiGetUsers({ page, limit, search })
        const result = this._handleResponse(response)

        if (result.code === 200) {
          this.userList = result.data
          this.totalCount = result.total
          this.currentPage = page
          this.pageSize = limit
        } else {
          this.error = result.message || '获取用户列表失败'
        }

        return result
      } catch (error) {
        this.error = error.message || '获取用户列表失败'
        return { code: 500, message: error.message || '获取用户列表失败', data: [], total: 0 }
      } finally {
        this.loading.list = false
      }
    },

    /** 设置分页并刷新列表 */
    setPagination(page, pageSize) {
      this.currentPage = page
      this.pageSize = pageSize
      return this.getUserList({ page, limit: pageSize })
    },

    /** 获取用户详情 */
    async getUserInfo(userId) {
      this.loading.detail = true
      this.error = null

      try {
        const response = await apiGetUserInfo(userId)
        if (response.code === 200) {
          this.userInfo = response.data
        } else {
          this.error = response.message || '获取用户信息失败'
        }
        return { code: response.code, message: response.message || '', data: response.data || {} }
      } catch (error) {
        this.error = error.message || '获取用户信息失败'
        return { code: 500, message: error.message || '获取用户信息失败', data: {} }
      } finally {
        this.loading.detail = false
      }
    },

    /** 创建用户 */
    async createUser(userData) {
      this.loading.create = true
      this.error = null

      try {
        const response = await apiCreateUser(userData)
        if (response.code === 200) {
          // 默认刷新当前页列表
          await this.getUserList({ page: this.currentPage, limit: this.pageSize })
        } else {
          this.error = response.message || '创建用户失败'
        }
        return this._handleResponse(response)
      } catch (error) {
        this.error = error.message || '创建用户失败'
        return { code: 500, message: error.message || '创建用户失败', data: [], total: 0 }
      } finally {
        this.loading.create = false
      }
    },

    /** 更新用户 */
    async updateUser(userId, newUserInfo) {
      this.loading.update = true
      this.error = null

      try {
        const response = await apiUpdateUser(userId, newUserInfo)
        if (response.code === 200) {
          await this.getUserList({ page: this.currentPage, limit: this.pageSize })
        } else {
          this.error = response.message || '更新用户失败'
        }
        return this._handleResponse(response)
      } catch (error) {
        this.error = error.message || '更新用户失败'
        return { code: 500, message: error.message || '更新用户失败', data: [], total: 0 }
      } finally {
        this.loading.update = false
      }
    },

    /** 删除用户 */
    async deleteUser(userId) {
      this.loading.delete = true
      this.error = null

      try {
        const response = await apiDeleteUser(userId)
        if (response.code === 200) {
          await this.getUserList({ page: this.currentPage, limit: this.pageSize })
        } else {
          this.error = response.message || '删除用户失败'
        }
        return this._handleResponse(response)
      } catch (error) {
        this.error = error.message || '删除用户失败'
        return { code: 500, message: error.message || '删除用户失败', data: [], total: 0 }
      } finally {
        this.loading.delete = false
      }
    },

    /** 清除错误信息 */
    clearError() {
      this.error = null
    },

    /** 重置用户信息 */
    resetUserInfo() {
      this.userInfo = {}
    },
  },
})
