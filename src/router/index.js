/**
 * @file router.js
 * @description Vue Router 配置文件（安全版，无循环重定向，基于 store.isLoggedIn）
 */

import { createRouter, createWebHistory } from 'vue-router'
// import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

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
      const authStore = useAuthStore()
      return authStore.isAuthenticated ? '/admin/dashboard' : '/auth/login'
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
  const authStore = useAuthStore()
  const isAuthPage = to.path.startsWith('/auth')

  // 如果用户未认证且试图访问非登录页面，跳转到登录页面
  if (!isAuthPage && !authStore.isAuthenticated) {
    return next('/auth/login')
  }

  // 如果目标路径是 /login 且用户已认证，跳转到主页
  if (isAuthPage && authStore.isAuthenticated) {
    return next('/admin/dashboard')
  }

  // 允许访问目标页面
  next()
})

export default router
