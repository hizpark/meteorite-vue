<!-- ContentForm.vue
     内容表单页组件（新增 / 编辑内容）

     功能：
     1. 支持新增内容和编辑已有内容
     2. 输入标题、作者、正文内容
     3. 模拟提交表单
     4. 编辑模式下预填充已有内容
-->

<template>
  <!-- 表单卡片 -->
  <el-card class="content-form-card">
    <!-- 标题 -->
    <h2>{{ isEdit ? '编辑内容' : '新增内容' }}</h2>

    <!-- 内容表单 -->
    <el-form :model="form" label-width="80px" class="content-form">
      <!-- 标题输入框 -->
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>

      <!-- 作者输入框 -->
      <el-form-item label="作者">
        <el-input v-model="form.author" placeholder="请输入作者" />
      </el-form-item>

      <!-- 内容输入框 -->
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content" placeholder="请输入内容" :rows="6" />
      </el-form-item>

      <!-- 提交按钮 -->
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
    // 路由实例 ----------------------------------------------------------
    const route = useRoute()

    // 判断是否编辑模式 --------------------------------------------------
    const isEdit = computed(() => !!route.params.id)

    // 表单数据对象 ------------------------------------------------------
    const form = reactive({
      title: '',
      author: '',
      content: '',
    })

    // 初始化表单 --------------------------------------------------------
    onMounted(() => {
      if (isEdit.value) {
        // 模拟加载已有内容数据
        form.title = '示例文章'
        form.author = 'harper'
        form.content = '这里是文章内容示例...'
      }
    })

    // 提交方法 ----------------------------------------------------------
    const submit = () => {
      alert(JSON.stringify(form))
    }

    return { form, isEdit, submit }
  },
}
</script>

<style scoped>
.content-form-card {
  border: none !important; /* 去掉边框 */
  background-color: var(--card-bg); /* 暗/亮主题背景色 */
  color: var(--text-color); /* 暗/亮主题文字色 */
  transition:
    background-color 0.3s,
    color 0.3s; /* 平滑过渡 */
}

.el-card h2 {
  margin-top: 0; /* 去掉上边距 */
  margin-bottom: 30px; /* 下边距 */
}
</style>
