<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

import ProfileImage from "../assets/img/ProfileImage.png";
import Feed_image from "../assets/img/Feed_image.png";
import FeedArticle from "../assets/img/FeedArticle.png";
import like from "../assets/img/like.png";
import save from "../assets/img/save.png";
import comment from "../assets/img/comment.png";
import axios from "../axios";
import { useRouter } from "vue-router";
import KaKaoMap from "./KaKaoMap.vue";
import planning from "./planning.vue";

const router = useRouter();
const store = useStore();

const selectedMenu = ref("saved");
const selectedSub = ref("heart"); // 11.25 현재 주석된 코드
const tag = ref("");
const results = ref([]);
const image = ref(null);
const imagePreview = ref(ProfileImage);
const isMsg = computed(() => store.state.isMsg);
const User_Pwd = ref("");
const Input_Img = ref(null);
const _img = ref(null);
const click_Msg = () => {
  store.commit("Switch_isMsg");
};
const Profile_Info = ref([]);
const Saved_Data = ref([]); // 저장된 게시물 데이터를 위한 변수 추가
// 저장된 게시물 데이터를 불러오는 함수 (POST 요청 사용)
const loadSavedPosts = () => {
  axios
    .post(
      "/Feeds/Ambass_Save_List",
      { User_ID: store.state.User_ID },
      { withCredentials: true }
    )
    .then((res) => {
      console.log("Saved Posts:", res.data);
      Saved_Data.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// saved 메뉴 클릭 시 저장된 게시물 로드
const selectSaved = () => {
  selectedMenu.value = "saved";
  loadSavedPosts();
};

// 마운트 됐을 때
onMounted(() => {
  selectedMenu.value = "saved";
  loadSavedPosts(); // 초기 화면에서 저장된 게시물 데이터를 로드
  axios
    .get("/profile/profile_load", { withCredentials: true })
    .then((res) => {
      Profile_Info.value = res.data;
      imagePreview.value = res.data.Profile_Img;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<template>
  <div class="container">
    <div class="submenu">
      <span class="saved" @click="selectSaved">Saved</span>
      <span class="planning" @click="selectedMenu = 'planning'">Planning</span>
      <span class="myplan" @click="selectedMenu = 'myplan'">My Plan</span>
    </div>
    <div v-if="selectedMenu === 'saved'" class="sub">
      <div class="feedSlider">
        <div
          class="grid-article"
          v-for="Post in Saved_Data"
          :key="Post.Post_ID"
        >
          <router-link
            :to="{ name: 'FeedDetail', params: { Post_ID: Post.Post_ID } }"
          >
            <img :src="Post.Image_Src" alt="" class="Eximage" />
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="selectedMenu === 'planning'" class="map">
      <planning @save-plan="savePlan" />
    </div>

    <div v-if="selectedMenu === 'myplan'" class="sub">
      <div v-for="(plan, index) in myPlanData" :key="index">
        <h3>{{ plan.title }}</h3>
        <ul>
          <li v-for="(day, dayIndex) in plan.days" :key="dayIndex">
            <strong>{{ day.day }}</strong>
            <ul>
              <li v-for="(place, placeIndex) in day.places" :key="placeIndex">
                {{ place.place_name }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-top: 10px;
  margin-right: auto;
}
.submenu {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 20px 4.5em;
  width: 60em;
  border: 1px solid #eaeaea;
  border-radius: 20px 20px 0 0;
}
.profilecontainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 20px;
}
.commentdetail {
  display: flex;
  flex-direction: row;
}
.profilebox {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.photobox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1em 2em 2em 2em;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.buttonbox {
  display: flex;
  flex-direction: row;
  margin-bottom: 2em;
}
.photochange {
  display: flex;
  background-color: black;
  color: white;
}
.caption {
  display: flex;
  width: 300px;
  height: 200px;
  padding-top: 10px;
  margin-bottom: 5px;
  text-indent: 10px;
  resize: none;
}
.selectphoto {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
label {
  cursor: pointer;
  font-size: 1em;
  padding: 0.5em 1em;
}
.infocontainer {
  display: flex;
  flex-direction: column;
  margin: 2em;
}
.userID {
  margin-left: 1em;
}
.userName {
  margin-left: 1em;
}
.userPassword {
  margin-left: 1em;
  width: 200px;
}
.pwdbox {
  display: flex;
}
.pwdbutton {
  display: flex;
  background-color: black;
  color: white;
  padding: 0.3em 0.5em;
  margin-left: 0.5em;
}
.captionbox {
  margin: 1em;
}
.captionchange {
  display: flex;
  background-color: black;
  color: white;
  padding: 0.5em 0.7em;
  margin: auto;
}
.liketag {
  border: 1px solid #eaeaea;
  border-radius: 20px;
  margin-top: 2em;
  padding: 2em;
}
.inputtag {
  width: 300px;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-right: auto;
  padding: 5px 0px 5px 0px;
  text-indent: 10px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #eaeaea;
}
.tagresult {
  height: 15em;
  max-width: 280px;
  overflow-y: scroll;
}
.deleteTagButton {
  background-color: #eaeaea;
  border: none;
  border-radius: 10px;
  padding: 2px;
  margin-right: 5px;
}
.deleteTagButton:hover {
  cursor: pointer;
}
.saved:hover {
  cursor: pointer;
  font-weight: bold;
  opacity: 0.7;
}
.planning:hover {
  cursor: pointer;
  font-weight: bold;
  opacity: 0.7;
}
.myplan:hover {
  cursor: pointer;
  font-weight: bold;
  opacity: 0.7;
}
.map {
  width: 60em;
  justify-content: center;
  align-items: center;
  border: 1px solid #eaeaea;
  border-top: 0;
}
.planList {
  border-left: 1px solid #eaeaea;
  border-right: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  font-size: 20px;
  padding: 1em 21.62em;
}
.planList:hover {
  cursor: pointer;
  font-weight: bold;
}
.sub {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
  width: 65.7em;
}
.subdetail {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 1em;
  width: 60em;
  margin-bottom: 2em;
  border-bottom: 1px solid #eaeaea;
}
.likes {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.feedSlider {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  columns: 4;
  column-gap: auto;
  align-items: center;
  padding-bottom: 1em;
}
.grid-article {
  display: flex;
  width: calc(20% - 20px);
  text-align: center;
  border: none;
  margin: 1px;
}
.Eximage {
  margin-left: auto;
  margin-right: auto;
  display: block;
  height: 13rem;
  width: 11.9rem;
  border: none;
}

.create {
  width: 30%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
