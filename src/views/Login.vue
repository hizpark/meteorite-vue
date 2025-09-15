<!-- src/views/Login.vue -->

<template>
  <!-- 整个页面居中布局 -->
  <div
    class="login-page"
    style="display: flex; justify-content: center; align-items: center; height: 100vh"
  >
    <!-- 登录卡片 -->
    <el-card class="login-card" style="width: 400px">
      <!-- 标题 -->
      <h2 style="text-align: center; margin-bottom: 20px">CMS 登录</h2>

      <!-- 表单 -->
      <!-- :model="form" 绑定表单数据对象 -->
      <!-- ref="loginForm" 获取表单实例，后面可以做表单验证 -->
      <el-form :model="form" ref="loginForm" label-width="80px">
        <!-- 用户名输入框 -->
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>

        <!-- 密码输入框 -->
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="handleLogin"> 登录 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 组合式 API
import { reactive, ref } from 'vue'
// 用于页面跳转
import { useRouter } from 'vue-router'
// 引入 Pinia 的用户 store（在 src/stores/index.js 里定义）
import { useUserStore } from '../stores'

export default {
  name: 'AppLogin', // 注意：组件名必须是多单词，这里避免 eslint 报警告

  setup() {
    // 定义表单数据，reactive 用来创建响应式对象
    const form = reactive({
      username: '',
      password: '',
    })

    // 获取表单的引用（后面可以用来做表单校验）
    const loginForm = ref(null)

    // 路由实例，用于跳转页面
    const router = useRouter()

    // 用户数据管理（Pinia store）
    const userStore = useUserStore()

    // 登录方法
    const handleLogin = () => {
      if (!form.username || !form.password) {
        // 简单必填校验
        return alert('请输入用户名和密码')
      }

      // 模拟登录：把用户名存入 store
      userStore.login({ username: form.username })

      // 跳转到后台首页（Dashboard）
      router.push('/dashboard')
    }

    // setup 返回给模板使用的数据和方法
    return { form, loginForm, handleLogin }
  },
}
</script>

<!--
运行逻辑

输入账号密码 → form.username 和 form.password 会被实时更新。
点击登录按钮 → 触发 handleLogin。
验证通过 → 调用 userStore.login() 保存登录信息。
页面跳转 → 使用 router.push('/dashboard') 进入后台首页。
-->
