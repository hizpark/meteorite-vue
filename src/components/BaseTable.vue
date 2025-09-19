<template>
  <el-table :data="data" style="width: 100%" :loading="loading">
    <!-- 普通列 -->
    <el-table-column
      v-for="(col, index) in normalColumns"
      :key="`normal-${col.prop}-${index}`"
      :prop="col.prop"
      :label="col.label"
      :width="col.width"
      :min-width="col.minWidth || 100"
      :sortable="col.sortable"
      :align="col.align"
      :fixed="col.fixed"
      :show-overflow-tooltip="col.showOverflowTooltip"
      :formatter="col.formatter"
    />

    <!-- 操作列 -->
    <el-table-column
      v-for="(col, index) in actionColumns"
      :key="`action-${col.prop || 'actions'}-${col.label}-${index}`"
      :label="col.label"
      :width="col.width"
      :min-width="col.minWidth || 150"
      :align="col.align || 'center'"
      :fixed="col.fixed"
    >
      <template #default="scope">
        <!-- 使用传入 slot，slotName 可自定义 -->
        <slot :name="col.slotName || 'actions'" :row="scope.row">
          <!-- 默认按钮，可通过 showDefaultActions 控制显示 -->
          <template v-if="col.showDefaultActions !== false">
            <el-button size="small">查看</el-button>
            <el-button size="small" type="primary">编辑</el-button>
          </template>
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
    validator: (columns) => {
      return columns.every((col) => {
        // 操作列允许没有 prop，但必须有 label
        if (col.slot) return !!col.label
        return !!col.prop && !!col.label
      })
    },
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

/** 普通列（不带 slot） */
const normalColumns = computed(() => props.columns.filter((col) => !col.slot))

/** 操作列（带 slot） */
const actionColumns = computed(() => props.columns.filter((col) => col.slot))
</script>

<style scoped>
/* 可根据需求添加全局表格样式 */
</style>
