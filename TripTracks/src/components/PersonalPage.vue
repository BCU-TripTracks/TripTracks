<script setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import headervue from "../components/header.vue";
import FeedArticle from "../assets/img/FeedArticle.png";
import ProfileImage from "../assets/img/ProfileImage.png";

const store = useStore();
const router = useRouter();
const isLogin = computed(() => store.state.isLogin);
const write_Button_Click = () => {
  router.push({ name: "Write" });
};
</script>

<template>
  <div class="Profile_Container">
    <div class="Profile_Photo">
      <li>
        <img src="../assets/img/ProfileImage.png" alt="" class="profile" />
      </li>
    </div>
    <ul>
      <li class="ID">
        coiincidence99 <button>팔로우</button><button>메시지</button>
      </li>
      <li>
        <span>게시물 9 </span>팔로워 123 <span></span><span>팔로잉 123</span>
      </li>
      <li>안녕하세요.</li>
    </ul>
  </div>
  <div class="Feed_Container">
    <div class="Feed_discription">
      <ul>
        <li>게시물 9</li>
        <li>태그장소 17</li>
      </ul>
    </div>
    <div class="Feed">
      <div class="Article">
        <ul>
          <li v-for="i in Array(12)">
            <router-link :to="{ name: 'FeedDetail' }">
              <img :src="FeedArticle" alt="" class="FeedArticle" />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Profile_Container {
  display: flex;
  margin-top: 50px;
  margin-right: auto;
}
.profile {
  width: 120px;
  height: 120px;
  margin-right: 30px;
}

.Feed {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  columns: 4;
  column-gap: auto;
  align-items: center;
  margin-top: 10px;
}
.Feed_Container {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.Feed_discription {
  color: #585858;
  font: 18px "arial";
  font-weight: 500;
  border-bottom: 1px solid #707070;
  margin-bottom: 10px;
  padding: 10px;
}

.Feed_discription > ul {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  list-style-type: none;
  padding: 0;
  margin: 10px;
}
.Feed > .Article {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  columns: 4;
  column-gap: auto;
  align-items: center;
}

.Feed > .Article > ul > li {
  list-style-type: none;
  width: 280px;
  margin: 0px;
  padding-right: 5px;
}

li {
  padding-right: 20px;
  list-style-type: none;
  margin-top: 10px;
}
.ID {
  font: bold 30px arial;
}
.Feed > .Article > ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.Feed > .Article > ul > li > a {
  text-decoration: none;
}

.Feed > .Article > ul > li > a:hover {
  opacity: 0.7;
}

.Feed > .Article > ul > li > a > .FeedArticle {
  width: 100%;
  height: auto;
}

button {
  margin: 5px;
  padding: 0.3rem 0.7rem;
  background-color: black;
  color: white;
  border-radius: 10px;
}

button:hover {
  opacity: 0.7;
  cursor: pointer;
}
</style>
