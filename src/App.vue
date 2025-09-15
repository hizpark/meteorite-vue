<!-- src/App.vue -->

<template>
  <!--
    <router-view /> 是 Vue Router 提供的占位组件
    用于渲染当前路由对应的组件页面
    例如访问 /login，就渲染 Login.vue
    访问 /dashboard，就渲染 Dashboard.vue
  -->
  <router-view />
</template>

<script>
export default {
  // 根组件名称
  name: 'App',

  // 根组件本身没有逻辑，主要用于路由渲染
  // 组件的业务逻辑都放在各个页面或子组件中
}
</script>

<!-- 这里没有 style，因为全局样式可以在 main.js 引入 Element Plus 样式 -->
