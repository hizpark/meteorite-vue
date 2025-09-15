<!-- src/components/AppHeader.vue -->
<template>
  <el-header class="app-header">
    <!-- 左侧折叠按钮 -->
    <div class="header-left">
      <el-button v-if="!isMobile" @click="$emit('toggle-sidebar')" type="text">
        <el-icon>
          <component :is="isCollapsed ? Expand : Fold" />
        </el-icon>
      </el-button>

      <el-button v-else @click="$emit('toggle-sidebar')" type="text">
        <el-icon><Menu /></el-icon>
      </el-button>
    </div>

    <!-- 右侧工具栏 -->
    <div class="header-right">
      <!-- 切换主题图标 -->
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

      <!-- 用户头像下拉 -->
      <el-dropdown trigger="click">
        <el-button type="text">
          <el-icon><UserFilled /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item disabled>欢迎，{{ userStore.userInfo?.username }}</el-dropdown-item>
            <el-dropdown-item divided @click="editProfile">修改资料</el-dropdown-item>
            <el-dropdown-item @click="$emit('logout')">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { useUserStore } from '@/stores'
import { useThemeStore } from '@/stores/theme'
import { Menu, Fold, Expand, Moon, Sunny, UserFilled } from '@element-plus/icons-vue'

export default {
  name: 'AppHeader',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const userStore = useUserStore()
    const themeStore = useThemeStore()

    const editProfile = () => {
      console.log('编辑用户资料')
      // TODO: 打开编辑资料页面或弹窗
    }

    return {
      userStore,
      themeStore,
      Menu,
      Fold,
      Expand,
      Moon,
      Sunny,
      UserFilled,
      editProfile,
    }
  },
}
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between; /* 左右对齐 */
  align-items: center;
  padding: 0 20px;
  height: 40px;
  border-bottom: 1px solid var(--el-border-color); /* 使用 Element Plus 系统变量，暗/亮模式自动生效 */
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px; /* 新增：按钮/图标间距，可根据需要调整 */
}
</style>
