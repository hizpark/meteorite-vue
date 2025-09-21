<!-- ContentForm.vue
     内容表单页组件（新增 / 编辑内容）
-->

<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator="/">
    <!-- 可点击返回首页 -->
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>

    <!-- 可点击返回用户管理列表 -->
    <el-breadcrumb-item :to="{ path: '/admin/contents' }">内容管理</el-breadcrumb-item>

    <!-- 当前操作，非链接 -->
    <el-breadcrumb-item>{{ isEdit ? '编辑内容' : '新增内容' }}</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 表单卡片 -->
  <el-card class="content-form-card no-border">
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

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

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
</script>

<style scoped>
.content-form-card {
  margin-top: 20px;
}
</style>
