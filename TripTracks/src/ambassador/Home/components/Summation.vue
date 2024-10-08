<template>
  <div class="unit">
    <div class="top-zone">
      <div class="title">요약 (기능명 예명)</div>
      <ul>
        <li :class="{ select: Selected_Mode == 'View' }" @click="Selected_Mode = 'View'">
          &nbsp;&nbsp;노출순&nbsp;&nbsp;
        </li>
        <li :class="{ select: Selected_Mode == 'Detail_View' }" @click="Selected_Mode = 'Detail_View'">
          &nbsp;&nbsp;피드 시청순&nbsp;&nbsp;
        </li>
        <li :class="{ select: Selected_Mode == 'Like' }" @click="Selected_Mode = 'Like'">
          &nbsp;&nbsp;좋아요순&nbsp;&nbsp;
        </li>
        <li :class="{ select: Selected_Mode == 'Comment' }" @click="Selected_Mode = 'Comment'">
          &nbsp;&nbsp;댓글순&nbsp;&nbsp;
        </li>
      </ul>
    </div>
    <div class="content" ref="content" @wheel="contentWheel">
      <router-link
        :to="{ name: 'AmbassadorFeedHistory', params: { Post_ID: post.Post_ID } }"
        class="content_unit"
        v-for="post in Post_Log"
        :key="post"
      >
        <img :src="post.Image_Src" class="image-mini-view" />

        <span class="title">{{ post.Post_Title }}</span>
        <span class="content">{{ post.Post_Caption }}</span>
        <span class="value">전달대비 조회수: {{ post.Diff_View }} {{ post.Diff_View >= 0 ? "▲" : "▼" }}</span>
        <span class="value"
          >전달대비 피드시청: {{ post.Diff_Detail_View }} {{ post.Diff_Detail_View >= 0 ? "▲" : "▼" }}</span
        >
        <span class="value">전달대비 좋아요: {{ post.Diff_Feed_Like }} {{ post.Diff_Feed_Like >= 0 ? "▲" : "▼" }}</span>
        <span class="value">전달대비 댓글: {{ post.Diff_Comment }} {{ post.Diff_Comment >= 0 ? "▲" : "▼" }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "../../../axios";

const Selected_Mode = ref(null);
const content = ref();
const Post_Log = ref([]);

onMounted(async () => {
  if (Selected_Mode.value == null) Selected_Mode.value = "View";
});

watch(Selected_Mode, async () => {
  console.log(Selected_Mode.value);
  axios
    .post("/ambassador/Search_Summation", { Type: Selected_Mode.value }, { withCredentials: true })
    .then((res) => {
      const { Post_Log_List } = res.data;
      Post_Log.value = Post_Log_List;
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

const contentWheel = (e) => {
  const scroll = content.value.scrollLeft; // .value로 DOM 요소 접근
  const wheel = e.deltaY;

  // scrollTo를 사용해 부드러운 스크롤 효과 추가
  content.value.scrollTo({
    left: scroll + wheel * 2, // 스크롤 속도를 적절히 조절 (곱하기 값 조정 가능)
    behavior: "smooth", // 부드러운 스크롤 동작
  });
};
</script>

<style scoped>
.unit {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  overflow: hidden;
}

.unit > .top-zone {
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5rem;
}
.unit > .top-zone > .title {
  font-weight: 600;
  font-size: 1.2rem;
}
.unit > .top-zone > ul {
  display: flex;
  margin-left: auto;
}
.unit > .top-zone > ul > li {
  font-size: 1rem;
  cursor: pointer;

  border-bottom: 2px solid #3333332f;
  box-sizing: border-box;
}
.unit > .top-zone > ul > li:hover {
  border-bottom: 3px solid #33333391;
  box-sizing: border-box;
}
.unit > .top-zone > ul > .select {
  font-weight: 600;
  color: #333;

  border-bottom: 4px solid #333 !important;
  box-sizing: border-box;
}
li {
  list-style: none;
}

.unit > .content {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;
  width: 100%;
  overflow-x: scroll;
  scrollbar-width: 1px;
}
.unit > .content > .content_unit {
  padding: 1rem;
  min-width: 300px;
  max-width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  transition: background-color 0.8s ease; /* 0.8초 동안 부드럽게 변화 */
}
.unit > .content > .content_unit:hover {
  background-color: #f0f0f0;
}
.unit > .content > .content_unit > .image-mini-view {
  height: 50%;
  background-color: #d8d8d8;
}
.unit > .content > .content_unit > span {
  width: 100%;
}
.unit > .content > .content_unit > .title {
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.unit > .content > .content_unit > .content {
  font-size: 0.75rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.unit > .content > .content_unit > .value {
  font-size: 0.8rem;
  align-items: start;
}
.content_unit > * {
  color: #000;
  text-decoration: none;
  outline: none;
}
</style>
