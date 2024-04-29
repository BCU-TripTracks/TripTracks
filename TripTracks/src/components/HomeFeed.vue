<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import ProfileImage from "../assets/img/ProfileImage.png";
import Feed_image from "../assets/img/Feed_image.png";
import messageIcon from "../assets/img/messageIcon.png";

const router = useRouter();
const store = useStore();

const isWrite = computed(() => store.state.isWrite);

const write_Button_Click = () => {
  // router.push({ name: "Write" });
  store.commit("Switch_isWrite");
};
</script>

<template>
  <div class="grid-container">
    <button @click="write_Button_Click()">글쓰기</button>
    <div class="feedSlider">
      <div class="grid-article" v-for="i in Array(16)">
        <router-link :to="{ name: 'FeedDetail' }"
          ><img src="../assets/img/Feed_image.png" alt="" class="Eximage"
        /></router-link>
        <ul>
          <li class="profile-container">
            <img src="../assets/img/ProfileImage.png" alt="" class="profile" />
            유연우
            <img src="../assets/img/like.png" alt="" class="like" />
            <img src="../assets/img/save.png" alt="" class="save" />
          </li>
          <li class="title">올 겨울 스키장은 강촌 엘리시안 리조트</li>
          <li class="description">짜릿한 겨울을 액티비티를 즐겨보세요</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
  width: calc(25% - 20px);
  text-align: center;
  border: none;
  margin: 5px;
}

.Eximage {
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 100%;
  border: none;
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

.Eximage:hover {
  opacity: 0.7;
}

.likecomment {
  text-align: right;
  margin-left: auto;
}

.title {
  text-align: left;
  font-size: large;
  font-weight: bold;
}
.description {
  text-align: left;
  font-size: small;
  margin-bottom: 20px;
}

li {
  list-style-type: none;
}

button {
  margin: 30px;
  margin-left: auto;
  padding: 5px 0 5px 0;
  background-color: black;
  color: white;
  padding: 0.5rem 1rem;
}
button:hover {
  opacity: 0.7;
  cursor: pointer;
}
.like {
  height: 25px;
  margin-right: 10px;
  margin-left: auto;
}
.save {
  height: 25px;
}
</style>
