import { createApp } from "vue";
import "/style.css";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";

import "./assets/WantedSans.css";
import "./assets/style.css";

const app = createApp(App);

app.use(router).use(store).mount("#app");
