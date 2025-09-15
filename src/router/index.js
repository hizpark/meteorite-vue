import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../layouts/AuthLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

const Login = () => import('../views/Login.vue')
const Dashboard = () => import('../views/Dashboard.vue')
const UserList = () => import('../views/UserList.vue')
const UserForm = () => import('../views/UserForm.vue')
const ContentList = () => import('../views/ContentList.vue')
const ContentForm = () => import('../views/ContentForm.vue')

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: AuthLayout,
    children: [{ path: '', component: Login }],
  },
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
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 路由守卫示例
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   if (to.path !== '/login' && !token) return next('/login')
//   if (to.path === '/login' && token) return next('/dashboard')
//   next()
// })

export default router
