<script setup>
import { watch, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import socket from "./socket";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

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
    console.log(`Emitting 'login' event with user ID: ${User_ID.value}`);
    socket.emit("login", User_ID.value);
  } else {
    console.log("로그인 안됨");
    router.push({ name: "Login" });
    // router.push({ name: "DirectMessage" });
    console.log(`Emitting 'logout' event with user ID: ${User_ID.value}`);
    socket.emit("logout", User_ID.value);
  }
};
onMounted(() => {
  store.dispatch("checkSession");
  check_sesstion();
  socket.on("receive_message", (data) => {
    const { Room_ID, User_ID, Message, Time } = data;
    toast(`${User_ID}: ${Message}`, {
      position: "top-right",
      duration: 1000,
      isClosable: true,
      onClick: () => {
        router.push({ name: "DirectMessage", params: { Room_ID: Room_ID } });
      },
    });
  });
});
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
