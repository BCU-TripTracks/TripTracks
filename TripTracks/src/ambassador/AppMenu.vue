<script setup>
// import logo from "../assets/img/SLT_Logo.svg";
import than_sign from "../assets/img/than_sign.svg";
import homeimg from "../assets/img/icons8-home.png";
import feed from "../assets/img/icons8-feed.png";
import { computed } from "vue";
import { useStore } from "vuex";
import axios from "../axios";
import socket from "../socket";

const store = useStore();
const User_ID = computed(() => store.state.User_ID);
const sideMenu = computed(() => store.state.SideMenu);

const toggleSubMenu = (menuName) => {
  store.commit("toggleSubMenu", menuName);
};

const logout = () => {
  if (User_ID.value) {
    socket.emit("logout", User_ID.value);
    console.log("로그아웃 성공");
  } else {
    console.error("User_ID is not defined.");
  }
  axios.get("/users/logout", { withCredentials: true }).then((res) => {
    store.dispatch("checkSession");
  });
};
</script>

<template>
  <div class="sidebar p30 m0 r10 dropshadow">
    <router-link :to="{ name: 'HomeFeed' }" class="logo">
      <h1 class="m10">TripTracks</h1>
    </router-link>
    <ul class="menu">
      <router-link :to="{ name: 'AmbassadorHome' }" class="router-link">
        <li class="as-menuli">
          <img :src="homeimg" alt="" class="colored-svg" />
          <div class="submenu">Home</div>
        </li>
      </router-link>
      <router-link :to="{ name: 'AmbassadorWrite' }" class="router-link">
        <li class="as-menuli">
          <img :src="feed" alt="" class="colored-svg" />
          <div class="submenu">Write</div>
        </li>
      </router-link>
      <li v-for="menu in sideMenu" :key="menu.name">
        <!-- 조건부 렌더링을 위해 v-if 추가 -->
        <div class="menu-item" @click="toggleSubMenu(menu.name)">
          <!-- <img v-if="menu.subMenu" :src="homeimg" alt="" class="colored-svg" /> -->
          <div>{{ menu.name }}</div>
        </div>
        <!-- isSubMenu가 true일 때만 서브 메뉴를 표시 -->
        <ul class="submenu" v-if="menu.subMenu && menu.isSubMenu"></ul>
      </li>
    </ul>
    <li class="logout" @click="logout()">로그아웃</li>
  </div>
</template>

<style lang="scss" scoped>
* {
  user-select: none;
}
.router-link {
  text-decoration: none;
  color: var(--text-light);
}
.as-menuli {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.as-menuli img {
  width: 32px;
}
.colored-svg {
  fill: var(--text-light);
  width: 10px;
}
.sidebar {
  background-color: var(--background-dark);
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.sidebar > .logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.sidebar > .logo > img {
  width: 50px;
}
.sidebar > .logo > h1 {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-light);
}
.sidebar > .menu {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-light);
}

.sidebar > .menu > li > .menu-item {
  display: flex;
  align-items: center; /* 요소들을 수직 중앙 정렬 */
  gap: 1rem; /* 요소 사이의 간격 */
  user-select: none;
}
.sidebar > .menu > li > .submenu {
  list-style: none;
  font-size: 16px;
  font-weight: 400;
  color: var(--text-light);
  display: flex;
  margin-top: 0.5rem;
  flex-direction: column;
  gap: 0.5rem;
}
.close {
  display: none;
}
.sidebar > .menu > li > .submenu > li {
  margin-left: 1.6rem;
}
.logout {
  color: var(--text-light);
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  padding: 10px;
  border-top: 1px solid var(--text-light);
  list-style: none;
}
</style>
