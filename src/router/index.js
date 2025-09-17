/**
 * @file router.js
 * @description Vue Router 配置文件（安全版，无循环重定向，基于 store.isLoggedIn）
 */

import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 布局组件
import AuthLayout from '../layouts/AuthLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// 页面组件懒加载
const Login = () => import('../views/UserLogin.vue')
const Dashboard = () => import('../views/AppDashboard.vue')
const UserList = () => import('../views/UserList.vue')
const UserForm = () => import('../views/UserForm.vue')
const ContentList = () => import('../views/ContentList.vue')
const ContentForm = () => import('../views/ContentForm.vue')

// 路由规则
const routes = [
  // 认证相关
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: '', redirect: 'login' },
    ],
  },

  // 后台管理
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', redirect: 'dashboard' },
      { path: 'dashboard', component: Dashboard },
      { path: 'users', component: UserList },
      { path: 'users/new', component: UserForm },
      { path: 'users/:id/edit', component: UserForm, props: true },
      { path: 'contents', component: ContentList },
      { path: 'contents/new', component: ContentForm },
      { path: 'contents/:id/edit', component: ContentForm, props: true },
    ],
  },

  // 全局未匹配 → 根据登录状态跳转
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      const userStore = useUserStore()
      return userStore.isLoggedIn ? '/admin/dashboard' : '/auth/login'
    },
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLoggedIn = userStore.isLoggedIn
  const isAuthPage = to.path.startsWith('/auth')

  // 未登录访问后台 → 登录页
  if (!isAuthPage && !isLoggedIn) {
    return next('/auth/login')
  }

  // 已登录访问登录页 → 仪表盘
  if (isAuthPage && isLoggedIn) {
    return next('/admin/dashboard')
  }

  next()
})

export default router
