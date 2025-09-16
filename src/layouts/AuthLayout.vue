<!--
  @file AuthLayout.vue
  @description CMS 登录/注册页面布局组件（左侧表单最大宽度 640px）
  本组件主要功能：
  1. 左侧放置表单区域，最大宽度 640px
  2. 右侧放置装饰图片，占剩余空间
  3. 极小屏幕优先显示表单，右侧图片隐藏
-->

<template>
  <div class="auth-layout">
    <!-- 左侧表单区域 -->
    <div class="auth-form">
      <router-view></router-view>
    </div>

    <!-- 右侧装饰图片 -->
    <div class="auth-image"></div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>

<style scoped>
/* 布局整体 ---------------------------------------------------------- */
.auth-layout {
  display: flex;
  height: 100vh;
  width: 100%;
}

/* 左侧表单区域 ------------------------------------------------------ */
.auth-form {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  max-width: 640px; /* 最大宽度限制 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f9fc;
  flex-shrink: 0; /* 不被压缩 */
}

/* 右侧图片区域 ------------------------------------------------------ */
.auth-image {
  flex: 1; /* 占剩余空间 */
  background: url('@/assets/images/auth-feature.jpg') no-repeat center center;
  background-size: cover;
}

/* 响应式：极小屏幕 ------------------------------------------------ */
@media (max-width: 768px) {
  .auth-layout {
    flex-direction: column; /* 上下排列 */
    height: 100vh; /* 保证整个容器占满屏幕高度 */
  }
  .auth-form {
    height: 100%; /* 左侧表单区域占满父容器高度 */
    max-width: 100%; /* 全宽适配小屏幕 */
  }
  .auth-image {
    display: none; /* 隐藏右侧图片 */
  }
}
</style>
