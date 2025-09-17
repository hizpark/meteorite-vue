<template>
  <!-- PC 侧边栏 -->
  <el-aside v-if="!isMobile" :width="sidebarWidth" :class="{ collapsed }">
    <SidebarContent :collapsed="collapsed" :menuList="menuList" @select="handleMenuSelect" />
  </el-aside>

  <!-- 移动端 Drawer -->
  <el-drawer v-else v-model="drawerVisibleLocal" direction="ltr" size="208px" :with-header="false">
    <SidebarContent :collapsed="collapsed" :menuList="menuList" @select="handleMenuSelect" />
  </el-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import SidebarContent from '@/components/SidebarContent.vue'

const props = defineProps({
  collapsed: Boolean,
  drawerVisible: Boolean,
  isMobile: Boolean,
  sidebarWidth: String,
  menuList: Array,
})

const emit = defineEmits(['update:drawerVisible'])
const router = useRouter()

const drawerVisibleLocal = ref(props.drawerVisible)

watch(
  () => props.drawerVisible,
  (val) => (drawerVisibleLocal.value = val),
)
watch(drawerVisibleLocal, (val) => emit('update:drawerVisible', val))

function handleMenuSelect(index) {
  if (index) router.push(index)
  if (props.isMobile) drawerVisibleLocal.value = false
}
</script>
