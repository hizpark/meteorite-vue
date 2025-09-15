<template>
  <!-- PC 侧边栏 -->
  <el-aside
    v-if="!isMobile"
    :width="sidebarWidth"
    :class="{ collapsed: localCollapsed }"
  >
    <el-menu
      :default-active="activeMenu"
      :default-openeds="openMenus"
      @select="handleMenuSelect"
      :collapse="localCollapsed"
    >
      <el-menu-item index="dashboard">仪表盘</el-menu-item>

      <el-sub-menu index="users">
        <template #title>用户管理</template>
        <el-menu-item index="users-list">用户列表</el-menu-item>
        <el-menu-item index="users-new">新增用户</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="contents">
        <template #title>内容管理</template>
        <el-menu-item index="contents-list">内容列表</el-menu-item>
        <el-menu-item index="contents-new">新增内容</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>

  <!-- 移动端 Drawer -->
  <el-drawer
    v-model="localCollapsed"
    direction="ltr"
    size="200px"
    :with-header="false"
    v-if="isMobile"
  >
    <el-menu
      :default-active="activeMenu"
      :default-openeds="openMenus"
      @select="handleMenuSelect"
    >
      <el-menu-item index="dashboard">仪表盘</el-menu-item>

      <el-sub-menu index="users">
        <template #title>用户管理</template>
        <el-menu-item index="users-list">用户列表</el-menu-item>
        <el-menu-item index="users-new">新增用户</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="contents">
        <template #title>内容管理</template>
        <el-menu-item index="contents-list">内容列表</el-menu-item>
        <el-menu-item index="contents-new">新增内容</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-drawer>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'AppSidebar',
  props: {
    modelValue: Boolean, // v-model
    activeMenu: String,
    openMenus: Array,
    isMobile: Boolean,
    sidebarWidth: String,
  },
  emits: ['update:modelValue', 'menuSelect'],
  setup(props, { emit }) {
    const localCollapsed = ref(props.modelValue)

    // 响应 v-model
    watch(() => props.modelValue, (val) => {
      localCollapsed.value = val
    })

    watch(localCollapsed, (val) => {
      emit('update:modelValue', val)
    })

    const handleMenuSelect = (index) => {
      emit('menuSelect', index)
      if (props.isMobile) localCollapsed.value = false
    }

    return {
      localCollapsed,
      handleMenuSelect,
    }
  },
}
</script>

<style scoped>
.el-aside {
  border-right: 1px solid var(--el-border-color);
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  overflow: hidden;
}

.el-aside.collapsed {
  width: 64px !important;
}

.el-menu {
  border-right: none;
  height: 100%;
}
</style>
