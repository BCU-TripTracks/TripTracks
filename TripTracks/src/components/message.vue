<script setup>
import { onMounted, ref, computed, inject } from "vue";
import { useStore } from "vuex";
import socket from "../socket";
import axios from "../axios";
// import { io } from "socket.io-client";

const store = useStore();
// const socket = io("http://localhost:6502");
// const socket = computed(() => store.state.socket);
// const socket = inject("socket");
const selectedMenu = ref("messages");
const selectedchat = ref("message");

const commentText = ref("");
const comments = ref([]);

const followers = ref([]);
const followings = ref([]);

// 댓글 작성 함수
const postComment = () => {
  // 입력된 댓글을 comments 배열에 추가
  comments.value.push(commentText.value);

  socket.emit("sendComment", commentText.value);
  // store.dispatch("socket_io", commentText.value);
  // 댓글 입력 창 초기화
  commentText.value = "";
};

onMounted(() => {
  axios.get("/dms/followList").then((result) => {
    console.log(result.data);
    if (!result.data.success) {
      return console.log(`${result.data.msg}`);
    }
    const userInfoMap = result.data.userInfoMap;
    followers.value = userInfoMap.follower;
    followings.value = userInfoMap.following;
  });
});
</script>

<template>
  <div class="messagecontainer">
    <div class="chatmenu">
      <span class="messagebox" @click="selectedMenu = 'messages'">메시지함</span>
      <span class="follow" @click="selectedMenu = 'follow'">팔로우</span>
      <span class="following" @click="selectedMenu = 'following'">팔로잉</span>
      <span class="request" @click="selectedMenu = 'request'">요청</span>
    </div>
    <div class="chatcontainer">
      <!-- 메시지함 -->
      <div v-if="selectedMenu === 'messages'">
        <div class="chatbox" v-for="i in Array(7)" @click="selectedMenu = 'message'">
          <span>
            <img src="../assets/img/ProfileImage2.png" alt="" class="profile" />
          </span>
          <div class="chatroom">
            <div>
              <span class="userID">Juuho.0</span>
            </div>
            <div class="sub">
              <span class="chatcontent">뷰 너무 어렵습니다.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="chatroom" v-if="selectedMenu === 'message'">
        <div class="roomname">
          <span>
            <img src="../assets/img/ProfileImage2.png" alt="" class="profile" />
          </span>
          <div class="commentdetail">
            <div>
              <span class="userID">Juuho.0</span>
            </div>
            <div class="sub">
              <span class="uesrname">오준호</span>
            </div>
          </div>
        </div>
        <div class="conversation">
          <div class="friend">
            <span class="friendchat">진짜 쉬워</span>
          </div>
          <div class="me">
            <span class="mychat">뷰 너무 어렵습니다.</span>
          </div>
          <div v-for="(comment, index) in comments" :key="index" class="commentbox">
            <div class="commentdetail">
              <div class="me">
                <span class="mychat">{{ comment }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="textcontainer">
          <input
            class="text"
            type="text"
            placeholder="채팅을 입력하세요"
            v-model="commentText"
            @keyup.enter="postComment"
          />
          <button class="send" @click="postComment">보내기</button>
        </div>
      </div>
      <!-- 팔로우 -->
      <div v-if="selectedMenu === 'follow'">
        <div class="searchbox">
          <input type="text" class="search" placeholder=" 친구를 찾아보세요." />
        </div>
        <div class="chatbox" v-for="follower in followers">
          <span>
            <img :src="follower.Profile_Img" alt="" class="profile" />
          </span>
          <div class="chatroom">
            <div>
              <span class="userID">{{ follower.User_ID }}</span>
            </div>
            <div class="sub">
              <span class="username">{{ follower.User_Name }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 팔로잉 -->
      <div v-if="selectedMenu === 'following'">
        <div class="searchbox">
          <input type="text" class="search" placeholder=" 친구를 찾아보세요." />
        </div>
        <div class="chatbox" v-for="following in followings">
          <span>
            <img :src="following.Profile_Img" alt="" class="profile" />
          </span>
          <div class="userlistbox">
            <div>
              <span class="userID">{{ following.User_Email }}</span>
            </div>
            <div class="sub">
              <span class="username">{{ following.User_Name }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 요청 -->
      <div v-if="selectedMenu === 'request'">
        <div class="chatbox" v-for="i in Array(6)">
          <span>
            <img src="../assets/img/ProfileImage3.png" alt="" class="profile" />
          </span>
          <div class="userlistbox">
            <div><span class="userID">mxoxxo</span><span> 님이 메시지를 요청하였습니다.</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.messagecontainer {
  z-index: 10;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 350px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 10px;
  overflow-x: hidden;
  position: fixed;
  bottom: 4rem;
  right: 4rem;
}
.chatmenu {
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #efefef;
}
.messagebox {
  margin: 15px 5px 15px 5px;
  font: 15px "arial";
}
.messagebox:hover {
  opacity: 0.7;
  font-weight: bold;
  cursor: pointer;
}
.follow {
  margin: 15px 5px 15px 5px;
  font: 15px "arial";
}
.follow:hover {
  opacity: 0.7;
  font-weight: bold;
  cursor: pointer;
}
.following {
  margin: 15px 5px 15px 5px;
  font: 15px "arial";
}
.following:hover {
  opacity: 0.7;
  font-weight: bold;
  cursor: pointer;
}
.request {
  margin: 15px 5px 15px 5px;
  font: 15px "arial";
}
.request:hover {
  opacity: 0.7;
  font-weight: bold;
  cursor: pointer;
}
.searchbox {
  width: 340px;
}
.search {
  margin-left: 5px;
  margin-right: 5px;
  width: 340px;
  height: 20px;
}
.chatbox {
  display: flex;
  margin: 5px 5px;
  cursor: pointer;
}
.chatbox:hover {
  opacity: 0.7;
}
.profile {
  height: 40px;
  width: 40px;
  margin-left: 5px;
  margin-right: 10px;
  border-radius: 30;
}
.userID {
  font-weight: bold;
}
.sub {
  font-size: smaller;
  align-items: center;
}
.chatcontainer {
  height: 100%;
}
.chatroom {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.conversation {
  height: 250px;
  overflow-y: scroll;
}
.roomname {
  display: flex;
  align-items: center;
  padding: 5px 0 5px 0;
  border-bottom: 1px solid #efefef;
  border-width: thin;
}
.chatcontent {
  font-size: small;
}
.room {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
}
.chat {
  border-radius: 10px;
  background-color: #efefef;
  padding: 5px;
}
.friend {
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
}
.friendchat {
  display: flex;
  align-items: center;
  margin: 5px 0 5px 5px;
  border-radius: 10px;
  padding: 7px;
  background-color: #efefef;
  font-size: 14px;
}
.me {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
}
.mychat {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  border-radius: 10px;
  background-color: #0080ff;
  color: white;
  padding: 7px;
  margin-right: 5px;
  font-size: 14px;
}
.textcontainer {
  display: flex;
  justify-content: center;
  padding: 3px;
  border-top: 1px solid #efefef;
}
.text {
  width: 85%;
  margin-right: 3px;
}
.send {
  width: 15%;
  background-color: #0080ff;
  border-radius: 10px;
  color: white;
  padding: 5px;
  border: none;
}
</style>
