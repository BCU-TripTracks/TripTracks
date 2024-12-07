// Vue Router 4와 함께 사용하기 위해 필요한 메서드를 임포트합니다.
import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const router = createRouter({
  history: createWebHistory(),

  // 라우트 정의
  routes: [
    {
      path: "/Home",
      name: "Home",
      component: () => import("../views/Home.vue"),
      children: [
        {
          path: "", // 홈으로 라우팅될 때의 경로
          name: "HomeFeed",
          component: () => import("../components/HomeFeed.vue"),
        },
        {
          path: "feeddetail/:Post_ID", // 홈의 하위 경로
          name: "FeedDetail",
          component: () => import("../components/FeedDetail.vue"),
          props: true,
        },
        {
          path: "personalPage/:User_ID",
          name: "PersonalPage",
          component: () => import("../components/PersonalPage.vue"),
          props: true, // 동적 파라미터를 props로 받을 수 있게 설정
        },
        {
          path: "mypage",
          name: "myPage",
          component: () => import("../components/myPage.vue"),
        },
        {
          path: "followingtab",
          name: "followingtab",
          component: () => import("../components/FollowingTab.vue"),
        },
        {
          path: "searcingtab",
          name: "searcingtab",
          component: () => import("../components/SearcingTab.vue"),
        },
        {
          path: "popularitytab",
          name: "popularitytab",
          component: () => import("../components/PopularityTab.vue"),
        },
        {
          path: "planner",
          name: "planner",
          component: () => import("../components/planner.vue"),
          children: [
            {
              path: "planning/:planning_ID?", // planning_ID를 선택적으로 받을 수 있도록 설정
              name: "planning",
              component: () => import("../components/planning.vue"),
              props: true, // planning_ID를 props로 전달
            },
          ],
        },
        {
          path: "modify",
          name: "modify",
          component: () => import("../components/modify.vue"),
        },
      ],
    },
    {
      path: "/DirectMessage",
      name: "DirectMessage",
      component: () => import("../DirectMessage/DMHome.vue"),
      children: [
        {
          path: "Room/:Room_ID",
          name: "Room",
          component: () => import("../DirectMessage/DMRoom.vue"),
        },
      ],
    },
    {
      path: "/ambassador",
      name: "Ambassador",
      component: () => import("../ambassador/AppLayout.vue"),
      redirect: "/ambassadorHome",
      children: [
        {
          path: "/ambassadorHome",
          name: "AmbassadorHome",
          component: () => import("../ambassador/Home/index.vue"),
        },
        {
          path: "/FeedHistory/:Post_ID",
          name: "AmbassadorFeedHistory",
          component: () => import("../ambassador/FeedHistory/index.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/subcription",
      name: "Subscription",
      component: () => import("../ambassador/subscription.vue"),
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
  ],
});

export default router;
