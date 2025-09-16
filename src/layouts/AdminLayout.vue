<!--
  @file AdminLayout.vue
  @description 管理后台主布局组件
  功能概览：
  1. 提供后台布局，包括侧边栏和主内容区域
  2. 支持响应式布局，PC 折叠与移动端 Drawer
  3. 使用 <router-view /> 渲染子路由页面
  4. 管理菜单选中状态和打开状态
-->

<template>
  <!-- 后台布局容器 -->
  <el-container style="height: 100vh">
    <!-- 侧边栏 -->
    <AppSidebar
      :collapsed="isCollapsed"
      v-model:drawer-visible="drawerVisible"
      :activeMenu="activeMenu"
      :openMenus="openMenus"
      :isMobile="isMobile"
      :sidebarWidth="sidebarWidth"
      @menuSelect="handleMenuSelect"
    />

    <!-- 主内容 -->
    <el-container style="flex-direction: column; height: 100vh">
      <!-- 顶部导航 -->
      <AppHeader :isCollapsed="isCollapsed" :isMobile="isMobile" @toggle-sidebar="toggleSidebar" />

      <!-- 页面内容 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
// Vue 依赖 ------------------------------------------------------------
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 子组件 ---------------------------------------------------------------
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'

// 组件名 ---------------------------------------------------------------
defineOptions({ name: 'AdminLayout' })

// 路由实例 -------------------------------------------------------------
const router = useRouter()
const route = useRoute()

// 菜单状态 -------------------------------------------------------------
const activeMenu = ref('dashboard')
const openMenus = ref([])

// 侧边栏状态 -----------------------------------------------------------
const sidebarWidth = '200px'
const isCollapsed = ref(false) // PC 折叠
const drawerVisible = ref(false) // 移动端 Drawer
const isMobile = ref(false) // 是否移动端

// 窗口大小变化处理 -----------------------------------------------------
const handleResize = () => {
  isMobile.value = window.innerWidth < 768
  if (!isMobile.value) drawerVisible.value = false
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

// 切换侧边栏折叠/Drawer 显示 -------------------------------------------
const toggleSidebar = () => {
  if (isMobile.value) drawerVisible.value = !drawerVisible.value
  else isCollapsed.value = !isCollapsed.value
}

// 菜单映射表 -----------------------------------------------------------
const menuMap = {
  '/dashboard': { active: 'dashboard', open: [] },
  '/dashboard/users': { active: 'users-list', open: ['users'] },
  '/dashboard/users/new': { active: 'users-new', open: ['users'] },
  '/dashboard/contents': { active: 'contents-list', open: ['contents'] },
  '/dashboard/contents/new': { active: 'contents-new', open: ['contents'] },
}

// 更新菜单选中与展开状态 -----------------------------------------------
const updateMenu = () => {
  const path = route.path
  const matched = Object.keys(menuMap).find((key) => path.startsWith(key))
  if (matched) {
    activeMenu.value = menuMap[matched].active
    openMenus.value = menuMap[matched].open
  }
}

updateMenu()
watch(() => route.path, updateMenu)

// 菜单选择处理 ---------------------------------------------------------
const handleMenuSelect = (index) => {
  const path = Object.keys(menuMap).find((key) => menuMap[key].active === index)
  if (path) router.push(path)
  if (isMobile.value) drawerVisible.value = false
}
</script>
