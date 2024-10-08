<script setup>
import { watch, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import socket from './socket';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const router = useRouter();
const store = useStore();
const User_ID = computed(() => store.state.User_ID);

onMounted(() => {
  store.dispatch('checkSession');
  socket.on('receive_message', (data) => {
    const { Room_ID, User_ID, Message, Time } = data;
    toast(`${User_ID}: ${Message}`, {
      position: 'top-right',
      duration: 1000,
      isClosable: true,
      onClick: () => {
        console.log('Clicked on toast');
        router.push({ name: 'Room', params: { Room_ID: Room_ID } });
      },
    });
  });
});
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
