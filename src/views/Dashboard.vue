<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :md="8">
      <el-card shadow="hover" class="dashboard-card no-border">
        <h3>用户数</h3>
        <p class="count">{{ userCount }}</p>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="12" :md="8">
      <el-card shadow="hover" class="dashboard-card no-border">
        <h3>内容数</h3>
        <p class="count">{{ contentCount }}</p>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="12" :md="8">
      <el-card shadow="hover" class="dashboard-card no-border">
        <h3>欢迎信息</h3>
        <p>欢迎回来，{{ userStore.userInfo?.username }}！</p>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { ref } from 'vue'
import { useUserStore } from '../stores'

export default {
  name: 'AppDashboard',
  setup() {
    const userStore = useUserStore()
    const userCount = ref(123)
    const contentCount = ref(45)

    return { userStore, userCount, contentCount }
  },
}
</script>

<style scoped>
.count {
  font-size: 24px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}

.dashboard-card {
  background-color: var(--el-bg-color-overlay) !important; /* 使用系统主题背景 */
  color: var(--el-text-color-primary);
  transition:
    background-color 0.3s,
    color 0.3s;
}

.no-border {
  border: none !important; /* 去掉卡片边框 */
  box-shadow: var(--el-box-shadow-light); /* 轻微阴影替代边框，暗/亮模式自动适配 */
}

/* 响应式垂直间距 */
@media (max-width: 992px) {
  .dashboard-card {
    margin-bottom: 16px;
  }
}
</style>
