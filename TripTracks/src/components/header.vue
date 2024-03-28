<template>
  <ul class="header_upper_menu">
    <li>마이페이지</li>
    <li>알림</li>
    <li>로그인</li>
  </ul>
  <div class="header">
    <div class="header_menu">
      <ul>
        <li><a href="#">팔로잉</a></li>
        <li><a href="#">탐색</a></li>
        <li><a href="#" style="font-weight: 700">인기</a></li>
      </ul>
    </div>
    <div class="logo">
      <h1>TripTracks</h1>
      <!-- <router-link :to="{ name: 'Home' }" > TripTracks </router-link> -->
    </div>
    <div class="header_menu">
      <div class="header_upper_container"></div>
      <ul>
        <li><a href="#">홈</a></li>
        <li><a href="#">SHOP</a></li>
        <li><a href="#">EVENT</a></li>
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
element.style {
  font-family: "Perpetua";
  text-decoration-line: none;
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
  padding: 0;
  margin: 10px;
}

.header_menu > ul > li > a {
  padding: 10px;
  text-decoration: none;
  color: #585858;
  font: 18px "arial";
  font-weight: 500;
  border-bottom: 1px solid #707070;
}
</style>
