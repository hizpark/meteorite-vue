<template>
  <el-container :class="themeStore.theme" style="height: 100vh">
    <!-- 侧边栏 -->
    <AppSidebar
      v-model="isCollapsed"
      :activeMenu="activeMenu"
      :openMenus="openMenus"
      :isMobile="isMobile"
      :sidebarWidth="sidebarWidth"
      @menuSelect="handleMenuSelect"
    />

    <!-- 主内容 -->
    <el-container style="flex-direction: column; height: 100vh">
      <AppHeader
        :isCollapsed="isCollapsed"
        :isMobile="isMobile"
        @toggle-sidebar="toggleSidebar"
        @logout="logout"
      />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores'
import { useThemeStore } from '../stores/theme'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'

export default {
  name: 'AdminLayout',
  components: { AppSidebar, AppHeader },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const userStore = useUserStore()
    const themeStore = useThemeStore()

    const activeMenu = ref('dashboard')
    const openMenus = ref([])

    const sidebarWidth = '200px'
    const isCollapsed = ref(false)
    const isMobile = ref(false)

    const handleResize = () => {
      isMobile.value = window.innerWidth < 768
      if (isMobile.value) isCollapsed.value = false
    }

    onMounted(() => {
      window.addEventListener('resize', handleResize)
      handleResize()
    })

    onBeforeUnmount(() => window.removeEventListener('resize', handleResize))

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value
    }

    const menuMap = {
      '/dashboard': { active: 'dashboard', open: [] },
      '/dashboard/users': { active: 'users-list', open: ['users'] },
      '/dashboard/users/new': { active: 'users-new', open: ['users'] },
      '/dashboard/contents': { active: 'contents-list', open: ['contents'] },
      '/dashboard/contents/new': { active: 'contents-new', open: ['contents'] },
    }

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

    const handleMenuSelect = (index) => {
      const path = Object.keys(menuMap).find((key) => menuMap[key].active === index)
      if (path) router.push(path)
      if (isMobile.value) isCollapsed.value = false
    }

    const logout = () => {
      userStore.logout()
      router.push('/login')
    }

    return {
      userStore,
      themeStore,
      activeMenu,
      openMenus,
      handleMenuSelect,
      logout,
      sidebarWidth,
      isCollapsed,
      toggleSidebar,
      isMobile,
    }
  },
}
</script>
