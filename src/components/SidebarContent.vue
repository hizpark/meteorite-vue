<template>
  <div>
    <!-- Brand -->
    <div class="sidebar-brand">
      <span class="logo-wrap">
        <!-- SVG Logo -->
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
      :collapse="collapsed"
      v-model:default-active="activeMenuLocal"
      :default-openeds="openMenusLocal"
      @select="handleMenuSelect"
      :key="activeMenuLocal"
    >
      <!-- 动态渲染菜单 -->
      <template v-for="item in menuList" :key="item.index">
        <el-menu-item v-if="!item.children" :index="item.path">
          <el-icon v-if="item.icon">
            <component :is="item.icon" />
          </el-icon>
          <template #title
            ><span>{{ item.title }}</span></template
          >
        </el-menu-item>
        <el-sub-menu v-else :index="item.index">
          <template #title>
            <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.index" :index="child.path">
            {{ child.title }}
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  collapsed: Boolean,
  menuList: { type: Array, default: () => [] }, // 支持异步获取菜单
})

const emit = defineEmits(['select'])

const route = useRoute()

const activeMenuLocal = ref('')
const openMenusLocal = ref([])

// 点击菜单
function handleMenuSelect(index) {
  emit('select', index)
}

// 递归查找父菜单展开数组
function findParentKeys(menus, path) {
  for (const menu of menus || []) {
    if (menu.path === path) return []
    if (menu.children) {
      const childResult = findParentKeys(menu.children, path)
      if (childResult) return [menu.index, ...childResult]
    }
  }
  return null
}

// 恢复菜单高亮和展开状态
function restoreMenuStatus() {
  activeMenuLocal.value = route.path
  openMenusLocal.value = findParentKeys(props.menuList, route.path) || []
}

// 初始化
onMounted(() => restoreMenuStatus())

// 路由变化自动更新
watch(
  () => route.path,
  () => restoreMenuStatus(),
)

// 异步菜单加载后也更新
watch(
  () => props.menuList,
  () => restoreMenuStatus(),
)
</script>

<style scoped>
.sidebar-brand {
  height: 40px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  border-bottom: 1px solid var(--el-border-color);
  flex-shrink: 0;
  padding: 0 18px;
  gap: 6px;
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
  display: inline-block;
  position: relative;
  top: 2px;
}

.collapsed .sidebar-brand .brand-text {
  opacity: 0;
}
</style>
