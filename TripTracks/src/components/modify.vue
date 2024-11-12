<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import axios from "../axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
// Vuex 상태 관리 및 기타 변수들 설정

const route = useRoute();
const router = useRouter();
const store = useStore();
const User_ID = computed(() => store.state.User_ID);
const Profile_Img = computed(() => store.state.Profile_Img);

const tag = ref("");
const Title = ref("");
const caption = ref("");

// 이미지 관련 변수들
const Input_Img = ref(null);
const _img = ref([]); // 새로 추가할 이미지 파일들
const imagePreview = ref([]); // 미리보기 이미지
const results = ref([]); // 태그 목록

// 기존 게시물 데이터 불러오기
const Post_Data = ref(null); // 게시물 데이터를 담을 변수

// 컴포넌트가 마운트될 때 게시물 데이터 로드
onMounted(async () => {
  try {
    const { data } = await axios.get(
      "/Feeds/Post_detail/" + route.params.Post_ID,
      {
        withCredentials: true,
      }
    );
    console.log(data); // 데이터 구조 확인

    Post_Data.value = data;
    Title.value = data.post.Post_Title; // 제목 접근 경로 수정
    caption.value = data.post.Post_Caption; // 내용 접근 경로 수정
    results.value = [...data.tags]; // 태그 배열 할당
    imagePreview.value = data.post.Image_Srcs; // 이미지 경로 수정
  } catch (error) {
    console.error("게시물 불러오기 오류:", error);
  }
});

// 태그 추가 함수
const printAndClear = () => {
  results.value.push(tag.value);
  tag.value = "";
};

// 태그 삭제 함수
const deleteTag = (index) => {
  results.value.splice(index, 1);
};

// 파일 업로드 처리 함수
function handleFileUpload(event) {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    _img.value.push(file);
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onload = () => {
        imagePreview.value.push(reader.result); // 이미지 배열에 추가
      };
      reader.readAsDataURL(file);
    } else {
      alert("이미지 파일을 선택해주세요.");
    }
  }
}

// 게시물 수정 요청 코드
const sendModify = () => {
  const postId = route.params.Post_ID || Post_Data.value?.Post_ID;
  console.log("Post ID:", postId); // Post_ID 확인용 콘솔 출력

  if (!postId) {
    console.error("Post_ID가 정의되지 않았습니다.");
    return;
  }

  const formData = new FormData();
  formData.append("postId", postId);
  formData.append("Title", Title.value);
  formData.append("comment", caption.value);
  formData.append("tag", results.value);

  // 새 이미지 추가
  _img.value.forEach((img) => {
    formData.append("newImages", img);
  });

  // 기존 이미지 정보 추가 (JSON 문자열로 변환)
  formData.append("existingImages", JSON.stringify(imagePreview.value));

  axios
    .post("/feeds/Post_modify", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((result) => {
      if (result.status === 200) {
        store.commit("Switch_isModify");
        location.reload();
      }
      console.log("수정 완료:", result);
    })
    .catch((error) => {
      console.error("수정 중 오류 발생:", error);
    });
};

const showLocateBox = ref(false);
const toggleLocateBox = () => {
  showLocateBox.value = !showLocateBox.value;
};

// 태그와 위치 드롭다운 관련 상태와 토글 함수
const showTagBox = ref(false);
const toggleTagBox = () => {
  showTagBox.value = !showTagBox.value;
};

const modules = [Pagination, Navigation];
</script>

<template>
  <div class="writepot">
    <div class="writecontainer">
      <span class="newarticle">게시물 수정</span>
      <div class="articlebox">
        <div class="photobox">
          <!-- <label
            for="chooseFile"
            class="selectphoto"
            v-if="imagePreview.length === 0"
          >
            👉 CLICK 👈
          </label> -->
          <input
            type="file"
            id="chooseFile"
            name="chooseFile"
            accept="image/*"
            class="inputphoto"
            style="display: none"
            ref="Input_Img"
            multiple
            @change="handleFileUpload"
          />
          <div v-if="imagePreview && imagePreview.length > 0" class="photobox">
            <Swiper
              :spaceBetween="10"
              :slidesPerView="1"
              :pagination="true"
              :navigation="true"
              :modules="modules"
              class="mySwiper"
            >
              <SwiperSlide v-for="(img, index) in imagePreview" :key="index">
                <img
                  :src="img"
                  alt="Image preview"
                  style="width: 500px; height: 580px"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div class="commentbox" v-if="Post_Data">
          <div class="userinfo">
            <span>
              <img :src="Post_Data.post.Profile_Img" alt="" class="profile" />
            </span>
            <span class="userid">{{ User_ID }}</span>
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
              add tag
              <img src="../assets/img/dropdown.png" alt="" class="down-icon" />
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
              add location
              <img src="../assets/img/dropdown.png" alt="" class="down-icon" />
            </button>
            <div v-if="showLocateBox" class="locatebox">
              <div id="map"></div>
            </div>
            <div class="buttonzone">
              <button class="complete" @click="sendModify">완료</button>
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
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
}
.writepot {
  display: flex;
  justify-content: center;
  z-index: 2;
}
.writecontainer {
  position: absolute;
  background-color: white;
  margin: auto;
  margin-top: 70px;
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
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-pagination-bullet-active {
  opacity: var(--swiper-pagination-bullet-opacity, 1);
  color: #eaeaea;
}
.swiper-pagination-bullet-active::after {
  opacity: var(--swiper-pagination-bullet-opacity, 1);
  color: #eaeaea;
  display: none;
}

.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: var(--swiper-navigation-top-offset, 50%);
  width: calc(var(--swiper-navigation-size) / 44 * 27);
  height: var(--swiper-navigation-size);
  margin-top: calc(0px - (var(--swiper-navigation-size) / 2));
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #eaeaea;
}
:root {
  --swiper-navigation-size: 30px !important;
  --swiper-theme-color: #eaeaea !important;
}
</style>
