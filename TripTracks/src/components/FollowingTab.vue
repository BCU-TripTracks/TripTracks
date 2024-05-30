<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "../axios";

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
const feedSliderContainer = ref(null);
const initialLoadComplete = ref(false);

const likeImage = ref(like);
const saveImage = ref(save);

const Posters_Info = ref([{ Post_ID: 1 }]);

// 태그 관련부
const printAndClear = () => {
  results.value.push(tag.value);
  tag.value = "";
};

const deleteTag = (index) => {
  results.value.splice(index, 1);
};

const tag = ref("");
const results = ref([]);

watch(
  isWrite,
  () => {
    axios
      .get("/Feeds/Posts_list", {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        Posters_Info.value = result.data;
      })
      .catch((result) => {
        console.log("오류발생");
        console.log(result);
      });
  },
  { immediate: true }
);
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

// const test = () => {
//   console.log("dd");
// };

// onMounted(async () => {
//   if (feedSliderContainer.value) {
//     feedSliderContainer.value.addEventListener("scroll", test());
//   }
// feedSliderContainer.value.scrollTop = await feedSliderContainer.value
//   .scrollHeight;
// });

// function handleScroll() {
//   console.log("Scroll event triggered");
// }
</script>

<template>
  <div class="grid-container">
    <div class="bodytop">
      <span id="result" class="tagresult">
        <span v-for="(tag, index) in results" :key="index" class="tag">
          {{ tag }}
          <button class="deleteTagButton" @click="deleteTag(index)">x</button>
        </span>
      </span>
      <span class="tagbox">
        <input
          class="SearchTag"
          type="text"
          v-model="tag"
          @keyup.enter="printAndClear"
          placeholder="관심있는 태그를 검색해보세요."
        />
        <button @click="write_Button_Click()" class="writebutton">
          글쓰기
        </button>
      </span>
    </div>
    <div class="feedSlider" ref="feedSliderContainer" v-if="Posters_Info">
      <div class="grid-article" v-for="Post in Posters_Info">
        <router-link
          :to="{ name: 'FeedDetail', params: { Post_ID: Post.Post_ID } }"
          ><img :src="Post.Image_Src" alt="" class="Eximage"
        /></router-link>
        <ul>
          <li class="profile-container">
            <img :src="Post.Profile_Img" alt="" class="profile" />
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
            <router-link
              :to="{ name: 'FeedDetail', params: { Post_ID: Post.Post_ID } }"
              class="title"
            >
              {{ Post.Post_Title }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'FeedDetail', params: { Post_ID: Post.Post_ID } }"
              class="description"
              >{{ Post.Post_Caption }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.grid-container > .feedSlider {
  overflow-y: auto;
  column-count: 4;
}
.grid-article {
  text-align: left;
  border: none;
  margin: 0.5rem;
  margin-bottom: 3rem;
  break-inside: avoid;
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
  border-radius: 50%;
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
.bodytop {
  display: flex;
  align-items: center;
  width: 100%;
}
.tagbox {
  margin-left: auto;
}
.SearchTag {
  border: 2px solid #efefef;
  border-top: none;
  border-left: none;
  border-right: none;
  margin-left: auto;
  margin-right: 1em;
  padding-bottom: 0.5em;
  width: 15em;
  text-indent: 0.5em;
}

.tagresult {
  margin-right: auto;
  margin-left: 3em;
  font-weight: 500;
  font-size: 20px;
  -webkit-user-select: all;
  -moz-user-select: all;
  -ms-user-select: all;
  user-select: all;
}
.deleteTagButton {
  background-color: white;
  border: none;
  margin-right: 5px;
}
.deleteTagButton:hover {
  cursor: pointer;
}
.writebutton {
  margin: 30px;
  padding: 0.5rem 1rem;
  margin-left: auto;
  background-color: black;
  color: white;
}
.writebutton:hover {
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
