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
      <el-tooltip :content="themeTooltip" placement="bottom">
        <el-button type="text" @click="themeStore.toggleTheme">
          <el-icon>
            <component :is="themeIcon" />
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
            <el-dropdown-item disabled> 欢迎，{{ username }} </el-dropdown-item>
            <el-dropdown-item divided @click="editProfile"> 修改资料 </el-dropdown-item>
            <el-dropdown-item @click="handleLogout"> 退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

// Store
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/user'

// Icons
import { Menu, Fold, Expand, Moon, Sunny, UserFilled } from '@element-plus/icons-vue'

// Props
const { isCollapsed, isMobile } = defineProps({
  isCollapsed: { type: Boolean, default: false },
  isMobile: { type: Boolean, default: false },
})

// Stores
const userStore = useUserStore()
const themeStore = useThemeStore()

// Router
const router = useRouter()

// 用户名显示，默认游客
const username = computed(() => userStore.userInfo.username || '游客')

// 主题图标计算
const themeIcon = computed(() => (themeStore.theme === 'light' ? Moon : Sunny))
const themeTooltip = computed(() => (themeStore.theme === 'light' ? '切换到暗色' : '切换到亮色'))

// 编辑资料
const editProfile = () => {
  router.push('/profile') // 跳转到编辑资料页面
}

// 退出登录
const handleLogout = async () => {
  await userStore.logout()
  router.replace('/auth/login')
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
