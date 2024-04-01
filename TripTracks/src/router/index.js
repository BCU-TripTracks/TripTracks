// Vue Router 4와 함께 사용하기 위해 필요한 메서드를 임포트합니다.
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),

  // 라우트 정의
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/UserLogin.vue"),
    },
    {
      path: "/singup",
      name: "Singup",
      component: () => import("../views/UserSignup.vue"),
      children: [
        {
          path: "/step1",
          name: "Step1",
          component: () => import("../components/SignupStep1.vue"),
        },
        {
          path: "/step2",
          name: "Step2",
          component: () => import("../components/SignupStep2.vue"),
        },
      ],
    },
    {
      path: "/PersonalPage",
      name: "homeP",
      component: () => import("../views/PersonalPage.vue"),
    },
    {
      path: "/FeedDetail",
      name: "Detail",
      component: () => import("../views/FeedDetail.vue"),
    },
    {
      path: "/write",
      name: "Write",
      component: () => import("../components/write.vue"),
    },
    {
      path: "/notification",
      name: "Notification",
      component: () => import("../components/notification.vue"),
    },
  ],
});

// 생성한 라우터 객체를 export 합니다.
export default router;
