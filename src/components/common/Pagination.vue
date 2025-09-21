<template>
  <div v-if="total > 0" class="pagination-wrapper">
    <el-pagination
      :current-page="localPage"
      :page-size="pageSize"
      :total="total"
      layout="prev, pager, next"
      @current-change="onPageChange"
    />
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  currentPage: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  total: { type: Number, default: 0 },
})

const emit = defineEmits(['update:currentPage'])

const localPage = ref(props.currentPage)
watch(
  () => props.currentPage,
  (val) => (localPage.value = val),
)

function onPageChange(page) {
  emit('update:currentPage', page)
}
</script>

<style scoped>
.pagination-wrapper {
  text-align: right;
  margin-top: 10px;
}
</style>
