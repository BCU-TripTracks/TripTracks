<script setup>
import { useStore } from "vuex";

import AppMenuvue from "./AppMenu.vue";
import TopNav from "./components/TopNav.vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import socket from "../socket";
import axios from "../axios";
const store = useStore();

// const EventUnit_Setup = () => {
//   axios.get("/Home/EventUnit_Setup", { withCredentials: true }).then((req) => {
//     const { success, UnreadCount } = req.data;
//     if (!success) return alert("이벤트 정보를 가져오는데 실패하였습니다.");
//     console.log(UnreadCount);
//     store.commit("SetDangerEvent", { UnreadCount });
//   });
// };

// socket.on("connect", () => {
//   toast("Socket.io 접속 성공", { theme: "light", type: "success", autoClose: 1000 });
// });
// socket.on("toast-success", (message) => {
//   toast(message, {
//     theme: "light",
//     type: "success",
//     autoClose: 5000,
//   });
//   EventUnit_Setup();
// });
// socket.on("toast-warning", (message) => {
//   toast(message, {
//     theme: "light",
//     type: "warning",
//     autoClose: 5000,
//   });
//   EventUnit_Setup();
// });
// socket.on("toast-error", (message) => {
//   toast(message, {
//     theme: "light",
//     type: "error",
//   });
//   EventUnit_Setup();
// });

// socket.on("Device_Live_Data_Update", (data) => {
//   store.dispatch("Socket_DeviceLiveUpdate", data);
// });

// socket.on("Device_Connection", (data) => store.dispatch("Socket_DeviceConnection", data));
</script>

<template>
  <div class="contain">
    <AppMenuvue />
    <div class="main-container">
      <TopNav />
      <div class="router-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contain {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  background-color: var(--background-default);
}

.main-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.router-container {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  height: 100%;
}

.top-nav {
  flex-shrink: 0; /* 필요에 따라 상단 네비게이션의 크기 고정 */
}
</style>
