import { createStore } from "vuex";
import axios from "./axios";
import socket from "./socket";
import router from "./router/index"; // router 모듈 가져오기

const store = createStore({
  state() {
    return {
      isNoti: false,
      isMsg: false,
      isWrite: false,
      isFollow: false,
      isLike: false,
      isSave: false,
      isModify: false,
      User_ID: "",
      Profile_Img: "",
    };
  },
  mutations: {
    Switch_isNoti(state) {
      state.isNoti = !state.isNoti;
    },
    Switch_isMsg(state) {
      state.isMsg = !state.isMsg;
    },
    Switch_isWrite(state) {
      state.isWrite = !state.isWrite;
    },
    Switch_isFollow(state) {
      state.isFollow = !state.isFollow;
    },
    SET_USER_ID(state, User_ID) {
      state.User_ID = User_ID;
    },
    SET_PROFILE_IMG(state, Profile_Img) {
      state.Profile_Img = Profile_Img;
    },
    Switch_isLike(state) {
      state.isLike = !state.isLike;
    },
    Switch_isSave(state) {
      state.isSave = !state.isSave;
    },
    Switch_isModify(state) {
      state.isModify = !state.isModify;
    },
  },
  actions: {
    async checkSession({ commit }) {
      await axios
        .get("/users/auth", { withCredentials: true })
        .then(async (response) => {
          const { UserInfo, isLogin } = response.data;
          if (isLogin) {
            console.log(`세션 확인 성공: ${UserInfo.User_ID}`);
            console.log(`현재페이지: ${router.currentRoute.value.name}`);
            await commit("SET_USER_ID", UserInfo.User_ID);
            await commit("SET_PROFILE_IMG", UserInfo.Profile_Img);
            if (router.currentRoute.value.name === "Login" || router.currentRoute.value.name === "Singup") {
              router.push({ name: "HomeFeed" });
            }
          } else {
            console.log("세션 만료");
            console.log(`현재페이지: ${router.currentRoute.value.name}`);
            router.push({ name: "Login" });
            await commit("SET_USER_ID", null);
          }
        })
        .catch((error) => {
          console.error("세션 확인 실패:", error);
        });
    },
  },
});

export default store;
