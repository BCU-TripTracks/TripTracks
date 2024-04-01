import { createStore } from "vuex";
import axios from "./axios";

const store = createStore({
  state() {
    return {
      isLogin: false,
    };
  },
  mutations: {
    SET_LOGIN_STATE(state, isLogin) {
      state.isLogin = isLogin;
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
