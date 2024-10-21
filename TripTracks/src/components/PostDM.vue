<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "../axios";
import moment from "moment";
import socket from "../socket";

// Vuex 상태 관리 및 기타 변수들 설정
const store = useStore();
const User_ID = computed(() => store.state.User_ID);
const PostID = computed(() => store.state._PostID);
const isPostDM = computed(() => store.state.isPostDM);

const router = useRouter();

const AllUserList = ref([]);
const UserList = ref([]);
const UserSelect = ref("");

const Select = ref("팔로워");

const sendMessage = () => {
  console.log("Sending message...");
  // 여기에 메시지 전송 로직을 추가
  axios
    .post(
      `/feeds/Post_DM_Send`,
      {
        Target_User: UserSelect.value,
        Message: PostID.value,
        type: "1",
      },
      { withCredentials: true }
    )
    .then(async (res) => {
      console.log(res.data);
      const { Room_ID } = res.data;

      socket.emit("send_message", {
        Room_ID,
        User_ID: UserSelect.value,
        Message: "피드를 보냈습니다.",
        Time: moment().format("YYYY:MM:DD HH:mm:ss"),
      });

      router.push({ name: "Room", params: { Room_ID } });
      store.commit("Switch_isPostDM", "");
    })
    .catch((err) => {
      console.log(err);
    });
};

const SetSelect = (select) => {
  Select.value = select;
  UserList.value = Select.value === "팔로워" ? AllUserList.value.Follower : AllUserList.value.Following;
};

watch(
  () => store.state.isPostDM,
  () => {
    axios
      .get("/profile/print_follow", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        const { followersResult, followingsResult } = res.data;
        AllUserList.value.Follower = followersResult;
        AllUserList.value.Following = followingsResult;
        SetSelect("팔로워");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  { immediate: true }
);
</script>

<template>
  <div class="MainScreen">
    <div class="blur" @click="store.commit('Switch_isPostDM', '')"></div>
    <div class="PostDMBox">
      <p>피드 보내기</p>
      <div class="selectType">
        <p :class="{ select: Select == '팔로워' }" @click="SetSelect('팔로워'), (UserSelect = '')">팔로워</p>
        <p :class="{ select: Select == '팔로잉' }" @click="SetSelect('팔로잉'), (UserSelect = '')">팔로잉</p>
      </div>
      <div class="userList">
        <div class="User" v-for="User of UserList" :key="User" @click="UserSelect = User.User_ID">
          <img :class="{ select: UserSelect == User.User_ID }" :src="User.Profile_Img" />
          <p :class="{ select: UserSelect == User.User_ID }">{{ User.User_ID }}</p>
        </div>
      </div>
      <div :class="{ noneSelect: UserSelect == '' }" class="sendBtn" @click="sendMessage">전송하기</div>
      <!-- 내용물 추가 -->
    </div>
  </div>
</template>

<style scoped>
.sendBtn {
  margin-top: 1rem;
  width: 100%;
  padding: 10px 20px;
  background-color: #42e44d;
  color: white;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0.7;
}
.sendBtn:hover {
  opacity: 1;
}
.noneSelect {
  display: none !important;
}
.userList {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 50%;
}
.userList > .User {
  flex: 1 1 calc(33.33% - 10px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.userList > .User > img {
  width: 50px;
  border-radius: 50%;
}
.userList > .User > img.select {
  outline: 3px solid #42e44d; /* 원하는 색상과 두께 설정 */
}
.userList > .User > p {
  font-size: 11px;
  font-weight: normal;
  text-align: center;
}
.userList > .User > p.select {
  font-weight: bolder;
}
.PostDMBox > p {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.PostDMBox > .selectType {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  border-bottom: 1px solid #a0a0a0;
}
.PostDMBox > .selectType > p.select {
  color: #000000 !important;
}
.PostDMBox > .selectType > p {
  margin-right: 20px;
  cursor: pointer;
  color: #a0a0a0;
}

.PostDMBox > .selectType > p:hover {
  color: #393939;
}
.MainScreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; /* 최상위 레이어로 설정 */
}

.PostDMBox {
  background-color: white;
  max-width: 50%; /* 원하는 크기 지정 */
  max-height: 80%;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  z-index: 1000; /* 블러 위로 오도록 */
  overflow-y: auto;
}

.blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 블러 효과를 위해 투명도 추가 */
  backdrop-filter: blur(10px); /* 블러 처리 */
  z-index: 999;
}
</style>
