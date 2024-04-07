<script setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import ProfileImage from "../assets/img/ProfileImage.png";
import Feed_image from "../assets/img/Feed_image.png";
import headervue from "../components/header.vue";
</script>

<template>
  <headervue />
  <div class="feedcontainer">
    <div class="discription">
      <div class="feedinfobox">
        <span>
          <img src="../assets/img/ProfileImage.png" alt="" class="profile" />
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
      <!--슬라이드 기능 추가 예정-->
      <img :src="Feed_image" alt="" class="feedarticle" />
      <ul class="makerdrop">
        <li class="list-item">스키장은 역시 강촌 엘리시안!</li>
      </ul>
      <ul class="place">
        <li>태그된 장소 2곳</li>
        <li>
          <img :src="Feed_image" alt="" />
          <img :src="Feed_image" alt="" />
        </li>
      </ul>
      <ul class="makerdrop">
        <li class="LCS">좋 댓 공</li>
        <li class="LC">좋아요 4,722 댓글 115</li>
      </ul>
      <div class="commentbox">
        <span>
          <img src="../assets/img/ProfileImage.png" alt="" class="profile" />
        </span>
        <div class="commentdetail">
          <div>
            <span class="username">유연우</span>
            <span>고우십니다^^.</span>
          </div>
          <div class="sub">
            <span class="uploadtime">2024년 3월 30일</span>
            <span class="reply">답글쓰기</span>
          </div>
        </div>
      </div>
      <textarea class="comment">댓글 입력창</textarea>
    </div>
  </div>
</template>

<style scoped>
.feedcontainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 20px;
}
.feedinfobox {
  display: flex;
  margin-bottom: 10px;
}
.userbutton {
  display: flex;
  align-items: center;
  margin-left: auto;
}
button {
  margin-right: auto;
  background-color: black;
  color: white;
  margin: 3px;
  padding: 0.5rem 0.7rem;
  border-radius: 10px;
}
button:hover {
  opacity: 0.7;
}
.feedarticle {
  max-width: 100%;
  max-height: 100%;
  width: 600px;
  height: auto;
}

.decription {
  width: 600px;
  height: 800px;
}
.decription > li {
  list-style-type: none;
}

.place {
  margin-top: 50px;
}
.place > li {
  list-style-type: none;
}
.place > li > img {
  height: 90px;
  width: 70px;
  margin: 3px;
}
.LCS {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  padding-right: 5px;
}

.LC {
  margin-bottom: 15px;
  padding-left: 5px;
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

.commentbox {
  display: flex;
}

.sub {
  font-size: smaller;
}
.uploadtime {
  margin-right: 5px;
}
.makerdrop > li {
  list-style-type: none;
}
</style>
