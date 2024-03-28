<script setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import ProfileImage from "../assets/img/ProfileImage.png";
import Feed_image from "../assets/img/Feed_image.png";
import headervue from "../components/header.vue";

const store = useStore();
const router = useRouter();
const isLogin = computed(() => store.state.isLogin);
const write_Button_Click = () => {
  router.push({ name: "Write" });
};

watch(isLogin, () => {
  if (!isLogin.value) {
    console.log("로그인 실패");
    router.push({ name: "Login" });
  }
});
</script>

<template>
  <headervue />
  <div class="button_container"></div>
  <div class="grid-container">
    <button @click="write_Button_Click()">글쓰기</button>
    <div class="feedSlider">
      <div class="grid-article" v-for="i in Array(12)">
        <a href="FeedDetail.vue">
          <img src="../assets/img/Feed_image.png" alt="" class="Eximage" />
        </a>
        <ul>
          <li class="profile-container">
            <img src="../assets/img/ProfileImage.png" alt="" class="profile" />
            유연우<span class="likecomment">좋 댓 공</span>
          </li>
          <li class="title">올 겨울 스키장은 강촌 엘리시안 리조트</li>
          <li class="description">짜릿한 겨울을 액티비티를 즐겨보세요</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.grid-container {
  padding: 0 10px 10px 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow-x: hidden;
}

.grid-container > .feedSlider {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  columns: 4;
  column-gap: auto;
  align-items: center;
}

.grid-article {
  margin-bottom: 0;
  width: calc(25% - 20px);
  text-align: center;
  border: none;
  margin: 5px;
}

.Eximage {
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 320px;
  height: 400px;
  border: none;
}

li {
  list-style-type: none;
}
.title {
  text-align: left;
  text-indent: 10px;
  font-size: large;
  font-weight: bold;
}
.description {
  text-align: left;
  text-indent: 10px;
  font-size: small;
  margin-bottom: 20px;
}
.likecomment {
  text-align: right;
  margin-left: auto;
}
.profile-container {
  display: flex;
  padding: 10px;
  align-items: center;
  font-size: larger;
}

.profile {
  margin-top: 10px;
  height: 35px;
  width: 35px;
  margin-right: 10px;
}

button {
  float: inline-end;
  margin: 30px;
  margin-left: auto;
  padding: 5px 0 5px 0;
  background-color: black;
  color: white;
  padding: 0.5rem 1rem;
}
.write {
  color: white;
  font: bold 18px arial;
  text-decoration: none;
  margin-bottom: 5px;
}
</style>
