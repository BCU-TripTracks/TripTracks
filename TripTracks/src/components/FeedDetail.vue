<script setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";

import ProfileImage from "../assets/img/ProfileImage.png";
import Feed_image from "../assets/img/Feed_image.png";
import left from "../assets/img/left.png";
import right from "../assets/img/right.png";
import headervue from "../components/header.vue";

const commentText = ref("");
const comments = ref([]);

// 댓글 작성 함수
const postComment = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const formattedTimestamp = `${year}년 ${month}월 ${date}일 ${hours}:${minutes}`;
  comments.value.push({
    content: commentText.value,
    timestamp: formattedTimestamp,
  });
  // 댓글 입력 창 초기화
  commentText.value = "";
};
</script>

<template>
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
        <button class="follow">팔로우</button
        ><button class="message">메시지</button>
      </div>
    </div>
    <!-- 슬라이드 기능 추가 예정
    <div class="section">
      <input type="radio" name="slide" id="slide01" checked />
      <input type="radio" name="slide" id="slide02" />
      <input type="radio" name="slide" id="slide03" />
    </div> -->
    <div class="slidewrap">
      <ul class="slidelist">
        <li>
          <a>
            <label for="slide03" class="left"></label>
            <img :src="Feed_image" alt="" />
            <label for="slide02" class="right"></label>
          </a>
        </li>
        <li>
          <a>
            <label for="slide01" class="left"></label>
            <img :src="Feed_image" alt="" />
            <label for="slide03" class="right"></label>
          </a>
        </li>
        <li>
          <a>
            <label for="slide02" class="left"></label>
            <img :src="Feed_image" alt="" />
            <label for="slide01" class="right"></label>
          </a>
        </li>
      </ul>
    </div>

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
          <span class="content">고우십니다^^.</span>
        </div>
        <div class="sub">
          <span class="uploadtime">2024년 3월 30일</span>
          <span class="reply">답글쓰기</span>
        </div>
      </div>
    </div>

    <div v-for="(comment, index) in comments" :key="index" class="commentbox">
      <span>
        <img src="../assets/img/ProfileImage.png" alt="" class="profile" />
      </span>
      <div class="commentdetail">
        <div>
          <span class="username">유연우</span>
          <span class="content">{{ comment.content }}</span>
        </div>
        <div class="sub">
          <span class="uploadtime">{{ comment.timestamp }}</span>
          <span class="reply">답글쓰기</span>
        </div>
      </div>
    </div>
    <div class="commentcontainer">
      <input
        class="comment"
        type="text"
        placeholder="댓글을 입력하세요."
        v-model="commentText"
        @keyup.enter="postComment"
      />
      <button class="commenting" @click="postComment">입력</button>
    </div>
  </div>
</template>

<style scoped>
.feedinfobox {
  display: flex;
  margin-top: 30px;
  margin-bottom: 10px;
}
.feedinfobox:hover {
  opacity: 1;
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
.follow:hover {
  opacity: 0.7;
  cursor: pointer;
}
.message:hover {
  opacity: 0.7;
  cursor: pointer;
}
.commenting:hover {
  opacity: 0.7;
  cursor: pointer;
}
.slidelist {
  white-space: nowrap;
  list-style: none;
}
.decription {
  width: 600px;
  height: 800px;
}
.decription > li {
  list-style-type: none;
  margin-top: 10px;
}
.place {
  margin-top: 50px;
  border-bottom: 1px;
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
  margin-bottom: 10px;
  padding-left: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #efefef;
}
.username {
  margin-right: 5px;
  font-weight: bold;
}
.comment {
  margin: 5px 0 5px 0;
  width: 600px;
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
.list-item {
  margin-top: 10px;
}
.makerdrop > li {
  list-style-type: none;
}
.commentcontainer {
  display: flex;
}
.section {
  display: none;
}
.section .slidewrap {
  width: 600px;
  height: auto;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.section .slidelist {
  white-space: nowrap;
  font-size: 0;
}
.section .slidelist > li {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  transition: all 0.5s;
}
.section .slidelist > li > a {
  display: block;
  position: relative;
}
.section .slidelist > li > a img {
  width: 100%;
}
.section .slidelist label {
  position: absolute;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  padding: 50px;
  cursor: pointer;
}
.section [id="slide01"]:checked ~ .slidewrap .slidelist > li {
  transform: translate(0%);
}
.section [id="slide02"]:checked ~ .slidewrap .slidelist > li {
  transform: translate(-100%);
}
.section [id="slide03"]:checked ~ .slidewrap .slidelist > li {
  transform: translate(-200%);
}
</style>
