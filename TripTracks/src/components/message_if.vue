<script setup>
import { ref } from "vue";

const selectedMenu = ref("messages");
</script>
<template>
  <div class="messagecontainer">
    <div v-if="selectedMenu === 'messages'">
      <!-- 메시지함 화면 -->
      <div class="chatmenu">
        <span class="messagebox">메시지함</span>
        <span class="follow">팔로우</span>
        <span class="following">팔로잉</span>
        <span class="request">요청</span>
      </div>
      <div class="chatbox" v-for="i in Array(7)">
        <span>
          <img src="../assets/img/ProfileImage.png" alt="" class="profile" />
        </span>
        <div class="userlistbox">
          <div>
            <span class="roomname">coiincidence99</span>
          </div>
          <div class="sub">
            <span class="chatcontent">zz ㅈㄴ 어려워</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="selectedMenu === 'follow'">
      <span class="messagebox">메시지함</span>
      <span class="follow">팔로우</span>
      <span class="following">팔로잉</span>
      <span class="request">요청</span>
    </div>
    <div class="searchbox">
      <textarea class="search">검색</textarea>
    </div>
    <div class="chatbox" v-for="i in Array(6)">
      <span>
        <img src="../assets/img/ProfileImage.png" alt="" class="profile" />
      </span>
      <div class="userlistbox">
        <div>
          <span class="userID">coiincidence99</span>
        </div>
        <div class="sub">
          <span class="username">유연우</span>
        </div>
      </div>
    </div>

    <!-- <div v-else-if="selectedMenu === 'following'">
      <span class="messagebox">메시지함</span>
      <span class="follow">팔로우</span>
      <span class="following">팔로잉</span>
      <span class="request">요청</span>
    </div> -->
    <div class="searchbox">
      <textarea class="search">검색</textarea>
    </div>
    <div class="chatbox" v-for="i in Array(6)">
      <span>
        <img src="../assets/img/ProfileImage.png" alt="" class="profile" />
      </span>
      <div class="userlistbox">
        <div>
          <span class="userID">coiincidence99</span>
        </div>
        <div class="sub">
          <span class="username">유연우</span>
        </div>
      </div>
    </div>
    <!-- <div v-else-if="selectedMenu === 'request'">
      <span class="messagebox">메시지함</span>
      <span class="follow">팔로우</span>
      <span class="following">팔로잉</span>
      <span class="request">요청</span>
    </div> -->
    <div class="searchbox">
      <textarea class="search">검색</textarea>
    </div>
    <div class="chatbox" v-for="i in Array(6)">
      <span>
        <img src="../assets/img/ProfileImage.png" alt="" class="profile" />
      </span>
      <div class="userlistbox">
        <div>
          <span class="userID">coiincidence99</span>
        </div>
        <div class="sub">
          <span class="username">유연우</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.messagecontainer {
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 350px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 10px;
}
.chatmenu {
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #707070;
}
.messagebox {
  margin: 15px 5px 15px 5px;
  font: 18px "arial";
}
.messagebox:hover {
  opacity: 0.7;
  font-size: larger;
}
.follow {
  margin: 15px 5px 15px 5px;
  font: 18px "arial";
}
.follow:hover {
  opacity: 0.7;
  font-size: larger;
}
.following {
  margin: 15px 5px 15px 5px;
  font: 18px "arial";
}
.following:hover {
  opacity: 0.7;
  font-size: larger;
}
.request {
  margin: 15px 5px 15px 5px;
  font: 18px "arial";
}
.request:hover {
  opacity: 0.7;

  font-size: larger;
}
.searchbox {
  width: 340px;
}
.search {
  margin-left: 5px;
  margin-right: 5px;
  width: 340px;
}
.chatbox {
  display: flex;
  margin: 5px 5px;
}
.chatbox:hover {
  opacity: 0.7;
}
.profile {
  height: 40px;
  width: 40px;
  margin-left: 5px;
  margin-right: 10px;
}
.userID {
  font-weight: bold;
}
.sub {
  font-size: smaller;
}
.roomname {
  font-weight: bold;
}
.chatcontent {
  font-size: small;
}
</style>
