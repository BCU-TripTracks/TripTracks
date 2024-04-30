<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import axios from "../axios";

var Top_Tags = ref([]);
const router = useRouter();
const user_ID = localStorage.getItem("user_ID");

axios
  .get("/users/top_tags")
  .then((response) => {
    // 응답 처리
    const taglist = response.data.TopTags;
    Top_Tags.value = taglist.map((tag) => ({ tag: tag, isAct: false }));
    response.data.TopTags;
    console.log(Top_Tags.value);
  })
  .catch((error) => {
    // 에러 처리
    console.log(error);
  });

const singup_Button_Click = () => {
  const check_tag = Top_Tags.value.filter((tagObj) => tagObj.isAct).map((tagObj) => tagObj.tag);
  console.log(userEmail);
  axios
    .post("/users/TagSetup", {
      user_ID: user_ID,
      Tags: check_tag,
    })
    .then((req) => {
      console.log(req);
      const result = req.data;
      if (result.Result) {
        router.push({ name: "Login" });
      } else {
        alert("회원가입 성공");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <div class="Infobox">
    <div class="tagsZone">
      <div
        v-for="tag in Top_Tags"
        class="tag"
        :style="{ backgroundColor: tag.isAct ? 'green' : 'gray' }"
        @click="tag.isAct = !tag.isAct"
      >
        {{ tag.tag }}
      </div>
    </div>
    <button @click="singup_Button_Click()">Next Level</button>
  </div>
</template>

<style scoped>
.Infobox {
  width: 30%;
  display: flex;
  flex-direction: column;
}
.Infobox > .tagsZone {
  width: 100%;
  margin-bottom: 1rem;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.Infobox > .tagsZone > .tag {
  padding: 0.5rem 1rem;
  background-color: blue;
  border-radius: 20px;
  margin: 0.5rem;
  text-align: center;
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
