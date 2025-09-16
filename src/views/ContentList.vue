<!-- ContentList.vue
     内容列表页组件

     功能：
     1. 显示内容表格
     2. 支持搜索标题或作者
     3. 支持新增、编辑、删除内容操作
     4. 使用 BaseTable 组件封装表格和分页逻辑
-->

<template>
  <!-- 内容表格 -->
  <BaseTable
    :data="contents"
    :columns="columns"
    :search-fields="['title', 'author']"
    search-placeholder="搜索标题或作者"
    add-text="新增内容"
    :enable-search="true"
    :enable-pagination="false"
    @add="addContent"
  >
    <!-- 表格操作列 -->
    <template #actions="{ row }">
      <el-button size="small" @click="editContent(row.id)">编辑</el-button>
      <el-button size="small" type="danger" @click="deleteContent(row.id)">删除</el-button>
    </template>
  </BaseTable>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseTable from '../components/BaseTable.vue'

export default {
  name: 'ContentList',

  components: { BaseTable },

  setup() {
    // 路由实例 ----------------------------------------------------------
    const router = useRouter()

    // 内容列表数据 ------------------------------------------------------
    const contents = ref([
      { id: 1, title: '第一篇文章', author: 'admin' },
      { id: 2, title: '第二篇文章', author: 'harper' },
      { id: 3, title: '第三篇文章', author: 'alice' },
      { id: 4, title: '第四篇文章', author: 'bob' },
      { id: 5, title: '第五篇文章', author: 'charlie' },
      { id: 6, title: '第六篇文章', author: 'david' },
      { id: 7, title: '第七篇文章', author: 'eve' },
    ])

    // 表格列定义 --------------------------------------------------------
    const columns = [
      { prop: 'id', label: 'ID', width: 80 },
      { prop: 'title', label: '标题' },
      { prop: 'author', label: '作者' },
      { prop: 'actions', label: '操作', width: 150, slot: 'actions' },
    ]

    // 新增内容 ----------------------------------------------------------
    const addContent = () => router.push('/dashboard/contents/new')

    // 编辑内容 ----------------------------------------------------------
    const editContent = (id) => router.push(`/dashboard/contents/${id}/edit`)

    // 删除内容 ----------------------------------------------------------
    const deleteContent = (id) => {
      contents.value = contents.value.filter((c) => c.id !== id)
    }

    return { contents, columns, addContent, editContent, deleteContent }
  },
}
</script>
