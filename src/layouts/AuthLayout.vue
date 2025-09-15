<template>
  <div class="auth-layout">
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>

<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
}
</style>
