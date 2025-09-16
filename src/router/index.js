/**
 * @file router.js
 * @description Vue Router 配置文件
 *
 * 功能概览：
 * 1. 定义应用路由规则及嵌套路由
 * 2. 配置路由布局组件（AuthLayout、AdminLayout）
 * 3. 使用懒加载方式加载页面组件
 * 4. 提供路由守卫示例（可根据需求启用）
 *
 * 流程概览：
 * createRouter() -> 配置 history 模式 -> 定义 routes -> 可选守卫 -> export
 *
 * 作者：Harper
 * 日期：2025-09-16
 */

// Vue Router 核心导入 ------------------------------------------------------
import { createRouter, createWebHistory } from 'vue-router'

// 布局组件导入 -------------------------------------------------------------
import AuthLayout from '../layouts/AuthLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// 页面组件懒加载 -----------------------------------------------------------
const Login = () => import('../views/UserLogin.vue')
const Dashboard = () => import('../views/AppDashboard.vue')
const UserList = () => import('../views/UserList.vue')
const UserForm = () => import('../views/UserForm.vue')
const ContentList = () => import('../views/ContentList.vue')
const ContentForm = () => import('../views/ContentForm.vue')

// 路由规则定义 -------------------------------------------------------------
const routes = [
  { path: '/', redirect: '/login' },

  // 登录路由
  {
    path: '/login',
    component: AuthLayout,
    children: [{ path: '', component: Login }],
  },

  // 管理后台路由
  {
    path: '/dashboard',
    component: AdminLayout,
    children: [
      { path: '', component: Dashboard },
      { path: 'users', component: UserList },
      { path: 'users/new', component: UserForm },
      { path: 'users/:id/edit', component: UserForm, props: true },
      { path: 'contents', component: ContentList },
      { path: 'contents/new', component: ContentForm },
      { path: 'contents/:id/edit', component: ContentForm, props: true },
    ],
  },

  // 捕获所有未匹配路由，重定向到 /dashboard ------------------------------
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
]

// 创建路由实例 ------------------------------------------------------------
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 路由守卫示例（可按需启用） -------------------------------------------
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   if (to.path !== '/login' && !token) return next('/login')
//   if (to.path === '/login' && token) return next('/dashboard')
//   next()
// })

export default router
