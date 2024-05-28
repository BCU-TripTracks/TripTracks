<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";

import ProfileImage from "../assets/img/ProfileImage.png";
import Feed_image from "../assets/img/Feed_image.png";
import FeedArticle from "../assets/img/FeedArticle.png";
import like from "../assets/img/like.png";
import save from "../assets/img/save.png";
import comment from "../assets/img/comment.png";
import axios from "../axios";
import { useRouter } from "vue-router";
import KaKaoMap from "./KaKaoMap.vue";

const router = useRouter();

const selectedMenu = ref("privateinfos");
const selectedSub = ref("heart");
const tag = ref("");
const results = ref([]);
const image = ref(null);
const imagePreview = ref(ProfileImage);
const store = useStore();
const isMsg = computed(() => store.state.isMsg);
const User_Pwd = ref("");
const Input_Img = ref(null);
const _img = ref(null);
const click_Msg = () => {
  store.commit("Switch_isMsg");
};
const Profile_Info = ref([]);

const printAndClear = () => {
  Profile_Info.value.User_Tag.push(tag.value);
  tag.value = "";
};

const deleteTag = (index) => {
  results.value.splice(index, 1);
};

function handleFileUpload(event) {
  const file = event.target.files[0];
  _img.value = event.target.files[0];
  if (file && file.type.startsWith("image")) {
    // 이미지를 선택하면 이미지 미리보기 변수에 선택된 이미지 저장
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    alert("이미지 파일을 선택해주세요.");
  }
}

const Update_Btn = () => {
  Swal.fire({
    title: "개인정보를 수정하시겠습니까?",
    text: " ",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "수정",
    cancelButtonText: "취소",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const formData = {
    User_ID: Profile_Info.value.User_ID,
    User_Pwd: User_Pwd.value,
    User_Tag: Profile_Info.value.User_Tag,
    User_Msg: Profile_Info.value.User_Msg,
    Profile_Img: _img.value,
  };
  axios
    .post("/profile/profile_change", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      console.log(res);
      router.push({ name: "HomeFeed" });
    })
    .catch((err) => {
      console.log(err);
      alert(err.data);
    });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("게시글 삭제가 취소되었습니다.", "ㅋㅋ봐줌", "error");
    }
  });
};
// 마운트 됬을 때
onMounted(() => {
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
  <messagevue v-if="isMsg" />
  <div class="container">
    <div class="submenu">
      <span class="privateinfo" @click="selectedMenu = 'privateinfos'">개인 정보</span>
      <span class="activity" @click="selectedMenu = 'activitydetails'">활동 내역</span>
    </div>
    <div v-if="selectedMenu === 'privateinfos'">
      <div class="profilecontainer">
        <div class="photobox">
          <div v-if="imagePreview" class="photobox">
            <img :src="imagePreview" alt="Image preview" style="width: 150px; height: 150px; border-radius: 50%" />
          </div>
          <div class="buttonbox">
            <button class="photochange">
              <label for="chooseFile" class="selectphoto">사진 변경</label>
            </button>
          </div>
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
          <div>
            <textarea class="caption" placeholder="소개를 입력하세요." v-model="Profile_Info.User_Msg" />
          </div>
        </div>
        <div class="infocontainer">
          <div class="infobox">
            <div>
              사용자 ID<span class="userID"> {{ Profile_Info.User_ID }} </span>
            </div>
            <div>
              사용자 이름<span class="userName">
                {{ Profile_Info.User_Name }}
              </span>
            </div>
            <div>
              사용자 이메일<span class="userName">
                {{ Profile_Info.User_Email }}
              </span>
            </div>
            <div class="pwdbox">
              사용자 비밀번호<input
                v-model="User_Pwd"
                type="password"
                class="userPassword"
                placeholder="바꾸고 싶은 비밀번호를 입력"
              />
            </div>
          </div>
          <div class="liketag">
            {{ Profile_Info.User_Name }}님께서 좋아하시는 태그
            <div>
              <!-- 태그 공간을 따로 빼지 말고 본문 내용에서 입력하게 할지 고민 -->
              <div class="tagbox">
                <input
                  class="inputtag"
                  type="text"
                  v-model="tag"
                  @keypress.enter="printAndClear"
                  placeholder="이 곳에 Tag를 입력하여 추가하세요."
                />
              </div>
              <div id="result" class="tagresult">
                <span v-for="Tag in Profile_Info.User_Tag" :key="Tag" class="tag">
                  {{ Tag }}
                  <button class="deleteTagButton" @click="deleteTag(index)">x</button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="captionbox">
          <button class="pwdbutton" @click="Update_Btn()">적용</button>
        </div>
      </div>
    </div>
    <div v-if="selectedMenu === 'activitydetails'" class="sub">
      <div class="subdetail">
        <span class="likedetails" @click="selectedSub = 'heart'">
          <img src="../assets/img/like.png" alt="" class="heart" />
        </span>
        <span class="sharedetails" @click="selectedSub = 'share'">
          <img src="../assets/img/save.png" alt="" class="share" />
        </span>
        <span class="commentdetails" @click="selectedSub = 'comment'">
          <img src="../assets/img/comment.png" alt="" class="comment" />
        </span>
      </div>
      <div v-if="selectedMenu === 'activitydetails' && selectedSub === 'heart'" class="likes">
        <div class="feedSlider">
          <div class="grid-article" v-for="i in Array(16)" :key="i">
            <router-link :to="{ name: 'FeedDetail' }">
              <img src="../assets/img/Feed_image.png" alt="" class="Eximage" />
            </router-link>
          </div>
        </div>
      </div>
      <div v-if="selectedMenu === 'activitydetails' && selectedSub === 'share'" class="likes">
        <div class="feedSlider">
          <!-- <div class="grid-article" v-for="i in Array(16)" :key="i">
            <router-link :to="{ name: 'FeedDetail' }">
              <img src="../assets/img/FeedArticle.png" alt="" class="Eximage" />
            </router-link> -->
          <!-- </div> -->
        </div>
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
  margin-right: auto;
}
.submenu {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 20px;
  width: 60em;
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
.privateinfo:hover {
  cursor: pointer;
  font-weight: bold;
  opacity: 0.7;
}
.activity:hover {
  cursor: pointer;
  font-weight: bold;
  opacity: 0.7;
}
.sub {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #eaeaea;
  border-radius: 20px;
  margin-bottom: 2em;
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
.likes > .feedSlider {
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
  width: 100%;
  border: none;
}
.heart {
  height: 2em;
}
.heart:hover {
  cursor: pointer;
  font-weight: bold;
  opacity: 0.7;
}
.share {
  height: 2em;
}
.share:hover {
  cursor: pointer;
  font-weight: bold;
  opacity: 0.7;
}
.comment {
  height: 2em;
}
.comment:hover {
  cursor: pointer;
  font-weight: bold;
  opacity: 0.7;
}
</style>
