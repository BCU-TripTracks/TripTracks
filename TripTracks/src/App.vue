<script setup>
import { watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// const { proxy } = getCurrentInstance();
// const socket = proxy.$socket;
const router = useRouter();
const store = useStore();
const isLogin = computed(() => store.state.isLogin);

watch(isLogin, (newValue) => {
  check_sesstion();
});

const check_sesstion = () => {
  if (isLogin.value) {
    console.log("로그인됨");
    router.push({ name: "HomeFeed" });
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
*::-webkit-scrollbar {
  width: 10px;
  position: absolute;
  display: none;
}
*::-webkit-scrollbar-thumb {
  background-color: #2f3542;
  border-radius: 10px;
}
</style>
