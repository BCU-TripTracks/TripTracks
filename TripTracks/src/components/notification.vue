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
                <span class="username">작성자</span>
              </div>
              <div class="sub">
                <span class="uploadtime">2024년 3월 30일</span>
              </div>
            </div>
            <div class="userbutton">
              <button>팔로우</button><button>메시지</button>
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
</style>
