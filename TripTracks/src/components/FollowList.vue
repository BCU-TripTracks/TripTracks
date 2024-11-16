<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import axios from "../axios";

const route = useRoute();
const store = useStore();

const Select = ref("팔로워");
const UserList = ref([]); // 보여줄 팔로우/팔로잉 리스트
const AllUserList = ref({ Follower: [], Following: [], FindUser: [] }); // 전체 리스트

const followers = ref([]);
const followings = ref([]);
const follower = ref(0);
const following = ref(0);
const User_ID = computed(() => store.state.User_ID);
const profile_info = ref({});

const Post_Data = ref([]);
const UserSelect = ref("");
// 팔로워/팔로잉 선택 및 리스트 업데이트 함수
const SetSelect = (select) => {
  Select.value = select;
  if (Select.value === "팔로워") UserList.value = AllUserList.value.Follower;
  else if (Select.value === "팔로잉")
    UserList.value = AllUserList.value.Following;
  else if (Select.value === "검색") UserList.value = AllUserList.value.FindUser;
  console.log(UserList.value);
};

// 초기 팔로워/팔로잉 목록 로드 함수
const loadFollowData = () => {
  axios
    .get("/profile/print_follow", { withCredentials: true })
    .then((res) => {
      const { followersResult, followingsResult } = res.data;

      // 데이터를 필요한 형태로 변환하여 저장
      AllUserList.value.Follower = followersResult.map((user) => ({
        User_ID: user.User_ID,
        User_Name: user.User_Name,
        Profile_Img: user.Profile_Img || "default-profile.png",
      }));

      AllUserList.value.Following = followingsResult.map((user) => ({
        User_ID: user.User_ID,
        User_Name: user.User_Name,
        Profile_Img: user.Profile_Img || "default-profile.png",
      }));

      // 기본으로 팔로워 목록 표시
      SetSelect("팔로워");
    })
    .catch((err) => {
      console.error(err);
    });
};

// 초기 로드
onMounted(() => {
  loadFollowData();
});

// 데이터 로딩 후 SetSelect 호출로 기본 팔로워 리스트를 로드
watch(
  () => store.state.isPostDM,
  () => {
    axios
      .get("/profile/print_follow", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        const { followersResult, followingsResult } = res.data;
        AllUserList.value.Follower = followersResult;
        AllUserList.value.Following = followingsResult;
        SetSelect("팔로워"); // 초기 로드 시 팔로워 목록을 표시
      })
      .catch((err) => {
        console.log(err);
      });
  },
  { immediate: true }
);
// 팔로워 목록 불러오기
const loadFollowers = () => {
  axios
    .get("/profile/print_follow", { withCredentials: true })
    .then((res) => {
      console.log(res.data);
      followers.value = res.data.followersResult; // 팔로워 목록만 저장
    })
    .catch((err) => {
      console.log(err);
    });
};
// 초기 팔로워 목록 로드
watch(
  () => store.state.isPostDM,
  (newVal) => {
    if (newVal) loadFollowers();
  },
  { immediate: true }
);

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

// 팔로우 및 언팔로우 기능
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
  if (newVal.length > 0 && Select.value === "검색") {
    axios
      .get(`/profile/usersFind/${newVal}`)
      .then((res) => {
        console.log(res.data);
        // FindUser
        AllUserList.value.FindUser = res.data.users;
        UserList.value = AllUserList.value.FindUser;
        console.log(AllUserList.value);
        // users.value = res.data.users;
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
      <div class="Title"><h3>프로필 찾아보기</h3></div>
      <div class="selectType">
        <span
          :class="{ select: Select == '팔로워' }"
          class="followtab"
          @click="SetSelect('팔로워')"
        >
          팔로워
        </span>
        <span
          :class="{ select: Select == '팔로잉' }"
          class="followingtab"
          @click="SetSelect('팔로잉')"
        >
          팔로잉
        </span>
        <span
          :class="{ select: Select == '검색' }"
          class="followingtab"
          @click="SetSelect('검색')"
        >
          검색
        </span>
      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="input_UserID"
          placeholder="검색"
          ref="userInput"
          class="userinput"
        />
      </div>
      <!-- <div class="userList" v-if="users.length > 0 && input_UserID !== ''">
        <router-link
          :to="{ name: 'PersonalPage', params: { User_ID: user.User_ID } }"
          v-for="user in users"
          :key="user.User_ID"
          class="userinfo"
          @click="store.commit('Switch_isSearch')"
        >
          <img :src="user.Profile_Img" width="50px" />
          <div class="text-info">
            <div class="followinfo">{{ user.User_ID }}</div>
          </div>
        </router-link>
      </div> -->
      <div class="userList">
        <router-link
          :to="{ name: 'PersonalPage', params: { User_ID: User.User_ID } }"
          class="userinfo"
          v-for="User of UserList"
          :key="User.User_ID"
          @click="store.commit('Switch_isSearch')"
        >
          <img :src="User.Profile_Img" width="50px" />
          <div class="text-info">
            <div class="followinfo">{{ User.User_ID }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <div class="blur" @click="store.commit('Switch_isSearch')"></div>
</template>

<style scoped>
.Profile_Page {
  display: flex;
  justify-content: center;
}
.Profile_Find {
  position: absolute;
  background-color: white;
  margin: auto;
  margin-top: 10em;
  z-index: 5;
  border: 1px solid black;
  height: 400px;
  width: 400px;
  border-radius: 15px;
  overflow-y: scroll;
}
.Title {
  display: flex;
  justify-content: center;
  padding: 5px 0;
  border-bottom: 1px solid #eaeaea;
}
.selectType {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0.4em;
}
.followtab:hover {
  cursor: pointer;
  font-weight: bold;
  opacity: 0.7;
}
.followingtab:hover {
  cursor: pointer;
  font-weight: bold;
  opacity: 0.7;
}

.input-container {
  position: relative; /* 부모 컨테이너를 relative로 설정 */
  display: flex;
  justify-content: center;
}
.userinput {
  width: 100%;
  height: 2.3em;
  margin: 0.5em 0.7em;
  padding: 3px 16px;
  border-width: 0;
  border-radius: 8px;
  background-color: #efefef;
  outline: none; /* 포커스 시 기본 outline 제거 */
}
.userList {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: white;
  border: 1px solid #eaeaea;
  z-index: 10;
  border-top: none;
  max-height: 25em;
  overflow-y: auto;
}

.User {
  display: flex;
  flex: 1 1 calc(33.33% - 10px);
  box-sizing: border-box;
  align-items: center;
  gap: 1rem;
}

.User > img {
  width: 50px;
  border-radius: 50%;
}
.userinfo {
  display: flex;
  align-items: center;
  padding: 0.5em;
  text-decoration: none;
  color: black;
  border-bottom: 1px solid #efefef;
}

.userinfo:hover {
  cursor: pointer;
  background-color: #eaeaea;
  opacity: 0.7;
}

.userinfo img {
  margin-right: 10px; /* 이미지와 텍스트 간격 설정 */
  border-radius: 50%; /* 프로필 이미지를 원형으로 */
}

.text-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 텍스트를 왼쪽 정렬 */
}

.followinfo {
  font-size: 1em;
  font-weight: bold;
  color: black;
}
.blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent; /* 배경을 투명하게 설정 */
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
