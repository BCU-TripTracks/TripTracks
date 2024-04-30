<script setup>
import { watch, ref } from "vue";
import { useRouter } from "vue-router";

import axios from "../axios";

const router = useRouter();

const input_UserID = ref("");
const input_Email = ref("");
const input_Pwd = ref("");
const input_Pwd_Ch = ref("");
const input_Name = ref("");

const email_check = ref({ EmailFormat: true, EmailAlread: true });
const userID_check = ref({ UserIDAlread: true });

watch(input_Email, (newValue) => {
  // 여기서 newValue는 업데이트된 inputEmail 값이고, oldValue는 이전 값입니다.

  // 이메일 유효성 검사 로직을 여기에 추가할 수 있습니다.
  // 예: 간단한 정규 표현식을 사용한 이메일 형식 검증
  if (input_Email.value == "") return (email_check.value = { EmailAlread: true, EmailFormat: true });
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(newValue)) {
    email_check.value.EmailFormat = true;
    axios
      .post("/users/check_email", { user_Email: input_Email.value })
      .then((req) => {
        const { success } = req.data;
        if (success == true) {
          email_check.value.EmailAlread = true;
        }
      })
      .catch((err) => {
        const result = err.response.data;
        if (result.err_Code == "EmailAlreadyExists") email_check.value.EmailAlread = false;
      });
  } else {
    email_check.value.EmailFormat = false;
  }
});
watch(input_UserID, (newValue) => {
  if (input_UserID.value == "") return (userID_check.value = { UserIDAlread: true });
  email_check.value.EmailFormat = true;
  axios
    .post("/users/check_UserID", { user_ID: input_UserID.value })
    .then((req) => {
      if (req.data.success == true) email_check.value.UserIDAlread = true;
    })
    .catch((err) => {
      const result = err.response.data;
      if (result.err_Code == "UserIDAlreadyExists") email_check.value.UserIDAlread = false;
    });
});

const singup_Button_Click = () => {
  if (input_Pwd.value !== input_Pwd_Ch.value) return console.log("비밀번호 불일치");
  if (!email_check.value.user_ID_Alread) return console("아이디 중복");
  if (!email_check.value.EmailAlread || !email_check.value.EmailFormat) return console("이메일 인증 문제");
  axios
    .post("/users/signup", {
      user_ID: input_UserID.value,
      user_Email: input_Email.value,
      user_Passwd: input_Pwd.value,
      user_Name: input_Name.value,
    })
    .then((req) => {
      const result = req.data;
      console.log(result);
      if (result.message === "success") {
        localStorage.setItem("user_ID", input_UserID.value);
        return router.push({ name: "Step2" });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <div class="Infobox">
    <input class="Email" type="text" placeholder="User ID" v-model="input_UserID" />
    <p v-if="!userID_check.UserIDAlread">이미 존재한 아이디입니다.</p>
    <input class="Email" type="email" placeholder="Email" v-model="input_Email" />
    <p v-if="!email_check.EmailFormat">이메일 형식이 아닙니다.</p>
    <p v-if="!email_check.EmailAlread">중복된 이메일 입니다.</p>
    <input class="Passwd mt20" type="pwd" placeholder="Password" v-model="input_Pwd" />
    <input class="PasswdCh mb20" type="pwdcheck" placeholder="Password Check" v-model="input_Pwd_Ch" />
    <p v-if="input_Pwd != input_Pwd_Ch">비밀번호가 일치하지 않습니다.</p>
    <input class="Name mb20" type="name" placeholder="Name" v-model="input_Name" />
    <button @click="singup_Button_Click()">Next Level</button>
  </div>
</template>

<style scoped>
.Infobox {
  width: 30%;
  display: flex;
  flex-direction: column;
}
.Infobox > p {
  color: red;
}
.Infobox > input {
  height: 4rem;
  border-radius: 7px;
  padding: 0 1rem;
  border: 1px var(--login-input-border-color) solid;
  background-color: var(--login-input-background-color);
  color: white;
}
.Infobox > .Passwd {
  border-bottom: 1px var(--login-input-border-color) solid;
  border-radius: 7px 7px 0 0;
}
.Infobox > .PasswdCh {
  border-radius: 0 0 7px 7px;
}
.Infobox > button {
  height: 4rem;
  border-radius: 7px;
  background-color: var(--login-button-background-color);
  border: none;
  color: var(--login-text-color);
  font-size: 23px;
}
</style>
