<script setup>
import login_image from "../assets/img/login_image.png";
import Logo from "../assets/img/Logo.png";
</script>

<template>
  <div class="container">
    <div class="imgbox">
      <img :src="login_image" alt="" />
    </div>
    <div class="loginbox">
      <a href="UserLogin.vue"><img :src="Logo" alt="" /></a>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <input type="submit" value="Sign in" />
      <a>Forgot password?</a>
      <a href="Signup.vue">Sign up</a>
    </div>
  </div>
</template>

<style>
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
}
.container > * {
  margin: 10px;
}

.imgbox > img {
  width: 550px;
}

.loginbox {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}

.loginbox > * {
  margin: 10px 0;
}
.loginbox > input {
  font-size: 16px;
  height: 40px;
  border: #4a5056;
  border-radius: 5px;
  margin: 1px;
}
.loginbox > input[type="submit"] {
  font-size: 16px;
  padding: 10px;
  background-color: #316cf4;
  border: none;
  border-radius: 5px;
  margin: 25px 0 10px 0;
}
</style>
