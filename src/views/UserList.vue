<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator="/">
    <!-- 可点击返回首页 -->
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <!-- 当前操作，非链接 -->
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 用户表格 -->
  <BaseTable
    :data="users"
    :columns="columns"
    :loading="loading"
    :search-fields="['username']"
    search-placeholder="搜索用户名"
    add-text="新增用户"
    :enable-search="true"
    :enable-pagination="true"
    @add="addUser"
  >
    <!-- 表格操作列 -->
    <template #actions="{ row }">
      <el-button size="small" @click="editUser(row.id)">编辑</el-button>
      <el-button size="small" type="danger" @click="deleteUser(row.id)">删除</el-button>
    </template>
  </BaseTable>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import BaseTable from '../components/BaseTable.vue'
import { getUserListApi } from '@/api/user'

const router = useRouter()

// 表格数据 & 状态
const users = ref([])
const loading = ref(false)

// 表格列定义
const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'username', label: '用户名' },
  { prop: 'email', label: '邮箱' },
  { prop: 'actions', label: '操作', width: 150, slot: 'actions' },
]

// 获取用户列表
const fetchUsers = async () => {
  loading.value = true
  try {
    const res = await getUserListApi()
    if (res.success) {
      users.value = res.list
    } else {
      ElMessage.error('获取用户列表失败')
    }
  } catch (err) {
    console.error('获取用户列表出错:', err)
    ElMessage.error('获取用户列表出错，请重试')
  } finally {
    loading.value = false
  }
}

// 新增用户
const addUser = () => router.push('/users/new')

// 编辑用户
const editUser = (id) => router.push(`/users/${id}/edit`)

// 删除用户（本地模拟）
const deleteUser = (id) => {
  users.value = users.value.filter((u) => u.id !== id)
  ElMessage.success('用户已删除')
}

// 页面挂载时获取列表
onMounted(() => {
  fetchUsers()
})
</script>
