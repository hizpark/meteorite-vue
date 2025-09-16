<!-- Dashboard.vue
     仪表盘页面组件

     功能：
     1. 展示用户数、内容数统计
     2. 欢迎用户信息
-->

<template>
  <el-row :gutter="20">
    <!-- 用户数卡片 -->
    <el-col :xs="24" :sm="12" :md="8">
      <el-card shadow="hover" class="dashboard-card no-border">
        <h3>用户数</h3>
        <p class="count">{{ userCount }}</p>
      </el-card>
    </el-col>

    <!-- 内容数卡片 -->
    <el-col :xs="24" :sm="12" :md="8">
      <el-card shadow="hover" class="dashboard-card no-border">
        <h3>内容数</h3>
        <p class="count">{{ contentCount }}</p>
      </el-card>
    </el-col>

    <!-- 欢迎信息卡片 -->
    <el-col :xs="24" :sm="12" :md="8">
      <el-card shadow="hover" class="dashboard-card no-border">
        <h3>欢迎信息</h3>
        <p>欢迎回来，{{ userStore.userInfo?.username }}！</p>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

// 用户数据 store --------------------------------------------------
const userStore = useUserStore()

// 仪表盘数据 ------------------------------------------------------
const userCount = ref(123)
const contentCount = ref(45)
</script>

<style scoped>
/* 数字统计样式 */
.count {
  font-size: 24px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}

/* 仪表盘卡片基础样式 -------------------------------------------- */
.dashboard-card {
  background-color: var(--el-bg-color-overlay) !important; /* 系统主题背景 */
  color: var(--el-text-color-primary);
  transition:
    background-color 0.3s,
    color 0.3s;
}

/* 响应式垂直间距 ----------------------------------------------- */
@media (max-width: 992px) {
  .dashboard-card {
    margin-bottom: 16px;
  }
}
</style>
