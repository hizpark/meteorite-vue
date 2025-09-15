<template>
  <el-card class="user-form-card">
    <h2>{{ isEdit ? '编辑用户' : '新增用户' }}</h2>
    <el-form :model="form" label-width="80px" class="user-form">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
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
  name: 'UserForm',
  setup() {
    const route = useRoute()
    const isEdit = computed(() => !!route.params.id)

    const form = reactive({
      username: '',
      email: '',
    })

    onMounted(() => {
      if (isEdit.value) {
        // 模拟加载已有用户数据
        form.username = 'harper'
        form.email = 'harper@example.com'
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
.user-form-card {
  border: none !important; /* 去掉边框 */
  background-color: var(--card-bg); /* 暗/亮主题自适应背景色 */
  color: var(--text-color); /* 暗/亮主题文字颜色 */
  transition:
    background-color 0.3s,
    color 0.3s; /* 平滑过渡 */
}
.el-card h2 {
  margin-top: 0; /* 去掉上边距 */
  margin-bottom: 30px;
}
</style>
