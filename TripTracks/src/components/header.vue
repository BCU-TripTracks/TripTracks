<script setup>
import ProfileImage from "../assets/img/ProfileImage.png";
</script>

<template>
  <ul class="header_upper_menu">
    <li>마이페이지</li>
    <li>알림</li>
    <li>로그인</li>
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
      <h1><router-link :to="{ name: 'Home' }"> TripTracks </router-link></h1>
    </div>
    <div class="header_menu">
      <ul>
        <li class="header_menu_list">
          <img
            src="../assets/img/ProfileImage.png"
            alt=""
            class="profile"
          /><router-link :to="{ name: 'homeP' }">프로필 </router-link>
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
  height: 80px;
  justify-content: space-around;
}

.logo {
  font-size: x-large;
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

.profile {
  margin-top: 10px;
  height: 35px;
  width: 35px;
  margin-right: 10px;
}
.header_upper_menu {
  display: flex;
  justify-content: flex-end;
  list-style-type: none;
  text-decoration: none;
  flex-direction: row;
  flex-wrap: wrap;
  padding-right: 40px;
}

.header_upper_menu > li {
  margin: 10px;
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
  padding: 10px;
  margin: 10px;
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
