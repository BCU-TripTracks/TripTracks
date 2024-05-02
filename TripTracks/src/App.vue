<script setup>
import { watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import socket from "./socket";

// const { proxy } = getCurrentInstance();

const router = useRouter();
const store = useStore();
const User_ID = computed(() => store.state.user_ID);
const isLogin = computed(() => store.state.isLogin);

watch(isLogin, (newValue) => {
  check_sesstion();
});

const check_sesstion = () => {
  if (isLogin.value) {
    console.log("로그인됨");
    router.push({ name: "HomeFeed" });
    console.log(`Emitting 'login' event with user ID: ${User_ID}`);
    socket.emit("login", User_ID);
  } else {
    console.log("로그인 안됨");
    router.push({ name: "Login" });
    // router.push({ name: "DirectMessage" });
    console.log(`Emitting 'logout' event with user ID: ${User_ID}`);
    socket.emit("logout", User_ID);
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
