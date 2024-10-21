<script setup>
import { ref, onMounted } from "vue";
import axios from "../axios";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";
import "moment/locale/ko"; // 한국어 로케일을 불러옵니다.

moment.locale("ko"); // 언어를 한국어로 설정합니다.
import socket from "../socket";

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
    Profile_Img: "",
  },
  {
    roomID: 2,
    roomName: "room2",
    lastMessage: "ㅋㅋㅋ",
    lastMessageTime: "마지막: 2분 전",
    Profile_Img: "",
  },
  {
    roomID: 3,
    roomName: "room3",
    lastMessage: "ㅁㄴㅇ",
    lastMessageTime: "마지막: 3분 전",
    Profile_Img: "",
  },
]);
const search_DMRooms = () => {
  axios
    .get("/Direct/print_Room", { withCredentials: true })
    .then((result) => {
      console.log(result.data);
      const { Rooms_Info } = result.data;
      DMRooms.value = Rooms_Info;

      // 날짜 형식을 먼저 변환
      DMRooms.value.forEach((Room) => {
        const now = moment(); // 현재 시간
        const lastMessageTime = moment(Room.lastMessageTime); // 메시지 시간

        if (lastMessageTime.isValid()) {
          const diffInSeconds = now.diff(lastMessageTime, "seconds"); // 초 단위 차이

          let timeString = "";

          if (diffInSeconds < 60) {
            timeString = `${diffInSeconds}초 전`; // 60초 미만
          } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            timeString = `${minutes}분 전`; // 1시간 미만
          } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            timeString = `${hours}시간 전`; // 24시간 미만
          } else {
            const days = Math.floor(diffInSeconds / 86400);
            if (days > 7) {
              timeString = "마지막: 7일 이상"; // 7일 초과
            } else {
              timeString = `${days}일 전`; // 7일 이하
            }
          }

          Room.timeString = timeString;
        } else {
          Room.timeString = "마지막: 없음";
        }
      });

      // 최신순(내림차순)으로 정렬
      DMRooms.value.sort((a, b) => {
        return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
      });

      console.log(DMRooms.value); // 정렬된 결과 확인
    })
    .catch((err) => {
      console.log(err);
    });
};
onMounted(() => {
  search_DMRooms();
  socket.on("receive_message", () => {
    search_DMRooms();
  });
  socket.on("DM_Rooms_Update", () => {
    search_DMRooms();
  });
});
</script>
<template>
  <div class="mainContainer">
    <div class="DMMenuContainer">
      <router-link :to="{ name: 'HomeFeed' }" class="logo">TripTracks</router-link>
      <div class="DMMenu">
        <li :class="{ select: selectDMMenu === 'Rooms' }" @click="selectDMMenu = 'Rooms'">채팅방</li>
        <li :class="{ select: selectDMMenu === 'Requests' }" @click="selectDMMenu = 'Requests'">요청</li>
      </div>
      <div class="DMList" v-if="selectDMMenu === 'Rooms'">
        <div
          class="DMRoomContainer"
          v-for="Room in DMRooms"
          :class="{ select: selectRoom === Room.Room_ID }"
          @click="
            selectRoom = Room.Room_ID;
            router.push({ name: 'Room', params: { Room_ID: Room.Room_ID } });
          "
        >
          <img :src="Room.Profile_Img" class="Profile" />

          <div class="DMRoom">
            <div class="DMRoomName">{{ Room.User_Name }}</div>
            <span v-if="Room.lastMessage">
              <div class="DMRoomLastMessage">{{ Room.lastMessage }}</div>
              <div class="DMRoomLastMessageTime">{{ Room.timeString }}</div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="DMContentContainer">
      <div class="DMContent" v-if="route.name === 'DirectMessage'"></div>
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
  margin: 2rem 1rem;
  font-size: 36px;
  font-weight: bold;
  font-family: "Perpetua";
  text-decoration-line: none;
  color: black;
}
.DMMenuContainer > .DMMenu {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  color: #737373;
  background-color: white;
}
.DMRoom {
  width: 100%;
}
.DMRoomLastMessage {
  display: block; /* 또는 inline-block */
  width: 100%; /* 부모 컨테이너에 맞게 너비 조정 */
  white-space: nowrap; /* 텍스트를 한 줄로 유지 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 말줄임표(...) 표시 */
}
.DMRoomLastMessageTime {
  display: block; /* 또는 inline-block */
  width: 100%; /* 부모 컨테이너에 맞게 너비 조정 */
  white-space: nowrap; /* 텍스트를 한 줄로 유지 */
  text-align: right;
  margin-right: 1rem;
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
}
.DMRoom > span {
  display: flex;
  justify-content: space-between;
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
  width: 50px;
  border-radius: 100px;
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
  background-color: white;
}
/* Your component styles here */
</style>
