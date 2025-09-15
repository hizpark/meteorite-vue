<template>
  <el-card class="content-form-card">
    <h2>{{ isEdit ? '编辑内容' : '新增内容' }}</h2>
    <el-form :model="form" label-width="80px" class="content-form">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author" placeholder="请输入作者" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content" placeholder="请输入内容" :rows="6" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'ContentForm',
  setup() {
    const route = useRoute()
    const isEdit = computed(() => !!route.params.id)

    const form = reactive({
      title: '',
      author: '',
      content: '',
    })

    onMounted(() => {
      if (isEdit.value) {
        // 模拟加载已有内容数据
        form.title = '示例文章'
        form.author = 'harper'
        form.content = '这里是文章内容示例...'
      }
    })

    const submit = () => {
      alert(JSON.stringify(form))
    }

    return { form, isEdit, submit }
  },
}
</script>

<style scoped>
/* 去掉 el-card 边框，使用主题背景区分 */
.content-form-card {
  border: none !important;
  background-color: var(--card-bg);
  color: var(--text-color);
  transition:
    background-color 0.3s,
    color 0.3s;
}
.el-card h2 {
  margin-top: 0; /* 去掉上边距 */
  margin-bottom: 30px;
}
</style>
