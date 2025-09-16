<template>
  <div class="login-container">
    <!-- 品牌模块 -->
    <div class="header">
      <div class="brand">
        <span class="logo-wrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64px"
            height="64px"
            viewBox="0 0 256 256"
            style="fill: currentColor; stroke: currentColor"
            class="brand-logo"
          >
            <path
              fill-rule="evenodd"
              d="m379.495 134.862 294.99-103.144-39.236 172.365-177.318-2.426Zm322.888-78.946 154.521 279.642-3.031 190.178-188.327-308.02 36.836-161.8Zm146.894 524.226L602.29 757.387 417.226 638.962l48.98-404.776 172.894 2.3L849.283 580.15zm-457.787.154L279.06 336.925l153.154-93.406-40.724 336.78zm-90.02-294.913 51.61-130.304 67.61 57.528-119.226 72.77z"
              style="stroke-width: 1.46557"
              transform="matrix(.35278 0 0 .35278 -72.372 -11.19)"
            />
          </svg>
        </span>
        <span class="brand-text">Meteorite</span>
      </div>
    </div>

    <!-- 登录表单卡片 -->
    <el-card class="login-card no-border">
      <h2 class="login-title">登录</h2>
      <el-form :model="form" ref="loginForm" label-width="0" @submit.prevent="handleLogin">
        <!-- 用户名 -->
        <el-form-item>
          <el-input
            v-model="form.username"
            placeholder="用户名"
            clearable
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            clearable
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部版权 -->
    <div class="footer">
      <p>© 2025 Meteorite. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

// 表单数据
const form = reactive({ username: '', password: '' })

// 表单实例
const loginForm = ref(null)

// 路由
const router = useRouter()

// 用户状态管理
const userStore = useUserStore()

// loading 状态
const loading = ref(false)

// 登录方法
const handleLogin = async () => {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }

  loading.value = true
  try {
    const success = await userStore.login({
      username: form.username,
      password: form.password,
    })

    if (!success) {
      ElMessage.error('用户名或密码错误')
      return
    }

    ElMessage.success('登录成功！')
    router.push('/dashboard')
  } catch (err) {
    console.error('登录出错:', err)
    ElMessage.error('登录过程中出现错误，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 左侧容器 */
.login-container {
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column; /* 品牌 + 表单 + footer */
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  min-height: 640px;
  max-height: 960px;
}

/* 品牌模块 */
.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}
.brand-logo {
  width: 64px;
  height: 64px;
  transition: transform 0.3s ease;
}
.brand-logo:hover {
  transform: rotate(15deg);
}
.brand-text {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  transition: color 0.3s ease;
}
.brand-text:hover {
  color: #409eff;
}

/* 登录卡片 */
.login-card {
  width: 100%;
  max-width: 640px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.login-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}

/* 登录标题 */
.login-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 500;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  transition: all 0.3s ease;
}
.login-btn:hover {
  background: linear-gradient(90deg, #409eff, #66b1ff);
  border-color: #66b1ff;
}

/* 底部版权 */
.footer {
  text-align: center;
  color: #999;
  font-size: 12px;
  margin-top: 30px;
}

/* 修复输入时宽度跳跃 */
.el-input.el-input--suffix {
  width: 220px !important;
}
</style>
