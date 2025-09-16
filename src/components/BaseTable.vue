<!-- BaseTable.vue
     通用表格组件

     功能：
     1. 显示表格数据
     2. 可选搜索（searchFields & searchPlaceholder）
     3. 可选分页（pageSize & enablePagination）
     4. 可插槽自定义操作列（slot="actions"）
     5. 提供新增按钮事件（@add）
-->

<template>
  <el-card class="base-table-card">
    <!-- 搜索栏（可选） -->
    <div
      v-if="enableSearch"
      style="display: flex; justify-content: space-between; margin-bottom: 10px"
    >
      <el-input v-model="search" :placeholder="searchPlaceholder" style="width: 250px" clearable />
      <el-button type="primary" @click="$emit('add')">{{ addText }}</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="paginatedData" style="width: 100%">
      <el-table-column
        v-for="col in columns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
      >
        <template #default="scope" v-if="col.slot === 'actions'">
          <slot name="actions" :row="scope.row" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页（可选） -->
    <div v-if="enablePagination" style="text-align: right; margin-top: 10px">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="filteredData.length"
        layout="prev, pager, next"
      />
    </div>
  </el-card>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'BaseTable',

  props: {
    data: { type: Array, default: () => [] },
    columns: { type: Array, default: () => [] },
    pageSize: { type: Number, default: 5 },
    searchFields: { type: Array, default: () => [] },
    searchPlaceholder: { type: String, default: '搜索' },
    addText: { type: String, default: '新增' },
    enableSearch: { type: Boolean, default: true },
    enablePagination: { type: Boolean, default: true },
  },

  setup(props) {
    // 搜索关键字 ------------------------------------------------------
    const search = ref('')

    // 当前页码 --------------------------------------------------------
    const currentPage = ref(1)

    // 过滤数据（搜索）------------------------------------------------
    const filteredData = computed(() => {
      if (!props.enableSearch || !search.value) return props.data
      const keyword = search.value.toLowerCase()
      return props.data.filter((item) =>
        props.searchFields.some((field) => String(item[field]).toLowerCase().includes(keyword)),
      )
    })

    // 分页数据 --------------------------------------------------------
    const paginatedData = computed(() => {
      if (!props.enablePagination) return filteredData.value
      const start = (currentPage.value - 1) * props.pageSize
      return filteredData.value.slice(start, start + props.pageSize)
    })

    // 搜索变更重置页码 ----------------------------------------------
    watch(search, () => (currentPage.value = 1))

    return { search, currentPage, filteredData, paginatedData }
  },
}
</script>

<style scoped>
/* 去掉 el-card 默认边框，使用主题背景色区分 */
.base-table-card {
  border: none !important;
  background-color: var(--card-bg);
  color: var(--text-color);
  transition:
    background-color 0.3s,
    color 0.3s;
}
</style>
