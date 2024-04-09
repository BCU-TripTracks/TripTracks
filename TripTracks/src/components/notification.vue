<script setup>
import ProfileImage from "../assets/img/ProfileImage.png";
</script>

<template>
  <div class="signcontainer">
    <span class="sign">새로운 알림</span>
    <div class="notification">
      <div class="notibox" v-for="i in Array(20)">
        <div class="feedinfobox">
          <span>
            <img src="../assets/img/ProfileImage.png" alt="" class="profile" />
          </span>
          <div class="commentdetail">
            <div>
              <span class="username"
                >오준호님이 회원님을 팔로우하기 시작했습니다.</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signcontainer {
  max-height: 500px;
  border: 1px solid black;
  overflow-y: scroll;
  background: white;
  position: absolute;
  right: 10rem;
  padding: 1rem;
  border-radius: 10px;
  top: 2.6rem;
  z-index: 2;
}
.feedinfobox {
  display: flex;
  flex-direction: row;
  margin: 10px;
  padding-right: 15px;
  background-color: white;
  border-radius: 10px;
}
.feedinfobox:hover {
  opacity: 0.7;
}
.sign {
  display: flex;
  text-indent: 5px;
}

.comment {
  margin-top: 10px;
}

.profile {
  height: 40px;
  width: 40px;
  margin-right: 10px;
}
</style>
