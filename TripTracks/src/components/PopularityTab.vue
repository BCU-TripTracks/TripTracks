<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "../axios";

const router = useRouter();
const store = useStore();

const isWrite = computed(() => store.state.isWrite);

const Posters_Info = ref([]);
const filteredPosts = ref([]); // 필터링된 게시글 배열

// 태그 관련부
const tag = ref("");
const results = ref([]);

// 태그 추가 함수
const printAndClear = () => {
  const trimmedTag = tag.value.trim(); // 공백 제거
  if (trimmedTag) {
    results.value.push(trimmedTag); // 유효한 태그만 추가
    tag.value = ""; // 입력창 초기화
  }
};

// 태그 삭제 함수
const deleteTag = (index) => {
  results.value.splice(index, 1);
};

// 게시글 필터링
const filterPosts = () => {
  const tagsToFilter = results.value;

  if (tagsToFilter.length > 0) {
    filteredPosts.value = Posters_Info.value.filter((post) => {
      return tagsToFilter.some((tag) => post.Post_Title.includes(tag) || post.Post_Caption.includes(tag));
    });
  } else {
    filteredPosts.value = Posters_Info.value; // 필터링할 태그가 없으면 원래 게시글을 모두 보여줌
  }
};

// 인기 게시글 가져오기
watch(
  isWrite,
  () => {
    axios
      .get("/Feeds/Popular", {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        Posters_Info.value = result.data;
        filteredPosts.value = result.data; // 초기 로딩 시 모든 인기 게시글을 보여줌
      })
      .catch((result) => {
        console.log("오류발생");
        console.log(result);
      });
  },
  { immediate: true }
);

// 태그가 추가될 때마다 필터링 수행
watch(results, filterPosts, { deep: true });
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
        <button @click="write_Button_Click()" class="writebutton">글쓰기</button>
      </span>
    </div>
    <div class="feedSlider" ref="feedSliderContainer" v-if="filteredPosts.length > 0">
      <div class="grid-article" v-for="Post in filteredPosts" :key="Post.Post_ID">
        <router-link :to="{ name: 'FeedDetail', params: { Post_ID: Post.Post_ID } }">
          <img :src="Post.Image_Src" alt="" class="Eximage" />
        </router-link>
        <ul>
          <li class="profile-container">
            <img :src="Post.Profile_Img" alt="" class="profile" />
            <router-link :to="{ name: 'PersonalPage', params: { User_ID: Post.User_ID } }" class="userID">
              {{ Post.User_ID }}
            </router-link>
            <img :src="likeImage" alt="" class="like" @click="like_Button_Click" />
            <img :src="saveImage" alt="" class="save" @click="save_Button_Click" />
          </li>
          <li>
            <router-link :to="{ name: 'FeedDetail', params: { Post_ID: Post.Post_ID } }" class="title">
              {{ Post.Post_Title }}
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'FeedDetail', params: { Post_ID: Post.Post_ID } }" class="description">
              {{ Post.Post_Caption }}
            </router-link>
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
