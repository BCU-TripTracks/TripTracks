<script setup>
import { watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const isLogin = computed(() => store.state.isLogin);

watch(isLogin, (newValue) => {
  check_sesstion();
});

const check_sesstion = () => {
  if (isLogin.value) {
    console.log("로그인됨");
    router.push({ name: "Home" });
  } else {
    console.log("로그인 안됨");
    router.push({ name: "Login" });
  }
};
store.dispatch("checkSession");
check_sesstion();
</script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
