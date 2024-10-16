<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import axios from "../axios";

import messagevue from "../components/message.vue";
import FeedArticle from "../assets/img/FeedArticle.png";

const route = useRoute();
const router = useRouter();
const store = useStore();
const user_ID = computed(() => store.state.User_ID);
const isFollow = ref(true);
const profile_info = ref({});
const followers = ref([]);
const followings = ref([]);
const follower = ref(0);
const following = ref(0);
const Post_Data = ref([]);

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
  <div class="Profile_Page">
    <div class="Profile_Find">
      <h3>프로필 찾아보기</h3>
      <div class="input-container">
        <input
          type="text"
          v-model="input_UserID"
          placeholder="검색하고 싶은 프로필의 아이디를 적어주세요"
          ref="userInput"
        />
        <ul class="userList" v-if="users.length > 0 && input_UserID !== ''" :style="{ top: `${inputHeight}px` }">
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
    </div>
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
          <button v-if="profile_info.User_ID !== user_ID" class="message" @click="click_Msg">메시지</button>
        </li>
        <li>
          <span>게시물 9 </span>팔로워 {{ follower }} <span></span><span>팔로잉 {{ following }}</span>
        </li>
        <li>{{ profile_info.User_Msg }}</li>
      </ul>
    </div>
    <div class="Feed_discription">
      <ul>
        <li>게시물 9</li>
        <li>태그장소 17</li>
      </ul>
    </div>

    <div class="Feed_Container">
      <div class="Feed">
        <div class="Article">
          <ul>
            <li v-for="Post in Post_Data">
              <router-link :to="{ name: 'FeedDetail', params: { Post_ID: Post.Post_ID } }">
                <img :src="Post.Image_Src" alt="" class="FeedArticle" />
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
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
  width: 100%;
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
  column-gap: auto;
  align-items: center;
  margin-top: 10px;
}
.Feed_Container {
  overflow-y: auto;
  column-count: 4;
  overflow-x: hidden;
}

.Feed_discription {
  color: #585858;
  font: 18px "arial";
  font-weight: 500;
  border-bottom: 1px solid #707070;
  margin-bottom: 10px;
  padding: 10px;
}

.Feed_discription > ul {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  list-style-type: none;
  padding: 0;
  margin: 10px;
}
.Feed > .Article {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  columns: 4;
  column-gap: auto;
  align-items: center;
}

.Feed > .Article > ul > li {
  list-style-type: none;
  width: 280px;
  margin: 0px;
  padding-right: 5px;
}

li {
  padding-right: 20px;
  list-style-type: none;
  margin-top: 10px;
}
.ID {
  font: bold 30px arial;
}
.Feed > .Article > ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.Feed > .Article > ul > li > a {
  text-decoration: none;
}

.Feed > .Article > ul > li > a:hover {
  opacity: 0.7;
}

.Feed > .Article > ul > li > a > .FeedArticle {
  width: 100%;
  height: auto;
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
</style>
