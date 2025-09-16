<!-- UserList.vue
     用户列表页组件

     功能：
     1. 显示用户表格
     2. 支持搜索用户名
     3. 支持新增、编辑、删除用户操作
     4. 使用 BaseTable 组件封装表格和分页逻辑
-->

<template>
  <!-- 用户表格 -->
  <BaseTable
    :data="users"
    :columns="columns"
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

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseTable from '../components/BaseTable.vue'

export default {
  name: 'UserList',

  components: { BaseTable },

  setup() {
    // 路由实例 ----------------------------------------------------------
    const router = useRouter()

    // 用户列表数据 ------------------------------------------------------
    const users = ref([
      { id: 1, username: 'admin', email: 'admin@example.com' },
      { id: 2, username: 'harper', email: 'harper@example.com' },
      { id: 3, username: 'alice', email: 'alice@example.com' },
      { id: 4, username: 'bob', email: 'bob@example.com' },
      { id: 5, username: 'charlie', email: 'charlie@example.com' },
      { id: 6, username: 'david', email: 'david@example.com' },
      { id: 7, username: 'eve', email: 'eve@example.com' },
    ])

    // 表格列定义 --------------------------------------------------------
    const columns = [
      { prop: 'id', label: 'ID', width: 80 },
      { prop: 'username', label: '用户名' },
      { prop: 'email', label: '邮箱' },
      { prop: 'actions', label: '操作', width: 150, slot: 'actions' },
    ]

    // 新增用户 ----------------------------------------------------------
    const addUser = () => router.push('/dashboard/users/new')

    // 编辑用户 ----------------------------------------------------------
    const editUser = (id) => router.push(`/dashboard/users/${id}/edit`)

    // 删除用户 ----------------------------------------------------------
    const deleteUser = (id) => {
      users.value = users.value.filter((u) => u.id !== id)
    }

    return { users, columns, addUser, editUser, deleteUser }
  },
}
</script>
