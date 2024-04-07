<script setup>
import { ref } from "vue";

const selectedMenu = ref("messages");
</script>
<template>
  <div class="messagecontainer">
    <div class="chatmenu">
      <span class="messagebox">메시지함</span>
      <span class="follow">팔로우</span>
      <span class="following">팔로잉</span>
      <span class="request">요청</span>
    </div>
    <div class="searchbox">
      <textarea class="search">검색<span class="find">돋</span></textarea>
    </div>
    <div class="chatbox" v-for="i in Array(10)">
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
  background-color: white;
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 350px;
  margin: 10px;
  padding-right: 15px;
  border: 1px solid black;
  border-radius: 10px;
  overflow-x: hidden;
}
.chatmenu {
  display: flex;
  justify-content: space-evenly;
}
.messagebox {
  margin: 15px 5px 15px 5px;
  font: 15px "arial";
}
.messagebox:hover {
  opacity: 0.7;
  font-weight: bold;
}
.follow {
  margin: 15px 5px 15px 5px;
  font: 15px "arial";
}
.follow:hover {
  opacity: 0.7;
  font-weight: bold;
}
.following {
  margin: 15px 5px 15px 5px;
  font: 15px "arial";
}
.following:hover {
  opacity: 0.7;
  font-weight: bold;
}
.request {
  margin: 15px 5px 15px 5px;
  font: 15px "arial";
}
.request:hover {
  opacity: 0.7;
  font-weight: bold;
}
.searchbox {
  width: 340px;
}
.search {
  margin-left: 5px;
  margin-right: 5px;
  width: 340px;
}
.find {
  margin-left: auto;
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
</style>
