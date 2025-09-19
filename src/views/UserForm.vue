```vue
<!-- UserForm.vue
     用户表单页组件（新增 / 编辑用户）
     功能：
     1. 支持新增用户和编辑已有用户
     2. 用户名和邮箱输入
     3. 模拟提交表单
     4. 编辑模式下预填充用户数据
-->

<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator="/">
    <!-- 可点击返回首页 -->
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>

    <!-- 可点击返回用户管理列表 -->
    <el-breadcrumb-item :to="{ path: '/admin/users' }">用户管理</el-breadcrumb-item>

    <!-- 当前操作，非链接 -->
    <el-breadcrumb-item>{{ isEdit ? '编辑用户' : '新增用户' }}</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 表单卡片 -->
  <el-card class="user-form-card no-border">
    <!-- 用户表单 -->
    <el-form :model="form" @keyup.enter="submit" label-width="80px" class="user-form">
      <!-- 用户名输入框 -->
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>

      <!-- 邮箱输入框 -->
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 判断是否编辑模式
const isEdit = computed(() => !!route.params.id)

// 表单数据对象
const form = reactive({
  username: '',
  email: '',
})

// 初始化表单
onMounted(async () => {
  if (isEdit.value) {
    const { data } = await userStore.getUserInfo(route.params.id)
    form.username = data.username || ''
    form.email = data.email || ''
  }
})

// 提交方法
const submit = async () => {
  if (!form.username.trim() || !form.email.trim()) {
    return ElMessage.warning('用户名和邮箱不能为空')
  }

  if (isEdit.value) {
    // 编辑模式
    const response = await userStore.updateUser(route.params.id, {
      username: form.username.trim(),
      email: form.email.trim(),
    })
    if (response.code === 200) {
      ElMessage.success('更新成功')
      router.push('/admin/users')
    } else {
      ElMessage.error(response.message || '更新失败')
    }
  } else {
    // 新增模式
    const response = await userStore.createUser({
      username: form.username.trim(),
      email: form.email.trim(),
    })
    if (response.code === 200) {
      ElMessage.success('创建成功')
      router.push('/admin/users')
    } else {
      ElMessage.error(response.message || '创建失败')
    }
  }
}
</script>

<style scoped>
.user-form-card {
  margin-top: 20px;
}

.user-form {
  max-width: 500px;
}
</style>
