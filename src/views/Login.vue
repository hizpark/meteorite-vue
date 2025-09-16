<!-- Login.vue
     CMS 登录页组件

     功能：
     1. 居中显示登录卡片
     2. 输入用户名和密码
     3. 简单必填校验
     4. 调用 Pinia store 保存登录用户信息
     5. 登录成功后跳转到 /dashboard
-->

<template>
  <!-- 页面整体布局 -->
  <div
    class="login-page"
    style="display: flex; justify-content: center; align-items: center; height: 100vh"
  >
    <!-- 登录卡片 -->
    <el-card class="login-card" style="width: 400px">
      <!-- 标题 -->
      <h2 style="text-align: center; margin-bottom: 20px">CMS 登录</h2>

      <!-- 表单 -->
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores'

export default {
  name: 'AppLogin',

  setup() {
    // 表单数据对象 ------------------------------------------------------
    const form = reactive({
      username: '',
      password: '',
    })

    // 表单实例引用 ------------------------------------------------------
    const loginForm = ref(null)

    // 路由实例 ----------------------------------------------------------
    const router = useRouter()

    // 用户状态管理 ------------------------------------------------------
    const userStore = useUserStore()

    // 登录方法 ----------------------------------------------------------
    const handleLogin = () => {
      if (!form.username || !form.password) {
        alert('请输入用户名和密码')
        return
      }

      // 保存登录用户名到 Pinia store
      userStore.login({ username: form.username })

      // 登录成功后跳转后台首页
      router.push('/dashboard')
    }

    return { form, loginForm, handleLogin }
  },
}
</script>
