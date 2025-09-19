<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card class="base-table-card no-border">
    <!-- 添加按钮 + 搜索 -->
    <div class="toolbar">
      <!-- 左侧搜索框 -->
      <el-input
        v-model="search"
        placeholder="搜索用户名"
        clearable
        @clear="onSearch"
        @keyup.enter="onSearch"
        class="search-input"
      >
        <template #append>
          <el-button size="small" type="primary" @click="onSearch">搜索</el-button>
        </template>
      </el-input>

      <!-- 右侧添加按钮 -->
      <el-button type="primary" class="add-button" @click="addUser">添加用户</el-button>
    </div>

    <!-- 表格 -->
    <BaseTable
      :data="userStore.userList"
      :columns="userStore.columns"
      :loading="userStore.loading.list"
    >
      <template #actions="{ row }">
        <el-button size="small" @click="editUser(row.id)">编辑</el-button>
        <el-button size="small" type="danger" @click="confirmDelete(row.id)">删除</el-button>
      </template>
    </BaseTable>

    <!-- 分页组件 -->
    <div style="text-align: right; margin-top: 10px">
      <el-pagination
        :current-page="userStore.currentPage"
        :page-size="userStore.pageSize"
        :total="userStore.totalCount"
        layout="prev, pager, next"
        @current-change="handlePageChange"
      />
    </div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import BaseTable from '@/components/BaseTable.vue'
import router from '@/router'

const userStore = useUserStore()
const search = ref('')

// 获取列表函数，保留搜索关键词
const fetchUserList = (page = userStore.currentPage) => {
  userStore.getUserList({
    page,
    limit: userStore.pageSize,
    search: search.value.trim(),
  })
}

const addUser = () => router.push('/admin/users/new')
const editUser = (id) => router.push(`/admin/users/${id}/edit`)
import { ElMessageBox, ElMessage } from 'element-plus'

// 页面加载时获取列表
onMounted(() => fetchUserList())

// 搜索方法，搜索时页面回到第一页
const onSearch = () => fetchUserList(1)

// 分页回调，保持当前搜索关键词
const handlePageChange = (page) => fetchUserList(page)

const confirmDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确定要删除该用户吗？此操作不可撤销。', '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    // 用户点击确定
    await userStore.deleteUser(id)
    ElMessage.success('删除成功')
  } catch (err) {
    // 用户点击取消或关闭弹窗
    if (err !== 'cancel') {
      console.error(err)
      ElMessage.error('删除失败')
    }
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1 1 200px;
  max-width: 400px;
  min-width: 180px;
}

.add-button {
  flex: 0 0 auto;
}

.base-table-card {
  margin-top: 20px;
}
</style>
