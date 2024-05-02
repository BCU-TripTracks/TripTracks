<script setup>
import { ref, onMounted } from "vue";
import axios from "../axios";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { on } from "../../../backend/utils/DBconn";

const route = useRoute();
const router = useRouter();
const store = useStore();

const User_ID = store.state.user_ID;

const selectDMMenu = ref("Rooms");
const selectRoom = ref(null);
const DMRooms = ref([
  {
    roomID: 1,
    roomName: "room1",
    lastMessage: "ㅁㅁㅁ",
    lastMessageTime: "마지막: 1분 전",
  },
  {
    roomID: 2,
    roomName: "room2",
    lastMessage: "ㅋㅋㅋ",
    lastMessageTime: "마지막: 2분 전",
  },
  {
    roomID: 3,
    roomName: "room3",
    lastMessage: "ㅁㄴㅇ",
    lastMessageTime: "마지막: 3분 전",
  },
]);
onMounted(() => {
  axios
    .get("/DirectMessage/print_Room")
    .then((result) => {
      console.log(result.data);
      const { Rooms_Info } = result.data;
      DMRooms.value = Rooms_Info;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>
<template>
  <div class="mainContainer">
    <div class="DMMenuContainer">
      <router-link :to="{ name: 'Home' }" class="logo">TripTracks</router-link>
      <div class="DMMenu">
        <li :class="{ select: selectDMMenu === 'Rooms' }" @click="selectDMMenu = 'Rooms'">채팅방</li>
        <li :class="{ select: selectDMMenu === 'Requests' }" @click="selectDMMenu = 'Requests'">요청</li>
      </div>
      <div class="DMList" v-if="selectDMMenu === 'Rooms'">
        <div
          class="DMRoomContainer"
          v-for="Room in DMRooms"
          :class="{ select: selectRoom === Room.roomID }"
          @click="
            selectRoom = Room.roomID;
            router.push({ name: 'Room', params: { Room_ID: Room.roomID } });
          "
        >
          <div class="Profile">ㅋ</div>
          <div class="DMRoom">
            <div class="DMRoomName">{{ Room.roomName }}</div>
            <span>
              <div class="DMRoomLastMessage">{{ Room.lastMessage }} |</div>
              <div class="DMRoomLastMessageTime">| {{ Room.lastMessageTime }}</div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="DMContentContainer">
      <div class="DMContent" v-if="route.name === 'DirectMessage'">아마 메시지 창이 들어갈 곳</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
:root {
  --border-color: rgb(219, 219, 219);
}
li {
  list-style: none;
}
* {
  transition: border 0.3s, background-color 0.3s, color 0.3s;
}
.mainContainer {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.mainContainer > .DMMenuContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-right: 1px solid rgb(219, 219, 219);
  box-sizing: border-box;
}
.DMMenuContainer > * {
  cursor: pointer;
  user-select: none;
}
.DMMenuContainer > .logo {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 2rem 1rem;
}
.DMMenuContainer > .DMMenu {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  color: #737373;
  background-color: white;
}
.DMMenu > * {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(219, 219, 219);
}
.DMMenu > *:hover {
  color: black;
  background-color: #f0f0f0;
  border-bottom: 3px solid black;
}
.DMMenu > *:active {
  color: black;
  background-color: #e0e0e0;
  border-bottom: 2px solid black;
}
.DMMenu > .select {
  color: black;
  background-color: #f0f0f0;
  border-bottom: 2px solid black;
}
.DMMenuContainer > .DMList {
  display: flex;
  flex-direction: column;

  overflow-y: auto;
}
.DMList > .DMRoomContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}
.DMRoomContainer:hover {
  background-color: #f0f0f0;
}
.DMRoomContainer.select {
  background-color: #e0e0e0;
}
.DMRoomContainer > .Profile {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #cbcbcb;
  margin: 1rem;
  overflow: hidden;
}
.DMRoomContainer > .DMRoom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: bold;
}
.DMRoom > span {
  display: flex;

  font-size: 0.8rem;
  font-weight: normal;
}

.mainContainer > .DMContentContainer {
  flex: 3;
  display: flex;
  flex-direction: column;
  background-color: green;
}
/* Your component styles here */
</style>
