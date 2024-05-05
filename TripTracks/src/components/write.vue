<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import axios from "../axios";

const store = useStore();

const tag = ref("");
const results = ref([]);
const image = ref(null);
const imagePreview = ref("");
const caption = ref("");

const printAndClear = () => {
  results.value.push(tag.value);
  tag.value = "";
};

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image")) {
    image.value = file;
    // FileReader를 사용하여 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    alert("이미지 파일을 선택해주세요.");
  }
}
const sendWrite = () => {
  console.log(image.value);
  axios
    .post("/api/ddd", {
      Post_Caption: caption.value,
      tags: results.value,
      imgs: image.value,
    })
    .then((result) => {
      console.log(result);
    });
};

const deleteTag = (index) => {
  results.value.splice(index, 1);
};
</script>

<template>
  <div class="writepot">
    <div class="writecontainer">
      <span class="newarticle">새 게시물 작성</span>
      <div class="articlebox">
        <div class="photobox">
          <label for="chooseFile" class="selectphoto" v-if="!imagePreview">
            👉 CLICK 👈
          </label>
          <input
            type="file"
            id="chooseFile"
            name="chooseFile"
            accept="image/*"
            class="inputphoto"
            style="display: none"
            @change="handleFileUpload"
          />
          <div v-if="imagePreview" class="photobox">
            <img
              :src="imagePreview"
              alt="Image preview"
              style="width: 500px; height: 580px"
            />
          </div>
        </div>
        <div class="commentbox">
          <div class="userinfo">
            <span>
              <img
                src="../assets/img/ProfileImage.png"
                alt=""
                class="profile"
              />
            </span>
            <span class="userid">coiincidence99</span>
          </div>
          <div>
            <!-- 태그 공간을 따로 빼지 말고 본문 내용에서 입력하게 할지 고민 -->
            <span class="tagbox">
              <input
                class="inputtag"
                type="text"
                v-model="tag"
                @keyup.enter="printAndClear"
                placeholder="이 곳에 Tag를 추가하세요."
              />
            </span>
            <div id="result" class="tagresult">
              <span v-for="(tag, index) in results" :key="index" class="tag">
                {{ tag }}
                <button class="deleteTagButton" @click="deleteTag(index)">
                  x
                </button>
              </span>
            </div>
          </div>
          <div class="articlecomment">
            <textarea
              class="comment"
              type="text"
              placeholder="글내용을 입력하세요."
              v-model="caption"
            />
            <div class="buttonzone">
              <input
                type="file"
                id="chooseFile"
                name="chooseFile"
                accept="image/*"
                class="inputphoto"
                style="display: none"
                @change="handleFileUpload"
              />
              <button class="complete" @click="sendWrite()">완료</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="blur" @click="store.commit('Switch_isWrite')"></div>
  </div>
</template>
<style scoped>
.blur {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
}
.writepot {
  display: flex;
  justify-content: center;
}
.writecontainer {
  position: absolute;
  background-color: white;
  margin: auto;
  margin-top: 70px;
  z-index: 5;
  border: 1px black;
  width: 810px;
  height: 650px;
  border-radius: 20px;
}
.newarticle {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #eaeaea;
  font-size: medium;
  font-weight: 700;
  padding-top: 10px;
  padding-bottom: 10px;
}
.articlebox {
  display: flex;
  float: left;
}
.photobox {
  position: relative;
  z-index: 2;
  display: flex;
  width: 500px;
}
.formbox {
  display: flex;
  background-color: white;
  width: 500px;
}
.selectphoto {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2em;
}
.commentbox {
  display: inline-block;
  width: 300px;
  border-left: 1px solid #eaeaea;
  height: 580px;
}
.articlecomment {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
.userid {
  margin-right: 5px;
  font-weight: bold;
}
.comment {
  display: flex;
  width: 300px;
  height: 350px;
  padding-top: 10px;
  margin-top: 1em;
  margin-bottom: 5px;
  border-top: 1px solid #eaeaea;
  border-left: none;
  border-right: none;
  border-bottom: none;
  text-indent: 10px;
  resize: none;
}
.userinfo {
  display: flex;
  align-items: center;
}
.profile {
  height: 30px;
  width: 30px;
  margin-top: 10px;
  margin-right: 10px;
  padding-left: 5px;
}
.tagbox {
  display: flex;
  margin-top: 5px;
  width: 300px;
  height: 30px;
}
.inputtag {
  width: 300px;
  margin-right: auto;
  text-indent: 10px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #eaeaea;
}
.tagresult {
  height: 2.6em;
  margin-left: 10px;
  max-height: 100px;
  overflow-y: auto;
}
.complete {
  display: flex;
  background-color: black;
  color: white;
  margin-left: auto;
  margin-right: 10px;
  margin-top: 4.5em;
  padding: 5px;
  border-radius: 10px;
}
.complete:hover {
  opacity: 0.7;
  cursor: pointer;
}
.selectbutton {
  display: flex;
  justify-content: center;
}
label {
  cursor: pointer;
  font-size: 1em;
}
.inputphoto {
  visibility: hidden;
}
.buttonzone {
  display: flex;
}
</style>
