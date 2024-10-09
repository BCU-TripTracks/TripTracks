<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

import headervue from "../components/header.vue";
import fottervue from "../components/fotter.vue";
import messagevue from "../components/message.vue";
import notification from "../components/notification.vue";
import write from "../components/write.vue";

const isNoti = computed(() => store.state.isNoti);
const isMsg = computed(() => store.state.isMsg);
const isWrite = computed(() => store.state.isWrite);

const click_Msg = () => {
  // store.commit("Switch_isMsg");
};

const router = useRouter();
</script>

<template>
  <write v-if="isWrite" />
  <notification v-if="isNoti" />
  <messagevue v-if="isMsg" />
  <headervue />
  <!-- <router-link to="/DirectMessage" class="write">
    <img src="../assets/img/messageIcon.png" alt="" class="airplane" />
  </router-link> -->
  <div class="main-container">
    <div class="section">
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.main-container {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
}
.main-container > .section {
  max-width: 1200px;
}
.write {
  color: white;
  font: bold 18px arial;
  text-decoration: none;
  margin-bottom: 5px;
}
.airplane {
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 50px;
  width: 50px;
  margin: 10px;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
.fotter {
  margin-top: 1em;
}

.airplane:hover {
  cursor: pointer;
}
.message {
  display: flex;
  justify-content: flex-end;
}
</style>
