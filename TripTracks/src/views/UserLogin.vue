<script setup>
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";

import login_image from "../assets/img/login_image.png";

const store = useStore();
const input_Email = ref("");
const input_Pwd = ref("");

const Singin_Button_Click = () => {
  if (!input_Email || !input_Pwd) return console.log("뒤지기 싫으면 입력 똑디하라");
  axios
    .post(
      "http://triptracks.co.kr/api/users/login",
      {
        user_Email: input_Email.value,
        user_Passwd: input_Pwd.value,
      },
      { withCredentials: true }
    )
    .then((req) => {
      console.log(req.data);
      store.dispatch("checkSession");
    })
    .catch((err) => {
      console.log(err);
    });
};

// 이미지 높이를 계산하는 함수
const getRandomHeight = () => {
  const minHeight = 80; // 최소 높이 (%)
  const maxHeight = 150; // 최대 높이 (%)
  // Math.random()은 0과 1 사이의 랜덤한 수를 반환하므로, 이를 사용하여 minHeight와 maxHeight 사이의 값을 계산
  return Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight) + "%";
};

// 이미지 높이를 저장할 배열
const imageHeights = ref(
  Array(20)
    .fill("")
    .map(() => getRandomHeight())
);
</script>

<template>
  <div class="container">
    <div class="postBox">
      <div class="postSlider">
        <div class="feedBox" v-for="(height, i) in imageHeights" :key="i">
          <img :src="login_image" alt="" :style="{ height: height }" />
          <p><span v-for="j in i"> 이건 게시글의 문구들입니당</span></p>
        </div>
      </div>
      <!-- <img :src="login_image" alt="" /> -->
    </div>
    <div class="loginBox">
      <h1 class="appName">TripTracks</h1>
      <input class="Email" type="email" placeholder="Email" v-model="input_Email" />
      <input class="Passwd" type="password" placeholder="Password" v-model="input_Pwd" />
      <!--<input type="submit" value="Sign in" />-->
      <button @click="Singin_Button_Click()" class="Signin-button">Sign in</button>
      <div class="bottom">
        <router-link class="links" :to="{ name: 'Home' }">Forgot password?</router-link>
        <router-link class="links" :to="{ name: 'Step1' }">Sign up</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(-100%);
  }
}
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--login-background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.container > .postBox {
  position: relative;
  max-width: 35%;
  max-height: 80%;
  padding: 1rem;
  overflow: hidden;
}

.container > .postBox::before,
.container > .postBox::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  z-index: 2;
  pointer-events: none; /* 이 요소 위의 상호작용 방지 */
}

.container > .postBox::before {
  top: 0;
  height: 10rem; /* 상단 투명 효과의 높이 */
  background: var(--login-background-top-blur);
}

.container > .postBox::after {
  bottom: 0;
  height: 10rem; /* 하단 투명 효과의 높이 */
  background: var(--login-background-bottom-blur);
}

.container > .postBox > .postSlider {
  column-count: 3; /* 원하는 열의 수 */
  animation: scroll 15s linear infinite;
} /* 반복되는 feedBox를 처리하기 위해, 두 번째 인스턴스의 스타일을 지정 */

.container > .postBox > .postSlider > .feedBox {
  width: 100%;
  background-color: var(--login-feed-background-color);
  margin-bottom: 1rem;
  border-radius: 10px;
  padding: 1rem 0.1rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  break-inside: avoid; /* 이 요소는 열 내에서 나뉘어지지 않도록 함 */
}
.postSlider > .feedBox > img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 0.5rem;
}

.container > .loginBox {
  display: flex;
  width: 30%;
  justify-content: flex-start;
  flex-direction: column;
}
.container > .loginBox > * {
  margin: 0.5rem 0;
}

.loginBox > .appName {
  color: var(--login-text-color);
  font-size: 50px;
}
.loginBox > .appName > .pageSub {
  font-size: 20px;
}

.loginBox > input {
  height: 4rem;
  font-size: 1rem;
  border: 1px var(--login-input-border-color) solid;
  background-color: var(--login-input-background-color);
  padding: 0 1rem;
  color: white;
}
.loginBox > .Email {
  margin-bottom: 0;
  border-radius: 7.5px 7.5px 0 0;
  border-bottom: 1px;
}
.loginBox > .Passwd {
  margin-top: 0;
  border-radius: 0 0 7.5px 7.5px;
}
.loginBox > .Signin-button {
  height: 3.5rem;
  border: none;
  background-color: var(--login-button-background-color);
  color: var(--login-text-color);
  font-size: 23px;
  margin-top: 1.5rem;
  border-radius: 5px;
}
.loginBox > .bottom {
  margin-top: 0;
  display: flex;
  justify-content: space-between;
}
.loginBox > .bottom > .links {
  color: var(--login-links-color);
  text-decoration-line: underline;
}
</style>
