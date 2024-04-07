<script setup>
import ProfileImage from "../assets/img/ProfileImage.png";
</script>

<template>
  <div class="signcontainer">
    <div class="signbox">
      <span class="sign">알림</span>
    </div>
    <div>
      <span>새로운 알림</span>
      <div>
        <div class="tlqkf" v-for="i in Array(12)">
          <div class="feedinfobox">
            <span>
              <img
                src="../assets/img/ProfileImage.png"
                alt=""
                class="profile"
              />
            </span>
            <div class="commentdetail">
              <div>
                <span class="username">작성자</span><span>뭐 시발아</span>
              </div>
              <div class="sub">
                <span class="uploadtime">2024년 3월 30일</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.signcontainer {
  margin: 50px;
}
.username {
  margin-right: 5px;
  font-weight: bold;
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
