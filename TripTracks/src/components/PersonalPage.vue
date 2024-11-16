<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import axios from "../axios";

import FeedArticle from "../assets/img/FeedArticle.png";

const route = useRoute();
const router = useRouter();
const store = useStore();

const user_ID = computed(() => store.state.User_ID);
const isSearch = computed(() => store.state.isWrite);
const follow_List_Click = () => {
  store.commit("Switch_isSearch");
  console.log("상태변경");
};

const isFollow = ref(true);
const profile_info = ref({});
const followers = ref([]);
const followings = ref([]);
const follower = ref(0);
const following = ref(0);

const Post_Data = ref([]);
const Saved_Data = ref([]); // 저장된 게시물 데이터를 위한 변수 추가
const selectedMenu = ref("feedzone");
// 저장된 게시물 데이터를 불러오는 함수 (POST 요청으로 변경)
const loadSavedPosts = () => {
  axios
    .post(
      "/Feeds/Save_List",
      { User_ID: route.params.User_ID },
      { withCredentials: true }
    )
    .then((res) => {
      console.log(res);
      Saved_Data.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// savezone 클릭 시 저장된 게시물을 로드하도록 수정
const selectSavezone = () => {
  selectedMenu.value = "savezone";
  loadSavedPosts();
};

const search_user_profile = (User_ID) => {
  axios
    .get(`/profile/search/${User_ID}`)
    .then((res) => {
      console.log(res.data);
      const result = res.data;
      profile_info.value = result.userInfoResult;
      followers.value = result.follower;
      followings.value = result.following;
      follower.value = result.follower_Len;
      following.value = result.following_Len;
      isFollow.value = followers.value.includes(user_ID.value);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });

  axios.post("/profile/posts_list", { User_ID }).then((res) => {
    Post_Data.value = res.data;
    console.log(Post_Data.value);
  });
};

onMounted(() => {
  search_user_profile(route.params.User_ID);
});

watch(
  () => route.params.User_ID,
  (newUserID) => {
    if (newUserID) {
      search_user_profile(newUserID);
      input_UserID.value = "";
    }
  }
);

const click_Msg = async () => {
  await axios
    .post(
      `/Direct/search_Room`,
      {
        toUser_ID: profile_info.value.User_ID,
      },
      { withCredentials: true }
    )
    .then((res) => {
      console.log(res.data);
      const { Room_ID } = res.data;
      router.push({ name: "Room", params: { Room_ID: Room_ID } });
    })
    .catch((err) => {
      console.log(err);
    });
};

const Follow = async () => {
  if (isFollow.value) {
    await axios
      .post(
        `/profile/unfollow`,
        {
          fromUser: profile_info.value.User_ID,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        isFollow.value = false;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        search_user_profile(route.params.User_ID);
      });
  } else {
    await axios
      .post(
        `/profile/follow`,
        {
          fromUser: profile_info.value.User_ID,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        isFollow.value = true;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        search_user_profile(route.params.User_ID);
      });
  }
};

const input_UserID = ref("");
const users = ref([]);
watch(input_UserID, (newVal) => {
  if (newVal.length > 0) {
    axios
      .get(`/profile/usersFind/${newVal}`)
      .then((res) => {
        console.log(res.data);
        users.value = res.data.users;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
</script>

<template>
  <!-- <div class="Profile_Page">
    <div class="Profile_Find">
      <h3>프로필 찾아보기</h3>
      <div class="input-container">
        <input
          type="text"
          v-model="input_UserID"
          placeholder="검색하고 싶은 프로필의 아이디를 적어주세요"
          ref="userInput"
        />
        <ul
          class="userList"
          v-if="users.length > 0 && input_UserID !== ''"
          :style="{ top: `${inputHeight}px` }"
        >
          <router-link
            :to="{ name: 'PersonalPage', params: { User_ID: user.User_ID } }"
            v-for="user in users"
            :key="user.User_ID"
            class="router-link-none userItem"
          >
            <img :src="user.Profile_Img" width="25px" />
            <p>{{ user.User_ID }} - {{ user.User_Name }}</p>
          </router-link>
        </ul>
      </div>
    </div> -->
  <div class="Profile_Container">
    <div class="Profile_Photo">
      <li>
        <img :src="profile_info.Profile_Img" alt="" class="profile" />
      </li>
    </div>
    <ul>
      <li class="ID">
        <div class="userID_Info" v-if="profile_info">
          @{{ profile_info.User_ID }}<span> {{ profile_info.User_Name }} </span>
        </div>
        <button
          class="follow"
          v-if="profile_info.User_ID !== user_ID"
          @click="Follow"
          :style="{
            backgroundColor: isFollow ? '#EFEFEF' : 'black',
            borderColor: isFollow ? '#F2F2F2' : 'black',
            color: isFollow ? 'black' : 'white',
          }"
        >
          {{ isFollow ? "팔로잉" : "팔로우" }}
        </button>
        <button
          v-if="profile_info.User_ID !== user_ID"
          class="message"
          @click="click_Msg"
        >
          메시지
        </button>
      </li>
      <li class="profileWrap">
        게시물
        <span class="userInfo"> {{ Post_Data.length }}</span>
        <a class="followwrap">
          <p @click="follow_List_Click()">팔로워</p>
          <span class="userInfo" @click="follow_List_Click()">
            {{ follower }}
          </span>
        </a>
        <a class="followwrap">
          <p @click="follow_List_Click()">팔로잉</p>
          <span class="userInfo" @click="follow_List_Click()">
            {{ following }}
          </span>
        </a>
      </li>
      <li>{{ profile_info.User_Msg }}</li>
    </ul>
  </div>

  <div class="Feed_discription">
    <span class="feedzone" @click="selectedMenu = 'feedzone'">게시물</span>
    <span
      class="savezone"
      v-if="profile_info.User_ID == user_ID"
      @click="selectSavezone"
    >
      저장된 게시물
    </span>
  </div>

  <ul class="Feed_Container">
    <li v-for="Post in Post_Data" v-if="selectedMenu === 'feedzone'">
      <router-link
        :to="{ name: 'FeedDetail', params: { Post_ID: Post.Post_ID } }"
      >
        <img :src="Post.Image_Src" alt="" class="FeedArticle" />
      </router-link>
    </li>
    <li v-for="Post in Saved_Data" v-else-if="selectedMenu === 'savezone'">
      <router-link
        :to="{ name: 'FeedDetail', params: { Post_ID: Post.Post_ID } }"
      >
        <img :src="Post.Image_Src" alt="" class="FeedArticle" />
      </router-link>
    </li>
  </ul>

  <!-- <div v-if="selectedMenu === 'feedzone'" class="Feed">
    <div class="Article">
      <ul class="Feed_Container">
        <li v-for="Post in Post_Data">
          <router-link
            :to="{ name: 'FeedDetail', params: { Post_ID: Post.Post_ID } }"
          >
            <img :src="Post.Image_Src" alt="" class="FeedArticle" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>

   -->
  <!-- <div v-if="selectedMenu === 'savezone'" class="Feed">
    <div class="Article">
      <ul>
        <li v-for="Post in Saved_Data" :key="Post.Post_ID">
          <router-link
            v-if="Post.Post_ID"
            :to="{ name: 'FeedDetail', params: { Post_ID: Post.Post_ID } }"
          >
            <img :src="Post.Image_Src" alt="" class="FeedArticle" />
          </router-link>
        </li>
      </ul>
    </div>
  </div> -->
  <!-- </div> -->
</template>

<style scoped>
.router-link-none {
  text-decoration: none;
  color: black;
}
.Profile_Page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 1rem;
  justify-content: flex-start;
}
.Profile_Page > .Profile_Find {
  width: 30em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
}
.Profile_Page > .Profile_Find > h3 {
  font: bold 15px arial;
}
.Profile_Page > .Profile_Find .input-container {
  position: relative;
  width: 100%;
}
.Profile_Page > .Profile_Find input {
  width: 100%;
  height: 30px;
  padding: 0.8rem 1rem;
  border: 1px solid black;
  border-radius: 50px;

  position: relative;
}
.Profile_Page > .Profile_Find .userList {
  display: flex;
  flex-direction: column;
  position: absolute;
  background: white;
  border: 1px solid black;
  border-radius: 0 0 10px 10px;
  width: 100%; /* input의 너비에 맞추기 */
  z-index: 10; /* 다른 요소보다 위에 오도록 설정 */
  border-top: none;
}
.Profile_Page > .Profile_Find .userList > .userItem {
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.Profile_Page > .Profile_Find .userList > .userItem > img {
  border-radius: 100%;
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
.Profile_Page > .Profile_Find .userList .userItem:hover {
  background: #d9d9d9;
  cursor: pointer;
}
.userID_Info {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  font: bold 30px arial;
}
.userID_Info > span {
  margin-left: 10px;
  font-size: 15px;
}
.Profile_Container {
  display: flex;
  margin-top: 50px;
  margin-right: auto;
}
.profile {
  width: 150px;
  height: 150px;
  margin-right: 30px;
  border-radius: 50%;
}

.Feed {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  columns: 4;
  align-items: center;
  margin-bottom: 1rem;
}
.feedzone {
  margin: 0 10px 10px 10px;
  font-size: larger;
  border-right: #333;
}
.savezone {
  margin: 0 0 10px 0;
  font-size: larger;
}
.feedzone:hover {
  cursor: pointer;
  font-weight: bold;
}
.savezone:hover {
  cursor: pointer;
  font-weight: bold;
}
.Feed_discription {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 10px;
  border-bottom: 1px solid #333;
  margin: 10px 0;
}
.Feed_Container {
  width: 100%;
  overflow-y: auto;
  column-count: 4;
  gap: 0.3rem;
  overflow-x: hidden;
}
.Feed_Container > li {
  break-inside: avoid; /* 이 요소는 열 내에서 나뉘어지지 않도록 함 */
  /* gap: 10rem; */
}
.Feed_Container > li img {
  width: 250px;
  margin: 0.3rem;
}

ul {
  list-style-type: none;
}
li {
  list-style-type: none;
}
button {
  margin: 5px;
  padding: 0.5rem 0.9rem;
  background-color: black;
  color: white;
  border-radius: 10px;
  border: none;
}

button:hover {
  opacity: 0.7;
  cursor: pointer;
}
.userInfo {
  text-indent: 0.2em;
  font-weight: 600;
  font-size: medium;
}
.profileWrap {
  display: flex;
  margin: 15px 0;
}
.Article ul {
  display: flex;
  flex-wrap: wrap; /* 이미지들이 넘치면 줄바꿈되도록 */
  justify-content: center;
  padding: 0;
}
.Article li {
  list-style-type: none;
  margin-right: 5px;
}
.FeedArticle {
  height: auto;
  width: 280px; /* 원하는 이미지 크기로 설정 */
  height: auto; /* 높이는 자동으로 맞춤 */
  object-fit: cover; /* 이미지를 부모 크기에 맞춰 자르기 */
  gap: 1rem;
}
.followwrap {
  display: flex;
  margin-left: 0.4em;
}
.followwrap:hover {
  cursor: pointer;
  opacity: 0.7;
}
.message {
  margin: 15px 7px 0 0;
}
.follow {
  margin: 15px 7px 0 0;
}
</style>
