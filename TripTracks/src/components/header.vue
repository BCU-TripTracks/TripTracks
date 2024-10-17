<script setup>
import axios from "../axios";
import ProfileImage from "../assets/img/ProfileImage.png";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const User_ID = computed(() => store.state.User_ID);
const User_Rule = ref(0);

const click_Noti = () => {
  store.commit("Switch_isNoti");
};

const click_Logout = () => {
  console.log("로그아웃실행");
  axios
    .get("/users/logout", { withCredentials: true })
    .then((res) => {
      store.dispatch("checkSession");
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  axios
    .get("/users/check_Rule", { withCredentials: true })
    .then((req) => {
      console.log(req.data);
      User_Rule.value = req.data.Rule;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<template>
  <div class="subscription_ambassador" v-show="User_Rule === 0">
    <p>당신도 할 수 있다 앰버서더</p>
    <router-link :to="{ name: 'Subscription' }"> 바로 신청하기</router-link>
  </div>
  <ul class="header_upper_menu">
    <li>
      <router-link :to="{ name: 'Ambassador' }" class="mypage">
        앰버서더
      </router-link>
    </li>
    <!-- <li @click="click_Noti" class="noti">알림</li> -->
    <li>
      <router-link :to="{ name: 'myPage' }" class="mypage">
        마이페이지
      </router-link>
    </li>
    <li @click="click_Logout()" class="Logout">로그아웃</li>
  </ul>
  <div class="header">
    <div class="header_menu">
      <ul>
        <!-- <li class="header_menu_list">
          <router-link :to="{ name: 'HomeFeed' }"> 홈 </router-link>
        </li> -->
        <li class="header_menu_list">
          <router-link :to="{ name: 'followingtab' }">팔로잉 </router-link>
        </li>
        <li class="header_menu_list">
          <router-link :to="{ name: 'searcingtab' }">탐색 </router-link>
        </li>
        <li class="header_menu_list">
          <router-link :to="{ name: 'popularitytab' }">인기 </router-link>
        </li>
      </ul>
    </div>
    <div class="logo">
      <h1>
        <router-link :to="{ name: 'HomeFeed' }"> TripTracks </router-link>
      </h1>
    </div>
    <div class="header_menu">
      <ul>
        <li class="header_menu_list">
          <router-link :to="{ name: 'DirectMessage' }"
            >DirectMessage
          </router-link>
        </li>

        <li class="header_menu_list" v-if="User_ID">
          <router-link
            :to="{ name: 'PersonalPage', params: { User_ID: User_ID } }"
            >프로필
          </router-link>
        </li>
        <li class="header_menu_list">
          <router-link :to="{ name: 'planner' }">Planner </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.subscription_ambassador {
  display: flex;
  justify-content: center;
  padding: 0.25rem 0;

  background-color: #e0ffe3;
  border-bottom: 1px solid #80cbae;
  color: #333;
  font-weight: 600;
}
.subscription_ambassador > a {
  color: #004d40;
  margin-left: 0.5rem;
}
.header {
  display: flex;
  width: 100%;
  height: 70px;
  justify-content: space-around;
}
.noti:hover {
  cursor: pointer;
}
.Logout:hover {
  cursor: pointer;
}
.logo {
  font-size: x-large;
  margin-left: 60px;
}
.header .logo a {
  font-weight: bold;
  font-family: "Perpetua";
  text-decoration-line: none;
  color: black;
}
element.style {
  font-family: "Perpetua";
  text-decoration-line: none;
}
.mypage {
  text-decoration: none;
  color: black;
}
.profile {
  margin-top: 10px;
  height: 35px;
  width: 35px;
  margin-right: 10px;
}
.header_upper_menu {
  display: flex;
  list-style: none;
  justify-content: end;
  padding: 1rem 9%;
}
.header_upper_menu > * {
  margin-left: 1rem;
}

.hot {
  font-weight: 700;
}
.header_menu {
  display: flex;
  align-self: flex-end;
  flex-direction: column;
}
.header_menu > ul {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  list-style-type: none;
  padding: 0 10px 10px 10px;
  color: #585858;
  font: 18px "arial";
  font-weight: 500;
  border-bottom: 1px solid #707070;
}
.header_menu .header_menu_list {
  padding: 0 10px 0 10px;
}
.header_menu > ul > li > a {
  padding: 10px;
  text-decoration: none;
  color: #585858;
  font: 18px "arial";
  font-weight: 500;
}
</style>
