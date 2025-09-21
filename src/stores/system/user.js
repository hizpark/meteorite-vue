import { defineStore } from 'pinia'
import {
  getUsers as apiGetUsers,
  getUser as apiGetUserInfo,
  createUser as apiCreateUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from '@/api/system/user'

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
    pageSize: 16,
    totalCount: 0,
    error: null,
    appendMode: false, // 新增追加模式状态
    cachedPages: {}, // 缓存已加载页
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
          this.totalCount = result.total
          this.currentPage = page
          this.pageSize = limit

          if (this.appendMode) {
            // 追加模式：缓存当前页，合并所有已缓存页
            this.cachedPages[page] = result.data
            this.userList = Object.keys(this.cachedPages)
              .sort((a, b) => a - b)
              .map((p) => this.cachedPages[p])
              .flat()
          } else {
            // 普通模式：直接替换列表
            this.userList = result.data
            this.cachedPages = { [page]: result.data } // 保留当前页缓存（可选）
          }
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

    /** 切换模式时，刷新数据或清空缓存 */
    async setAppendMode(mode) {
      this.appendMode = mode
      // 清空缓存和列表
      this.cachedPages = {}
      this.userList = []
      this.currentPage = 1
      this.totalCount = 0

      // 加载第一页
      await this.getUserList({ page: 1, limit: this.pageSize })
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
