<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "../axios";
import dropdown from "../assets/img/dropdown.png";

const store = useStore();
const User_ID = computed(() => store.state.User_ID);

const tag = ref("");
const results = ref([]);
const image = ref(null);
const imagePreview = ref("");
const Title = ref("");
const caption = ref("");

const Input_Img = ref(null);
const _img = ref(null);

const printAndClear = () => {
  results.value.push(tag.value);
  tag.value = "";
};

function handleFileUpload(event) {
  const file = event.target.files[0];
  _img.value = Input_Img.value.files[0];
  if (file && file.type.startsWith("image")) {
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.value = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    alert("이미지 파일을 선택해주세요.");
  }
}
const sendModify = () => {
  console.log(_img.value);
  axios
    .post(
      "/Feeds/Post_Modify",
      {
        comment: caption.value,
        Title: Title.value,
        postId: postId,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    .then((result) => {
      if (result.status == 200) {
        store.commit("Switch_isModify");
      }
      console.log(result);
    })
    .catch((result) => {
      console.log("오류발생");
      console.log(result);
    });
};

const deleteTag = (index) => {
  results.value.splice(index, 1);
};

// 드롭다운 관련 상태
const showTagBox = ref(false);
const showLocateBox = ref(false);

const toggleTagBox = () => {
  showTagBox.value = !showTagBox.value;
};

const toggleLocateBox = () => {
  showLocateBox.value = !showLocateBox.value;
};
</script>

<template>
  <div class="writepot">
    <div class="writecontainer">
      <span class="newarticle">게시글 수정</span>
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
            ref="Input_Img"
            @change="handleFileUpload"
          />
          <div v-if="imagePreview" class="photobox">
            <div>
              <img
                :src="imagePreview"
                alt="Image preview"
                style="width: 500px; height: 580px"
              />
            </div>
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
            <span class="userid"> {{ User_ID }} </span>
          </div>
          <div>
            <span>
              <input
                class="Title"
                type="text"
                v-model="Title"
                placeholder="제목을 입력하세요."
              />
            </span>
          </div>
          <div class="articlecomment">
            <textarea
              class="Content"
              type="text"
              placeholder="글내용을 입력하세요."
              v-model="caption"
            />
            <button class="dropdown-button" @click="toggleTagBox">
              add tag<img
                src="../assets/img/dropdown.png"
                alt=""
                class="down-icon"
              />
            </button>
            <div v-if="showTagBox" class="tagbox">
              <input
                class="inputtag"
                type="text"
                v-model="tag"
                @keyup.enter="printAndClear"
                placeholder="이 곳에서 Tag를 추가해보세요."
              />
              <div id="result" class="tagresult">
                <span v-for="(tag, index) in results" :key="index" class="tag">
                  {{ tag }}
                  <button class="deleteTagButton" @click="deleteTag(index)">
                    x
                  </button>
                </span>
              </div>
            </div>
            <button class="dropdown-button" @click="toggleLocateBox">
              add location<img
                src="../assets/img/dropdown.png"
                alt=""
                class="down-icon"
              />
            </button>
            <div v-if="showLocateBox" class="locatebox">
              <div id="map"></div>
            </div>

            <!--             
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
            </div> -->
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
    <div class="blur" @click="store.commit('Switch_isModify')"></div>
  </div>
</template>
<style scoped>
.blur {
  position: fixed;
  left: 0;
  top: 0;
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
  z-index: 5;
  border: 1px black;
  height: 650px;
  border-radius: 20px;
  overflow-y: scroll;
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
  height: 550px;
}
.locatetag {
  position: absolute;
  bottom: -18px;
  right: 9px;
  z-index: 3;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px;
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
  overflow-y: scroll;
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
.Content {
  width: 300px;
  height: 380px;
  padding-top: 10px;
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
.dropdown-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-top: none;
  border-left: none;
  border-right: none;
  border: 1px solid #eaeaea;
  padding: 0.5em 0;
  text-indent: 5px;
}
.down-icon {
  padding-right: 0.5em;
}
.tagbox {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  width: 300px;
}
.inputtag {
  width: 300px;
  margin-right: auto;
  text-indent: 5px;
  padding: 0.5em 0;
  border-top: 1px solid #eaeaea;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #eaeaea;
}
.inputlocate {
  width: 300px;
  margin-right: auto;
  text-indent: 5px;
  padding: 0.5em 0;
  border-top: 1px solid #eaeaea;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #eaeaea;
}
#map {
  height: 300px;
  width: 100%;
}
.Title {
  display: flex;
  width: 300px;
  height: 25px;
  border: none;
  text-indent: 10px;
  resize: none;
}
.tagresult {
  margin-left: 10px;
  overflow-y: scroll;
}
.complete {
  display: flex;
  background-color: black;
  color: white;
  margin-left: auto;
  margin-right: 10px;
  margin-top: 7%;
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
