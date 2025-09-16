<!-- UserForm.vue
     用户表单页组件（新增 / 编辑用户）

     功能：
     1. 支持新增用户和编辑已有用户
     2. 用户名和邮箱输入
     3. 模拟提交表单
     4. 编辑模式下预填充用户数据
-->

<template>
  <!-- 表单卡片 -->
  <el-card class="user-form-card no-border">
    <!-- 标题 -->
    <h2>{{ isEdit ? '编辑用户' : '新增用户' }}</h2>

    <!-- 用户表单 -->
    <el-form :model="form" label-width="80px" class="user-form">
      <!-- 用户名输入框 -->
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>

      <!-- 邮箱输入框 -->
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// 路由实例 ----------------------------------------------------------
const route = useRoute()

// 判断是否编辑模式 --------------------------------------------------
const isEdit = computed(() => !!route.params.id)

// 表单数据对象 ------------------------------------------------------
const form = reactive({
  username: '',
  email: '',
})

// 初始化表单 --------------------------------------------------------
onMounted(() => {
  if (isEdit.value) {
    // 模拟加载已有用户数据
    form.username = 'harper'
    form.email = 'harper@example.com'
  }
})

// 提交方法 ----------------------------------------------------------
const submit = () => {
  alert(JSON.stringify(form))
}
</script>
