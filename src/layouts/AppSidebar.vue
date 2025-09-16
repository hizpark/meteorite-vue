<!--
  @file AppSidebar.vue
  @description 后台侧边栏组件
  功能概览：
  1. 提供 PC 侧边栏和移动端 Drawer 两种显示模式
  2. 支持菜单折叠与展开，响应父组件传递状态
  3. 提供菜单选择事件，通过 emit 通知父组件
  4. 使用 Element Plus Menu 和 Icon 渲染菜单项
-->

<template>
  <!-- PC 侧边栏 -->
  <el-aside v-if="!isMobile" :width="sidebarWidth" :class="{ collapsed: collapsed }">
    <!-- Brand -->
    <div class="sidebar-brand">
      <span class="logo-wrap">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64px"
          height="64px"
          viewBox="0 0 256 256"
          style="fill: currentColor; stroke: currentColor"
          class="brand-logo"
        >
          <path
            fill-rule="evenodd"
            d="m379.495 134.862 294.99-103.144-39.236 172.365-177.318-2.426Zm322.888-78.946 154.521 279.642-3.031 190.178-188.327-308.02 36.836-161.8Zm146.894 524.226L602.29 757.387 417.226 638.962l48.98-404.776 172.894 2.3L849.283 580.15zm-457.787.154L279.06 336.925l153.154-93.406-40.724 336.78zm-90.02-294.913 51.61-130.304 67.61 57.528-119.226 72.77z"
            style="stroke-width: 1.46557"
            transform="matrix(.35278 0 0 .35278 -72.372 -11.19)"
          />
        </svg>
      </span>
      <span class="brand-text">Meteorite</span>
    </div>

    <!-- 菜单 -->
    <el-menu
      :default-active="activeMenu"
      :default-openeds="openMenus"
      @select="handleMenuSelect"
      :collapse="collapsed"
    >
      <el-menu-item index="dashboard">
        <el-icon><HomeFilled /></el-icon>
        <template #title>
          <span>仪表盘</span>
        </template>
      </el-menu-item>

      <el-sub-menu index="users">
        <template #title>
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="users-list">用户列表</el-menu-item>
        <el-menu-item index="users-new">新增用户</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="contents">
        <template #title>
          <el-icon><Document /></el-icon>
          <span>内容管理</span>
        </template>
        <el-menu-item index="contents-list">内容列表</el-menu-item>
        <el-menu-item index="contents-new">新增内容</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>

  <!-- 移动端 Drawer -->
  <el-drawer
    v-if="isMobile"
    v-model="drawerVisibleLocal"
    direction="ltr"
    size="200px"
    :with-header="false"
  >
    <div class="sidebar-brand">
      <span class="logo-wrap">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64px"
          height="64px"
          viewBox="0 0 256 256"
          style="fill: currentColor; stroke: currentColor"
          class="brand-logo"
        >
          <path
            fill-rule="evenodd"
            d="m379.495 134.862 294.99-103.144-39.236 172.365-177.318-2.426Zm322.888-78.946 154.521 279.642-3.031 190.178-188.327-308.02 36.836-161.8Zm146.894 524.226L602.29 757.387 417.226 638.962l48.98-404.776 172.894 2.3L849.283 580.15zm-457.787.154L279.06 336.925l153.154-93.406-40.724 336.78zm-90.02-294.913 51.61-130.304 67.61 57.528-119.226 72.77z"
            style="stroke-width: 1.46557"
            transform="matrix(.35278 0 0 .35278 -72.372 -11.19)"
          />
        </svg>
      </span>
      <span class="brand-text">Meteorite</span>
    </div>

    <el-menu :default-active="activeMenu" :default-openeds="openMenus" @select="handleMenuSelect">
      <el-menu-item index="dashboard">
        <el-icon><HomeFilled /></el-icon>
        <template #title>
          <span>仪表盘</span>
        </template>
      </el-menu-item>

      <el-sub-menu index="users">
        <template #title>
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="users-list">用户列表</el-menu-item>
        <el-menu-item index="users-new">新增用户</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="contents">
        <template #title>
          <el-icon><Document /></el-icon>
          <span>内容管理</span>
        </template>
        <el-menu-item index="contents-list">内容列表</el-menu-item>
        <el-menu-item index="contents-new">新增内容</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-drawer>
</template>

<script>
import { ref, watch } from 'vue'
import logo from '@/assets/images/logo.svg'
import { HomeFilled, User, Document } from '@element-plus/icons-vue'

export default {
  // 组件名称 ---------------------------------------------------------------
  name: 'AppSidebar',

  // props ---------------------------------------------------------------
  props: {
    collapsed: Boolean, // PC 折叠状态
    drawerVisible: Boolean, // 移动端 Drawer 可见状态
    activeMenu: String, // 当前激活菜单
    openMenus: Array, // 当前展开菜单
    isMobile: Boolean, // 是否移动端
    sidebarWidth: String, // 侧边栏宽度
  },

  // 事件 ---------------------------------------------------------------
  emits: ['menuSelect', 'update:drawerVisible'],

  // 注册子组件 -----------------------------------------------------------
  components: { HomeFilled, User, Document },

  // 组合式 API -----------------------------------------------------------
  setup(props, { emit }) {
    // 内部响应式变量，避免直接修改 prop -----------------------------------
    const drawerVisibleLocal = ref(props.drawerVisible)

    // 同步 prop 与本地变量 -----------------------------------------------
    watch(
      () => props.drawerVisible,
      (val) => (drawerVisibleLocal.value = val),
    )
    watch(drawerVisibleLocal, (val) => emit('update:drawerVisible', val))

    // 菜单选择事件 --------------------------------------------------------
    const handleMenuSelect = (index) => {
      emit('menuSelect', index)
    }

    // Logo 引用 ------------------------------------------------------------
    const logoRef = ref(logo)

    return {
      logo: logoRef,
      drawerVisibleLocal,
      handleMenuSelect,
    }
  },
}
</script>

<style scoped>
/* Brand 样式 */
.sidebar-brand {
  height: 40px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  border-bottom: 1px solid var(--el-border-color);
  flex-shrink: 0;
  padding: 0 18px;
  gap: 8px;
  transition: all 0.3s;
}

.logo-wrap {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.brand-logo {
  height: 24px;
  width: 24px;
  object-fit: contain;
  display: block;
}

.sidebar-brand .brand-text {
  opacity: 1;
  transition: all 0.3s;
  font-size: 24px;
}

.collapsed .sidebar-brand .brand-text {
  opacity: 0;
}
</style>
