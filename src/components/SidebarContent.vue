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
      <template v-for="item in menus" :key="item.index">
        <el-menu-item v-if="!item.children" :index="item.path">
          <Icon v-if="item.icon" :icon="item.icon" class="menu-icon" />
          <template #title
            ><span>{{ item.title }}</span></template
          >
        </el-menu-item>
        <el-sub-menu v-else :index="item.index">
          <template #title>
            <Icon v-if="item.icon" :icon="item.icon" class="menu-icon" />
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

import { Icon } from '@iconify/vue'

const props = defineProps({
  collapsed: Boolean,
  menus: { type: Array, default: () => [] },
})

const emit = defineEmits(['select'])
const route = useRoute()
const activeMenuLocal = ref('')
const openMenusLocal = ref([])

function handleMenuSelect(index) {
  emit('select', index)
}

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

function restoreMenuStatus() {
  activeMenuLocal.value = route.path
  openMenusLocal.value = findParentKeys(props.menuList, route.path) || []
}

onMounted(() => restoreMenuStatus())

watch(
  () => route.path,
  () => restoreMenuStatus(),
)
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

.el-menu {
  border-right: none;
}

.el-menu-item span,
.el-sub-menu__title span {
  box-sizing: border-box;
  line-height: 18px;
  display: inline-flex;
  align-items: center;
  padding-top: 1px;
  margin-left: 10px;
}

.el-sub-menu__title span {
  padding-top: 2px;
}

.menu-icon {
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
