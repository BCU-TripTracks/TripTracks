<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "../axios";

import ProfileImage from "../assets/img/ProfileImage.png";
import Feed_image from "../assets/img/Feed_image.png";
import messageIcon from "../assets/img/messageIcon.png";
import like from "../assets/img/like.png";
import save from "../assets/img/save.png";
import liked from "../assets/img/likeed.png";
import saveed from "../assets/img/saveed.png";

const router = useRouter();
const store = useStore();

const User_ID = computed(() => store.state.User_ID);
const Profile_Info = ref([]);
const Posters_Info = ref([]); // 원래 게시글 배열
const filteredPosts = ref([]); // 필터링된 게시글 배열
const results = ref([]); // 태그 배열
const tag = ref(""); // 태그 입력

// 게시글 가져오기
const fetchPosts = async () => {
  try {
    const result = await axios.get("/Feeds/Posts_list", {
      withCredentials: true,
    });
    Posters_Info.value = result.data;
    await fetchPostTags(); // 게시글 태그 가져오기
  } catch (error) {
    console.error("오류 발생", error);
  }
};

// 게시글 태그 가져오기
const fetchPostTags = async () => {
  try {
    // 태그를 가져오는 API가 POST_ID를 기반으로 작동한다고 가정
    const tagPromises = Posters_Info.value.map(async (post) => {
      const response = await axios.get(`/posts/${post.Post_ID}/tags`); // 각 게시글의 태그 가져오기
      post.Tags = response.data; // 각 게시글에 태그 추가
    });
    await Promise.all(tagPromises); // 모든 태그 가져오기
    filterPosts(); // 태그 가져온 후 필터링
  } catch (error) {
    console.error("태그 정보를 가져오는 중 오류 발생", error);
  }
};

// 태그 기반 게시글 필터링
// 태그 기반 게시글 필터링
const filterPosts = () => {
  const tagsToFilter = [...results.value, ...Profile_Info.value.User_Tag]; // 추가된 태그와 사용자 태그 결합

  if (tagsToFilter.length > 0) {
    filteredPosts.value = Posters_Info.value.filter((post) => {
      // 태그가 있을 경우 필터링
      const hasTags = post.Tags && post.Tags.length > 0; // 게시글에 태그가 있는지 확인

      return (
        hasTags && // 게시글에 태그가 있어야 함
        tagsToFilter.some(
          (tag) =>
            post.Tags.includes(tag) || // 게시글 태그에서 필터링
            post.Post_Title.includes(tag) || // 제목에서 필터링
            post.Post_Caption.includes(tag) // 본문에서 필터링
        )
      );
    });
  } else {
    filteredPosts.value = Posters_Info.value; // 필터링할 태그가 없으면 원래 게시글을 모두 보여줌
  }
};

// 초기 데이터 가져오기
onMounted(async () => {
  await fetchProfileInfo(); // 프로필 정보 가져오기
  await fetchPosts(); // 게시글 가져오기
});

// 프로필 정보 가져오기
const fetchProfileInfo = async () => {
  try {
    const response = await axios.get("/profile/profile_load", {
      withCredentials: true,
    });
    Profile_Info.value = response.data; // 사용자 프로필 정보 저장
    results.value = Profile_Info.value.User_Tag; // 사용자 태그로 초기화
  } catch (error) {
    console.error("프로필 정보를 가져오는 중 오류 발생", error);
  }
};

// 태그 추가 및 삭제
const printAndClear = () => {
  const trimmedTag = tag.value.trim(); // 공백 제거
  if (trimmedTag) {
    results.value.push(trimmedTag); // 유효한 태그만 추가
    tag.value = ""; // 입력창 초기화
    filterPosts(); // 게시글 필터링
  }
};

const deleteTag = (index) => {
  results.value.splice(index, 1);
  filterPosts(); // 게시글 필터링
};

// 태그가 추가될 때마다 필터링 수행
watch(results, filterPosts, { deep: true });
</script>

<template>
  <div class="grid-container">
    <div class="bodytop">
      <div class="container">
        <div class="search-container">
          <div class="Searchbox">
            <span class="tagbox">
              <input
                class="SearchTag"
                type="text"
                v-model="tag"
                @keyup.enter="printAndClear"
                placeholder="관심있는 태그를 검색해보세요."
              />
            </span>
            <img
              src="../assets/img/search.png"
              alt="Search"
              class="searchImg"
            />
          </div>
        </div>
      </div>
    </div>
    <span id="result" class="tagresult">
      <span v-for="(tag, index) in results" :key="index" class="tag">
        {{ tag }}
        <button class="deleteTagButton" @click="deleteTag(index)">x</button>
      </span>
    </span>
    <div class="feedSlider" v-if="filteredPosts.length > 0">
      <div
        class="grid-article"
        v-for="post in filteredPosts"
        :key="post.Post_ID"
      >
        <router-link
          :to="{ name: 'FeedDetail', params: { Post_ID: post.Post_ID } }"
        >
          <img :src="post.Image_Src" alt="" class="Eximage" />
        </router-link>
        <ul>
          <li class="profile-container">
            <img :src="post.Profile_Img" alt="" class="profile" />
            <router-link
              :to="{ name: 'PersonalPage', params: { User_ID: post.User_ID } }"
              class="userID"
            >
              {{ post.User_ID }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'FeedDetail', params: { Post_ID: post.Post_ID } }"
              class="title"
            >
              {{ post.Post_Title }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'FeedDetail', params: { Post_ID: post.Post_ID } }"
              class="discription"
            >
              {{ post.Post_Caption }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  margin: 3vh 0 3vh 0;
  justify-content: center;
  align-items: center;
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
.discription {
  text-decoration-line: none;
  color: black;
  text-align: left;
  font-size: small;
  margin-bottom: 20px;
}

li {
  list-style-type: none;
}
.tagbox {
  margin-left: auto;
}
a {
  text-decoration: none;
  color: black;
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
  display: flex;
  align-items: center;
  padding-left: 0;
  padding: 0.27em;
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
.liketag-before {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 0 10px;
}
.liketag {
  position: relative;
  display: flex;
  border: 1px solid #eaeaea;
  border-radius: 20px;
  padding: 2em;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 4em;
}
.liketags {
  background-color: white;
  border: none;
  padding: 1em;
  font-size: large;
}
.liketags:hover {
  cursor: pointer;
  opacity: 0.7;
}
.addedTags {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
