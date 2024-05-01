<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "../axios";

import messagevue from "../components/message.vue";
import FeedArticle from "../assets/img/FeedArticle.png";

const route = useRoute();
const store = useStore();
const user_ID = computed(() => store.state.user_ID);
const isFollow = ref(false);
const profile_info = ref({});
const followers = ref([]);
const followings = ref([]);
const follower = ref(0);
const following = ref(0);

const target_userID = route.params.userID;
axios
  .get(`/profile/search/${target_userID}`)
  .then((res) => {
    console.log(res.data);
    const result = res.data;
    profile_info.value = result.userInfoResult;
    followers.value = result.follower;
    followings.value = result.following;
    follower.value = result.follower_Len;
    following.value = result.following_Len;
    for (const element of result.followers) {
      if (element === user_ID) {
        isFollow.value = true;
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });

const click_Msg = () => {
  store.commit("Switch_isMsg");
};

const Follow = () => {
  store.commit("Switch_isFollow");
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
        @{{ profile_info.User_ID }} - <span> {{ profile_info.User_Name }} </span>
        <button
          @click="Follow"
          :style="{
            backgroundColor: isFollow ? '#EFEFEF' : 'black',
            borderColor: isFollow ? '#F2F2F2' : 'black',
            color: isFollow ? 'black' : 'white',
          }"
        >
          {{ isFollow ? "팔로잉" : "팔로우" }}
        </button>
        <button class="message" @click="click_Msg">메시지</button>
      </li>
      <li>
        <span>게시물 9 </span>팔로워 {{ follower }} <span></span><span>팔로잉 {{ following }}</span>
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
  padding: 0.5rem 0.9rem;
  background-color: black;
  color: white;
  border-radius: 10px;
  border: none;
}

button:hover {
  opacity: 0.7;
  cursor: pointer;
}
</style>
