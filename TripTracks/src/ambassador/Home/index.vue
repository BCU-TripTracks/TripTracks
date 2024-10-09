<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "../../axios";

import Score from "./components/score.vue";
import Follower from "./components/Follower.vue";
import View from "./components/View.vue";
import Detail_View from "./components/Detail_View.vue";
import Like from "./components/Like.vue";
import Comment from "./components/Comment.vue";
import Summation from "./components/Summation.vue";

const route = useRoute();
const store = useStore();

const currentPath = computed(() => route.path);
</script>

<template>
  <div class="home gp30 p30">
    <!-- 앰버서더 점수 -->
    <div class="grid gt1 gp10 br10 container-unit dropshadow-none-hover">
      <Score />
    </div>
    <!-- 팔로우 -->
    <div class="grid gt1 gp10 br10 container-unit dropshadow-none-hover">
      <Follower />
    </div>
    <!-- 노출수 -->
    <div class="grid gt1 gp10 br10 container-unit dropshadow-none-hover">
      <View />
    </div>
    <!-- 피드조회수 -->
    <div class="grid gt1 gp10 br10 container-unit dropshadow-none-hover">
      <Detail_View />
    </div>
    <!-- 좋아요수 -->
    <div class="grid gt1 gp10 br10 container-unit dropshadow-none-hover">
      <Like />
    </div>
    <!-- 댓글수 -->
    <div class="grid gt1 gp10 br10 container-unit dropshadow-none-hover">
      <Comment />
    </div>
    <!-- 요약 -->
    <div class="grid gc5 gr2 gp10 br10 container-unit dropshadow-none-hover">
      <Summation />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
</style>
