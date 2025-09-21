<template>
  <el-container style="height: 100vh">
    <!-- 侧边栏/Drawer -->
    <AppSidebar
      :collapsed="isCollapsed"
      v-model:drawer-visible="drawerVisible"
      :isMobile="isMobile"
      :sidebarWidth="sidebarWidth"
      :menus="menuStore.menus"
    />

    <!-- 主内容 -->
    <el-container style="flex-direction: column; height: 100vh">
      <AppHeader :isCollapsed="isCollapsed" :isMobile="isMobile" @toggle-sidebar="toggleSidebar" />
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { useMenuStore } from '@/stores/menu'

const sidebarWidth = '200px'
const isCollapsed = ref(false)
const drawerVisible = ref(false)
const isMobile = ref(false)

// -------------------- 菜单数据 --------------------
const menuStore = useMenuStore()

// 异步获取菜单
onMounted(async () => {
  await menuStore.fetchMenus()
})

// -------------------- 窗口尺寸处理 --------------------
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

// -------------------- 切换侧边栏 --------------------
const toggleSidebar = () => {
  if (isMobile.value) drawerVisible.value = !drawerVisible.value
  else isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
