<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "../axios";

import fottervue from "../components/fotter.vue";
import save from "../assets/img/save.png";
import like from "../assets/img/like.png";
import message from "../assets/img/messageIcon.png";
import likeed from "../assets/img/likeed.png";
import saveed from "../assets/img/saveed.png";
import image404 from "../assets/img/404img.avif";

const router = useRouter();
const store = useStore();

const User_ID = computed(() => store.state.User_ID);
const isWrite = computed(() => store.state.isWrite);

const isLike = ref(false);
const isSave = ref(false);
const feedSliderContainer = ref(null);
const initialLoadComplete = ref(false);
const FeedContainer = ref(null);

const likeImage = ref(like);
const saveImage = ref(save);

const Posters_Info = ref([{ Post_ID: 1 }]);

// 태그 관련부
const printAndClear = () => {
  const trimmedTag = tag.value.trim(); // 공백 제거
  if (trimmedTag) {
    results.value.push(trimmedTag); // 유효한 태그만 추가
    tag.value = ""; // 입력창 초기화
  }
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
        console.log(FeedContainer.value);
        if (FeedContainer.value) {
          FeedContainer.value.addEventListener("scroll", handleScroll);
          nextTick(() => {
            if (!initialLoadComplete.value) {
              FeedContainer.value.scrollTop = FeedContainer.value.scrollHeight;
              initialLoadComplete.value = true; // 초기 로드 완료 플래그 설정
            }
          });
        }
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
const message_Button_Click = async (Post) => {
  console.log(Post);
  const { Post_ID } = Post;
  // router.push({name:"PostDM", params:{Post_ID}});
  store.commit("Switch_isPostDM", Post_ID);

  console.log("메세지버튼클릭");
};

const like_Button_Click = (Post) => {
  if (Post.isLike) {
    axios
      .post(
        "/feeds/Like/remove",
        { postId: Post.Post_ID },
        { withCredentials: true }
      )
      .then((result) => {
        Post.isLike = !Post.isLike;
      })
      .catch((result) => {
        if (result.response.status == 400) {
          // alert("실패");
        }
      });
  } else {
    axios
      .post(
        "/feeds/Like/add",
        { postId: Post.Post_ID },
        { withCredentials: true }
      )
      .then((result) => {
        Post.isLike = !Post.isLike;
      })
      .catch((result) => {
        if (result.response.status == 400) {
          // alert("실패");
        }
      });
  }
};

const save_Button_Click = (Post) => {
  if (Post.isSave) {
    axios
      .post(
        "/feeds/Post_Store/delete",
        { postId: Post.Post_ID },
        { withCredentials: true }
      )
      .then((result) => {
        Post.isSave = !Post.isSave;
      })
      .catch((result) => {
        if (result.response.status === 400) {
          // alert("저장 취소 실패");
        }
      });
  } else {
    axios
      .post(
        "/feeds/Post_Store/add",
        { postId: Post.Post_ID },
        { withCredentials: true }
      )
      .then((result) => {
        Post.isSave = !Post.isSave;
      })
      .catch((result) => {
        if (result.response.status === 400) {
          // alert("저장 실패");
        }
      });
  }
};
const replaceImage = (event) => {
  event.target.src = event.target.getAttribute("data-fallback");
};

const filteredPosts = ref([]); // 필터링된 게시글 배열

// 게시글 필터링
const filterPosts = () => {
  const tagsToFilter = results.value;

  if (tagsToFilter.length > 0) {
    filteredPosts.value = Posters_Info.value.filter((post) => {
      return tagsToFilter.some(
        (tag) =>
          post.Post_Title.includes(tag) || post.Post_Caption.includes(tag)
      );
    });
  } else {
    filteredPosts.value = Posters_Info.value; // 필터링할 태그가 없으면 원래 게시글을 모두 보여줌
  }
};

// 게시글 가져오기
const fetchPosts = async () => {
  try {
    const result = await axios.get("/Feeds/Posts_list", {
      withCredentials: true,
    });
    // 서버에서 isSave 값을 가져오지 않는다면 기본 값을 설정
    Posters_Info.value = result.data.map((post) => ({
      ...post,
      isSave: post.isSave ?? false, // 서버에서 가져오는 데이터에 isSave 속성이 없다면 false로 초기화
    }));
    filteredPosts.value = Posters_Info.value; // 초기 로딩 시 모든 게시글을 보여줌
  } catch (error) {
    console.error("오류 발생", error);
  }
};

// 태그가 추가될 때마다 필터링 수행
watch(results, filterPosts, { deep: true });

// 초기 데이터 가져오기
fetchPosts();

onMounted(() => {});
onUnmounted(() => {
  if (FeedContainer.value) {
    FeedContainer.value.removeEventListener("scroll", handleScroll);
  }
});
// 스크롤 이벤트 핸들러
function handleScroll() {
  const scrollTop = FeedContainer.value.scrollTop; // 현재 스크롤 위치
  const scrollHeight = FeedContainer.value.scrollHeight; // 전체 콘텐츠 높이
  const clientHeight = FeedContainer.value.clientHeight; // 보이는 영역 높이
  console.log(scrollTop, clientHeight, scrollHeight);
  // 맨 아래에 도달했는지 확인
  if (scrollTop + clientHeight >= scrollHeight) {
    console.log("맨 아래 도달");
    loadMorePosts(); // 맨 아래 도달 시 실행할 함수
  }
}

// 추가 메시지 로딩 함수
function loadMorePosts() {
  console.log("Loading more messages...");
  // 여기에 API 요청 로직을 추가
  // axios
  //   .post(
  //     `/Direct/print_DM_Next`,
  //     {
  //       Room_ID: RoomChat.value.Room_ID,
  //       Last_Chat: RoomChat.value.Messages[0].Message_ID,
  //     },
  //     { withCredentials: true }
  //   )
  //   .then((res) => {
  //     console.log(res.data);
  //     const { ResultMessages } = res.data;
  //     console.log(ResultMessages);
  //     RoomChat.value.Messages.unshift(...ResultMessages);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
}
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
    <div class="feedSlider" v-if="filteredPosts.length > 0" ref="FeedContainer">
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
            <img
              :src="post.isLike ? likeed : like"
              alt=""
              class="like"
              @click="like_Button_Click(post)"
            />
            <img
              :src="post.isSave ? saveed : save"
              alt=""
              class="save"
              @click="save_Button_Click(post)"
            />
            <img
              :src="message"
              alt=""
              class="message"
              @click="message_Button_Click(post)"
            />
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
    <!-- <div class="fotterbox"><fottervue /></div> -->
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
  min-height: 100px;
  background-color: gray;
  border: none;
}
.profile-container {
  display: flex;
  padding: 5px;
  align-items: center;
  font-size: larger;
}
.profile {
  height: 30px;
  min-height: 30px;
  background-color: red;
  width: 30px;
  margin-right: 5px;
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
.bodytop {
  display: flex;
  align-items: center;
  width: 100%;
}
.tagbox {
  display: flex;
  margin-left: auto;
  align-items: center;
}
.SearchTag {
  border: 2px solid #efefef;
  border-top: none;
  border-left: none;
  border-right: none;
  margin-left: auto;
  margin-right: 1em;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  width: 15em;
  text-indent: 0.5em;
}
.searchImg {
  margin-left: 0.5em;
  margin-right: 1em;
  padding-bottom: 0.7em;
  height: 30px;
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
  margin-right: 10px;
}
.message {
  height: 25px;
}
.message:hover {
  cursor: pointer;
  opacity: 0.7;
}
.save:hover {
  cursor: pointer;
  opacity: 0.7;
}
.fotterbox {
  display: flex;
  margin-top: 1em;
}
</style>
