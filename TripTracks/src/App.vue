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
const User_ID = computed(() => store.state.User_ID);

watch(
  User_ID,
  (newValue) => {
    store.dispatch("checkSession");
    if (newValue) {
      console.log("로그인");
      router.push({ name: "HomeFeed" });
      socket.emit("login", User_ID.value);
    } else {
      console.log("로그아웃");
      router.push({ name: "Login" });
      socket.emit("logout", User_ID.value);
    }
  },
  { immediate: true }
);

onMounted(() => {
  store.dispatch("checkSession");
  socket.on("receive_message", (data) => {
    const { Room_ID, User_ID, Message, Time } = data;
    toast(`${User_ID}: ${Message}`, {
      position: "top-right",
      duration: 1000,
      isClosable: true,
      onClick: () => {
        console.log("Clicked on toast");
        router.push({ name: "Room", params: { Room_ID: Room_ID } });
      },
    });
  });
});
// store.dispatch("checkSession");
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
