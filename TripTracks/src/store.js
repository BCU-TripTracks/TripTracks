import { createStore } from "vuex";
import axios from "./axios";
import socket from "./socket";

const store = createStore({
  state() {
    return {
      isLogin: false,
      isNoti: false,
      isMsg: false,
      isWrite: false,
      isFollow: false,
      isLike: false,
      isSave: false,
      user_ID: "",
    };
  },
  mutations: {
    SET_LOGIN_STATE(state, isLogin) {
      state.isLogin = isLogin;
    },
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
    Switch_isLogin(state) {
      state.isLogin = !state.isLogin;
      console.log(
        `Switching login state to: ${state.isLogin}, emitting event...`
      );
    },
    SET_USER_ID(state, user_ID) {
      state.user_ID = user_ID;
    },
    // SET_USER_ID(state, user_ID) {
    //   state.user_ID = yw1;
    // },
    Switch_isLike(state) {
      state.isLike = !state.isLike;
    },
    Switch_isSave(state) {
      state.isSave = !state.isSave;
    },
  },
  actions: {
    async checkSession({ commit }) {
      await console.log("checkSession코드 시작됨");
      await axios
        .get("/users/auth", { withCredentials: true })
        .then(async (response) => {
          await console.log("API요청 도착");
          await console.log(response);
          await console.log(response.data);
          if (response.data.isLogin) {
            await commit("SET_USER_ID", response.data.User_ID);
            await console.log("commit(SET_USER_ID, response.data.User_ID)");
            await console.log(response.data.User_ID);
          } else {
            await commit("SET_LOGIN_STATE", response.data.isLogin);
            await console.log("SET_LOGIN_STATE response.data.isLogin");
            await console.log(response.data.User_ID);
          }
        })
        .catch((error) => {
          console.error("세션 확인 실패:", error);
        });
      await console.log("checkSession코드 실행완려");
    },
  },
});

export default store;
