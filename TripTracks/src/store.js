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
      console.log(`Switching login state to: ${state.isLogin}, emitting event...`);
    },
    SET_USER_ID(state, user_ID) {
      state.user_ID = user_ID;
    },
    Switch_isLike(state) {
      state.isLike = !state.isLike;
    },
    Switch_isSave(state) {
      state.isSave = !state.isSave;
    },
  },
  actions: {
    checkSession({ commit }) {
      axios
        .get("/users/auth", { withCredentials: true })
        .then((response) => {
          if (response.data.User_ID) commit("SET_USER_ID", response.data.User_ID);
          commit("SET_LOGIN_STATE", response.data.isLogin);
        })
        .catch((error) => {
          console.error("세션 확인 실패:", error);
        });
    },
  },
});

export default store;
