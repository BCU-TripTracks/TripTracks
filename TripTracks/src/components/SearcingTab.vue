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
  <div class="container">
    <div class="search-container">
      <div class="Searchbox">
        <input
          class="SearchTag"
          type="text"
          v-model="tag"
          @keyup.enter="printAndClear"
          placeholder="관심있는 태그를 검색해보세요."
        />
        <img src="../assets/img/search.png" alt="Search" class="searchImg" />
      </div>
      <div class="liketag">
        <div>유연우님께서 좋아하시는 태그 목록</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  height: 50vh; /* 화면 전체 높이로 설정 */
}
.Search-container {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30em;
  margin-bottom: auto;
}
.Searchbox {
  display: flex;
  align-items: center;
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
  border: 2px solid black;
  border-radius: 20px 0 0 20px;
  border-right: none;
  height: 3em;
  width: 40em;
  margin-left: auto;
  text-indent: 0.5em;
}
.SearchTag:focus {
  outline: none;
}
.searchImg {
  border: 2px solid black;
  border-radius: 0 20px 20px 0;
  border-left: none;
  padding-left: 0;
  padding: 0.375em;
}
.searchImg:hover {
  cursor: pointer;
  opacity: 0.7;
}
input::placeholder {
  font-size: 1.2em;
  text-indent: 20px;
  text-align: center;
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
.liketag {
  display: flex;
  border: 1px solid #eaeaea;
  border-radius: 20px;
  margin-top: 2em;
  padding: 2em;
  justify-content: center;
}
</style>
