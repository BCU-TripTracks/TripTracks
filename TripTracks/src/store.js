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
      isPostDM: false,
      isSearch: false,
      _PostID: "",
      planningID: "",
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
    async Switch_isPostDM(state, PostID) {
      state._PostID = PostID;
      state.isPostDM = !state.isPostDM;
    },
    Switch_isFollow(state) {
      state.isFollow = !state.isFollow;
    },
    SET_PLANNINGID(state, planningID) {
      state.planningID = planningID;
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
    Switch_isSearch(state) {
      state.isSearch = !state.isSearch;
    },
  },
  actions: {
    async checkSession({ commit }) {
      await axios
        .get("/users/auth", { withCredentials: true })
        .then(async (response) => {
          const { UserInfo, isLogin } = response.data;
          if (isLogin) {
            socket.emit("login", UserInfo.User_ID);
            console.log(`세션 확인 성공: ${UserInfo.User_ID}`);
            console.log(`현재페이지: ${router.currentRoute.value.name}`);
            await commit("SET_USER_ID", UserInfo.User_ID);
            await commit("SET_PROFILE_IMG", UserInfo.Profile_Img);
            if (
              router.currentRoute.value.name === "Login" ||
              router.currentRoute.value.name === "Singup"
            ) {
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
    async loadPlanningData({ commit }, planningID) {
      try {
        const response = await axios.get(`/feeds/planning/${planningID}`, {
          withCredentials: true,
        });
        console.log("Planning Data Loaded:", response.data);

        // 필요한 데이터를 Vuex 상태에 저장 (예: planningData 추가)
        commit("SET_PLANNINGID", planningID);
        // 예: commit("SET_PLANNING_DATA", response.data);
      } catch (error) {
        console.error("Error loading planning data:", error);
      }
    },
  },
});

export default store;
