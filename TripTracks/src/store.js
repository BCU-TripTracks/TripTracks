import { createStore } from "vuex";
import axios from "./axios";

const store = createStore({
  state() {
    return {
      isLogin: false,
      isNoti: false,
      isMsg: false,
      isWrite: false,
      isFollow: false,
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
    },
  },
  actions: {
    checkSession({ commit }) {
      axios
        .get("/users/auth", { withCredentials: true })
        .then((response) => {
          commit("SET_LOGIN_STATE", response.data.isLogin);
        })
        .catch((error) => {
          console.error("세션 확인 실패:", error);
        });
    },
  },
});

export default store;
