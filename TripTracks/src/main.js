import { createApp } from "vue";
import "/style.css";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import axios from "axios";

const app = createApp(App);

const axiosInstance = axios.create({
  // 여기에 기본 설정을 할 수 있습니다. 예: baseURL: "http://your-api-url.com"
  baseURL: "http://TripTracks.co.kr/API",
});

// 모든 컴포넌트에서 `$axios`를 사용하여 Axios 인스턴스에 접근할 수 있도록 합니다.
app.config.globalProperties.$axios = axiosInstance;

app.use(router).use(store).mount("#app");
