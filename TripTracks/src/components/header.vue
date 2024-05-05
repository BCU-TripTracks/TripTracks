<script setup>
import ProfileImage from "../assets/img/ProfileImage.png";
import { useStore } from "vuex";
const store = useStore();

const click_Noti = () => {
  store.commit("Switch_isNoti");
};

const click_Logout = () => {
  store.commit("Switch_isLogin");
};
</script>

<template>
  <ul class="header_upper_menu">
    <li @click="click_Noti" class="noti">알림</li>
    <li>
      <router-link :to="{ name: 'myPage' }" class="mypage">
        마이페이지
      </router-link>
    </li>
    <li @click="click_Logout" class="Logout">로그아웃</li>
  </ul>
  <div class="header">
    <div class="header_menu">
      <ul>
        <li class="header_menu_list">팔로잉</li>
        <li class="header_menu_list">탐색</li>
        <li class="header_menu_list">인기</li>
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
          <router-link :to="{ name: 'PersonalPage' }">프로필 </router-link>
        </li>
        <li class="header_menu_list">SHOP</li>
        <li class="header_menu_list">EVENT</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
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
