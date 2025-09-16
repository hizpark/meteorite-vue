<!--
  @file AppHeader.vue
  @description 管理后台顶栏组件
  功能概览：
  1. 提供左侧折叠按钮（PC 折叠/移动端 Drawer 切换）
  2. 提供右侧工具栏，包括主题切换和用户头像下拉
  3. 使用 Element Plus 按钮、图标、Tooltip 和 Dropdown
  4. 与父组件通过 emit 事件通信（toggle-sidebar, logout）
-->

<template>
  <!-- 顶栏容器 -->
  <el-header class="app-header">
    <!-- 左侧折叠按钮 -->
    <div class="header-left">
      <!-- PC 折叠按钮 -->
      <el-button v-if="!isMobile" @click="$emit('toggle-sidebar')" type="text">
        <el-icon>
          <component :is="isCollapsed ? Expand : Fold" />
        </el-icon>
      </el-button>

      <!-- 移动端 Drawer 按钮 -->
      <el-button v-else @click="$emit('toggle-sidebar')" type="text">
        <el-icon><Menu /></el-icon>
      </el-button>
    </div>

    <!-- 右侧工具栏 -->
    <div class="header-right">
      <!-- 切换主题按钮 -->
      <el-tooltip
        :content="themeStore.theme === 'light' ? '切换到暗色' : '切换到亮色'"
        placement="bottom"
      >
        <el-button type="text" @click="themeStore.toggleTheme">
          <el-icon>
            <component :is="themeStore.theme === 'light' ? Moon : Sunny" />
          </el-icon>
        </el-button>
      </el-tooltip>

      <!-- 用户头像下拉菜单 -->
      <el-dropdown trigger="click">
        <el-button type="text">
          <el-icon><UserFilled /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item disabled> 欢迎，{{ userStore.userInfo?.username }} </el-dropdown-item>
            <el-dropdown-item divided @click="editProfile"> 修改资料 </el-dropdown-item>
            <el-dropdown-item @click="$emit('logout')"> 退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
// 全局状态管理 --------------------------------------------------------
import { useUserStore } from '@/stores'
import { useThemeStore } from '@/stores/theme'

// 图标 ---------------------------------------------------------------
import { Menu, Fold, Expand, Moon, Sunny, UserFilled } from '@element-plus/icons-vue'

// 组件名 -------------------------------------------------------------
defineOptions({ name: 'AppHeader' })

// Props --------------------------------------------------------------
const props = defineProps({
  isCollapsed: { type: Boolean, default: false },
  isMobile: { type: Boolean, default: false },
})

// Store --------------------------------------------------------------
const userStore = useUserStore()
const themeStore = useThemeStore()

// 编辑用户资料处理函数 -------------------------------------------------
const editProfile = () => {
  console.log('编辑用户资料')
  // TODO: 打开编辑资料页面或弹窗
}
</script>

<style scoped>
/* 顶栏样式 -------------------------------------------------------------- */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 40px;
  /* 使用 Element Plus 系统变量，暗/亮模式自动生效 */
  border-bottom: 1px solid var(--el-border-color);
}

/* 左右区域布局 ---------------------------------------------------------- */
.header-left,
.header-right {
  display: flex;
  align-items: center;
}

/* 右侧按钮间距 ---------------------------------------------------------- */
.header-right {
  gap: 12px; /* 按钮/图标间距，可根据需要调整 */
}
</style>
