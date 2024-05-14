<script setup></script>

<template>
  <div class="container">
    <h1 class="Signup">Sign up</h1>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: var(--login-background-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container > * {
  margin: 1rem 0;
}

.container > .Signup {
  font-size: 50px;
  color: var(--login-text-color);
}
</style>
