<!--
  @file AuthLayout.vue
  @description 登录/注册页面布局组件
  本组件主要功能：
  1. 提供居中的布局容器，用于 Auth 页面（如 Login.vue）
  2. 使用 <router-view /> 渲染当前子路由组件
  3. 样式仅作用于本布局，使用 scoped 作用域
-->

<template>
  <!-- 布局容器 -->
  <div class="auth-layout">
    <main>
      <!-- 子路由渲染占位 -->
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  // 组件名称 --------------------------------------------------------------
  name: 'AuthLayout',

  // 组件逻辑 --------------------------------------------------------------
  // 本组件主要提供布局，不包含业务逻辑
}
</script>

<style scoped>
/* 布局样式 -------------------------------------------------------------- */
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
}
</style>
