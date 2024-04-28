<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const tag = ref("");
const results = ref([]);

const printAndClear = () => {
  results.value.push(tag.value);
  tag.value = "";
};

// const loadFile = (event) => {
//   const file = event.target.files[0];
//   const name = file.name;
//   // 이미지 파일 처리 로직 추가
//   const reader = new FileReader();
//   reader.onload = (e) => {
//     const imageSrc = e.target.result;
//     showImage(imageSrc);
//   };
//   reader.readAsDataURL(file);
// };

// const showImage = (src) => {
//   const image = document.createElement("img");
//   image.src = src;
//   image.style.width = "70%";
//   image.style.height = "70%";
//   image.style.visibility = "visible"; // 이미지를 보이게 함
//   image.style.objectFit = "contain";

//   const container = document.getElementById("image-show");
//   container.innerHTML = ""; // 이미지 컨테이너를 비움
//   container.appendChild(image);
// };
</script>

<template>
  <div class="writepot">
    <div class="writecontainer">
      <span class="newarticle">새 게시물 작성</span>
      <div class="articlebox">
        <div class="photobox">
          <form method="post" enctype="multipart/form-data" class="formbox">
            <label for="chooseFile" class="selectphoto"> 👉 CLICK 👈 </label>
            <input
              type="file"
              id="chooseFile"
              name="chooseFile"
              accept="image/*"
              onchange="loadFile(this)"
            />
          </form>
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
          <div class="tagcontainer">
            <span class="tagbox">
              <input
                class="inputtag"
                type="text"
                v-model="tag"
                @keyup.enter="printAndClear"
                placeholder="이 곳에 Tag를 입력하세요."
              />
            </span>
            <span id="result" class="tagresult"
              >Tag : {{ results.join(", ") }}</span
            >
          </div>
          <div class="articlecomment">
            <textarea
              class="comment"
              type="text"
              placeholder="글내용을 입력하세요."
            />
          </div>
          <button class="complete">완료</button>
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
  flex-direction: center;
  float: left;
  width: 62.5%;
}
.photobox {
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
  justify-content: flex-end;
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
  flex-direction: row;
}
.userid {
  margin-right: 5px;
  font-weight: bold;
}
.comment {
  display: flex;
  width: 300px;
  height: 408px;
  padding-top: 10px;
  margin-top: 5px;
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
.tagcontainer {
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
  margin-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.complete {
  display: flex;
  background-color: black;
  color: white;
  margin-left: auto;
  margin-right: 10px;
  margin-top: 2em;
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

/* 못생긴 기존 input 숨기기 */
#chooseFile {
  visibility: hidden;
}
</style>
