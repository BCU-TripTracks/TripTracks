<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import ProfileImage from "../assets/img/ProfileImage.png";
import Feed_image from "../assets/img/Feed_image.png";
import messageIcon from "../assets/img/messageIcon.png";
import like from "../assets/img/like.png";
import save from "../assets/img/save.png";
import likeed from "../assets/img/likeed.png";
import saveed from "../assets/img/saveed.png";

const router = useRouter();
const store = useStore();

const isWrite = computed(() => store.state.isWrite);

const isLike = ref(false);
const isSave = ref(false);

const likeImage = ref(like);
const saveImage = ref(save);

const Posters_Info = ref([
  {
    Post_ID: 1,
    Post_Title: "a포스트입니다.",
    Post_Content: "자세한설명들입니다.",
    Post_Src: "asd/asd.jpg",
    User_ID: "_youngs_",
    Profile_Img_src: "asd/asd.jpg",
  },
  {
    Post_ID: 2,
    Post_Title: "b포스트입니다.",
    Post_Content: "자세한설명들입니다.",
    Post_Src: "asd/asd.jpg",
    User_ID: "_youngs_",
    Profile_Img_src: "asd/asd.jpg",
  },
]);

const write_Button_Click = () => {
  store.commit("Switch_isWrite");
};

const like_Button_Click = () => {
  isLike.value = !isLike.value;
  likeImage.value = isLike.value ? likeed : like;
};

const save_Button_Click = () => {
  isSave.value = !isSave.value;
  saveImage.value = isSave.value ? saveed : save;
};
</script>

<template>
  <div class="grid-container">
    <button @click="write_Button_Click()">글쓰기</button>
    <div class="feedSlider">
      <div class="grid-article" v-for="Post in Posters_Info">
        <router-link :to="{ name: 'FeedDetail' }"
          ><img src="../assets/img/Feed_image.png" alt="" class="Eximage"
        /></router-link>
        <ul>
          <li class="profile-container">
            <img :src="ProfileImage" alt="" class="profile" />
            <router-link
              :to="{ name: 'PersonalPage', params: { User_ID: '_youngs_' } }"
              class="userID"
              >{{ Post.User_ID }}</router-link
            >
            <img
              :src="likeImage"
              alt=""
              class="like"
              @click="like_Button_Click"
            />
            <img
              :src="saveImage"
              alt=""
              class="save"
              @click="save_Button_Click"
            />
          </li>
          <li>
            <router-link :to="{ name: 'FeedDetail' }" class="title">
              {{ Post.Post_Title }}
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'FeedDetail' }" class="description">{{
              Post.Post_Content
            }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.grid-container > .feedSlider {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  columns: 4;
  column-gap: auto;
  align-items: center;
}
.grid-article {
  width: calc(25% - 20px);
  text-align: center;
  border: none;
  margin: 5px;
}

.Eximage {
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 100%;
  border: none;
}
.profile-container {
  display: flex;
  padding: 5px;
  align-items: center;
  font-size: larger;
}
.profile {
  margin-top: 10px;
  height: 30px;
  width: 30px;
  margin-right: 10px;
}
.userID {
  text-decoration-line: none;
  color: black;
  margin-right: 10px;
  font-size: large;
  font-weight: 500;
}

.Eximage:hover {
  opacity: 0.7;
}

.likecomment {
  text-align: right;
  margin-left: auto;
}

.title {
  text-decoration-line: none;
  color: black;
  text-align: left;
  font-size: large;
  font-weight: bold;
}
.description {
  text-decoration-line: none;
  color: black;
  text-align: left;
  font-size: small;
  margin-bottom: 20px;
}

li {
  list-style-type: none;
}

button {
  margin: 30px;
  padding: 0.5rem 1rem;
  margin-left: auto;
  background-color: black;
  color: white;
}
button:hover {
  opacity: 0.7;
  cursor: pointer;
}
.like {
  height: 25px;
  margin-right: 10px;
  margin-left: auto;
}
.like:hover {
  cursor: pointer;
  opacity: 0.7;
}
.save {
  height: 25px;
}
.save:hover {
  cursor: pointer;
  opacity: 0.7;
}
</style>
