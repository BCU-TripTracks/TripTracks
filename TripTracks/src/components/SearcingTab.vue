<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "../axios";

const router = useRouter();
const store = useStore();

const User_ID = computed(() => store.state.User_ID);
const Profile_Info = ref([]);
const Posters_Info = ref([]); // 원래 게시글 배열
const filteredPosts = ref([]); // 필터링된 게시글 배열

const Posts_List = ref([]);
const Set_Tags = ref([]); // 태그 배열
const tag_Input = ref(""); // 태그 입력

// 초기 데이터 가져오기
onMounted(async () => {
  // 사용자 태그 가져오기
  await axios
    .get(`/Feeds/searching_tab/`, {
      withCredentials: true,
    })
    .then((response) => {
      const resTags = response.data;
      Set_Tags.value = resTags;
    })
    .catch((error) => {
      console.error("사용자 태그 가져오기 오류", error);
    });

  // 게시글 가져오기
  api_Feed_Serach();
});

// 태그 추가 및 삭제
const printAndClear = () => {
  var temp_Tag = tag_Input.value.trim();
  if (temp_Tag !== "") {
    Set_Tags.value.push(temp_Tag);
    tag_Input.value = "";

    console.log(`태그 추가됨: ${temp_Tag}\n태그 목록:
    ${JSON.stringify(Set_Tags.value)}`);

    api_Feed_Serach();
  }
};

const deleteTag = (index) => {
  var temp_Tag = Set_Tags.value[index];
  Set_Tags.value.splice(index, 1);
  console.log(`태그 삭제됨: ${temp_Tag}\n태그 목록: ${JSON.stringify(Set_Tags.value)}`);

  api_Feed_Serach();
};

const api_Feed_Serach = async () => {
  console.log("태그 검색 중...");
  await axios
    .post(
      `/Feeds/searching_tab/searchByTags`,
      {
        tags: Set_Tags.value,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      Posts_List.value = response.data;
      console.log(JSON.stringify(Posts_List.value));
    })
    .catch((error) => {
      console.error("게시글 검색 중 오류 발생", error);
    });
};

// 태그가 추가될 때마다 필터링 수행
// watch(results, filterPosts, { deep: true });
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
                v-model="tag_Input"
                @keyup.enter="printAndClear"
                placeholder="관심있는 태그를 검색해보세요."
              />
            </span>
            <img src="../assets/img/search.png" alt="Search" class="searchImg" />
          </div>
        </div>
      </div>
    </div>
    <span id="result" class="tagresult">
      <span v-for="(tag, index) in Set_Tags" :key="index" class="tag">
        {{ tag }}
        <button class="deleteTagButton" @click="deleteTag(index)">x</button>
      </span>
    </span>
    <div class="feedSlider" v-if="Posts_List">
      <div v-if="Posts_List" class="grid-article" v-for="post in Posts_List" :key="post.Post_ID">
        <router-link :to="{ name: 'FeedDetail', params: { Post_ID: post.Post_ID } }">
          <img :src="post.Image_Src" alt="" class="Eximage" />
        </router-link>
        <ul>
          <li class="profile-container">
            <img :src="post.Profile_Img" alt="" class="profile" />
            <router-link :to="{ name: 'PersonalPage', params: { User_ID: post.User_ID } }" class="userID">
              {{ post.User_ID }}
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'FeedDetail', params: { Post_ID: post.Post_ID } }" class="title">
              {{ post.Post_Title }}
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'FeedDetail', params: { Post_ID: post.Post_ID } }" class="discription">
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
