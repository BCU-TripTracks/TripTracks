<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";
import axios from "../../axios";

import Like_img96 from "../../assets/img/icons8-love-96.png";
import Like_img32 from "../../assets/img/icons8-love-32.png";
import Comments_img96 from "../../assets/img/icons8-comments-96.png";
import Comments_img32 from "../../assets/img/icons8-comments-32.png";
import LineChart from "./components/LineChart.vue";

const route = useRoute();
const store = useStore();
moment.locale("ko");

const currentPath = computed(() => route.path);
const Post_ID = computed(() => route.params.Post_ID);
const SelectedMenu = ref("Like");

const Post_Info = ref(null);
// 조회수(View)의 총합 계산
const totalViews = computed(() => {
  // Post_Info와 Logs가 정의되어 있는지 확인
  if (Post_Info.value && Post_Info.value.Logs) {
    return Post_Info.value.Logs.reduce((sum, log) => sum + log.View, 0);
  }
  return 0; // 로딩 전에는 0 반환
});

// 피드 시청수(Feed_Like)의 총합 계산
const totalFeedLikes = computed(() => {
  // Post_Info와 Logs가 정의되어 있는지 확인
  if (Post_Info.value && Post_Info.value.Logs) {
    return Post_Info.value.Logs.reduce((sum, log) => sum + log.Feed_Like, 0);
  }
  return 0; // 로딩 전에는 0 반환
});
// grid 레이아웃을 동적으로 조절
const List_class = computed(() => {
  if (SelectedMenu.value === "Like" || SelectedMenu.value === "Comment") {
    return "gcs3 gce5 grs2 gre4"; // 리스트가 보일 때
  } else {
    return "displaynone"; // 리스트가 숨겨질 때
  }
});

const chartClass = computed(() => {
  return SelectedMenu.value === "Like" || SelectedMenu.value === "Comment"
    ? "gcs5 gce7 grs2 gre4 small-chart"
    : "gcs3 gce7 grs2 gre4 large-chart";
});
// 차트에 사용할 데이터 정의
const chartLabels = ref(["January", "February", "March", "April", "May", "June", "July"]);
const chartData = ref([65, 59, 80, 81, 56, 55, 40]);
const chartLabel = ref("Sample Line Dataset");

onMounted(async () => {
  axios
    .post("/ambassador/Detail", { Post_ID: Post_ID.value }, { withCredentials: true })
    .then((res) => {
      const { post_info } = res.data;
      console.log(post_info);
      Post_Info.value = post_info;
      Post_Info.value.Comment_len = post_info.Comments.length;
      Post_Info.value.Like_len = post_info.Likes.length;
      Post_Info.value.Post_Create_Timestamp = moment(post_info.Post_Create_Timestamp).format("YY.MM.DD. HH:mm");
      Post_Info.value.Post_Edit_Timestamp = moment(post_info.Post_Edit_Timestamp).format("YY.MM.DD. HH:mm");
      chartLabel.value = "좋아요 변동";
      chartData.value = Post_Info.value.Logs.map((log) => log.Feed_Like);
      chartLabels.value = Post_Info.value.Logs.map((log) => moment(log.Date).format("YY.MM.DD"));
    })
    .catch((err) => {
      console.log(err);
    });
  watch(
    SelectedMenu,
    (val) => {
      if (val == "Like") {
        chartLabel.value = "좋아요 변동";
        chartData.value = Post_Info.value.Logs.map((log) => log.Feed_Like);
        chartLabels.value = Post_Info.value.Logs.map((log) => moment(log.Date).format("YY.MM.DD"));
      } else if (val == "Comment") {
        chartLabel.value = "댓글수 변동";
        chartData.value = Post_Info.value.Logs.map((log) => log.Comment);
        chartLabels.value = Post_Info.value.Logs.map((log) => moment(log.Date).format("YY.MM.DD"));
      } else if (val == "View") {
        chartLabel.value = "조회수 변동";
        chartData.value = Post_Info.value.Logs.map((log) => log.View);
        chartLabels.value = Post_Info.value.Logs.map((log) => moment(log.Date).format("YY.MM.DD"));
      } else if (val == "FeedView") {
        chartLabel.value = "피드 시청수 변동";
        chartData.value = Post_Info.value.Logs.map((log) => log.Detail_View);
        chartLabels.value = Post_Info.value.Logs.map((log) => moment(log.Date).format("YY.MM.DD"));
      }
    },
    { immediate: true }
  );
});
</script>

<template>
  <div class="home gp30 p30" v-if="Post_Info">
    <div v-if="Post_Info" class="grid gc3 gr1 gp10 img_List">
      <div class="flex br10" v-for="item in Post_Info.Images" :key="item">
        <img :src="item" />
      </div>
      <!-- <Comment /> -->
    </div>
    <div class="gird gc3 gr1 br10 gp10 post_info container-unit dropshadow">
      <div class="title">
        <h3>{{ Post_Info.Post_Title }}</h3>
        <p>
          <span>최초 작성일{{ Post_Info.Post_Create_Timestamp }}</span>
          <span>최종 수정일{{ Post_Info.Post_Edit_Timestamp }}</span>
        </p>
      </div>
      <div class="caption">
        {{ Post_Info.Post_Caption }}
      </div>
    </div>
    <!-- 요약 -->
    <div class="grid gc1 gr1 gcs1 grs2 br10 gp10 container-unit dropshadow totalbox" @click="SelectedMenu = 'Like'">
      <img :src="Like_img96" width="50px" />
      <div class="totaltitle">좋아요</div>
      <div class="totalvalue">{{ Post_Info.Like_len }}</div>
    </div>
    <div class="grid gc1 gr1 gcs2 grs2 br10 gp10 container-unit dropshadow totalbox" @click="SelectedMenu = 'Comment'">
      <img :src="Comments_img96" width="50px" />
      <div class="totaltitle">댓글</div>
      <div class="totalvalue">{{ Post_Info.Comment_len }}</div>
    </div>
    <div class="grid gc1 gr1 gcs1 grs3 br10 gp10 container-unit dropshadow totalbox" @click="SelectedMenu = 'View'">
      <div class="totaltitle">조회수</div>
      <div class="totalvalue">{{ totalViews }}</div>
    </div>
    <div class="grid gc1 gr1 gcs2 grs3 br10 gp10 container-unit dropshadow totalbox" @click="SelectedMenu = 'FeedView'">
      <div class="totaltitle">피드 시청수</div>
      <div class="totalvalue">{{ totalFeedLikes }}</div>
    </div>
    <div
      v-if="SelectedMenu == 'Like' || SelectedMenu == 'Comment'"
      class="grid gcs3 gce5 grs2 gre4 br10 gp10 container-unit dropshadow-none-hover"
    >
      <div class="List_Page Like_List" v-if="SelectedMenu == 'Like'">
        <div class="title">좋아요 목록</div>
        <router-link
          :to="{
            name: 'PersonalPage',
            params: { User_ID: item.User_ID },
          }"
          class="Like_Item"
          v-for="item in Post_Info.Likes"
          :key="item"
        >
          <img :src="item.Profile_Img" width="25px" />
          <div>{{ item.User_ID }}</div>
        </router-link>
      </div>
      <div class="List_Page Comment_List" v-else-if="SelectedMenu == 'Comment'">
        <div class="title">댓글 목록</div>
        <router-link
          :to="{
            name: 'PersonalPage',
            params: { User_ID: item.User_ID },
          }"
          class="Comment_Item"
          v-for="item in Post_Info.Comments"
          :key="item"
        >
          <div class="Comment_Item_Title">
            <img :src="item.Profile_Img" width="25px" class="ProfileImg" />
            <div>{{ item.User_ID }}</div>
          </div>
          <div class="Comment_Item_Content">
            {{ item.Comment }}
          </div>
        </router-link>
      </div>

      <div class="NonSelect" v-else>None</div>
    </div>
    <div
      v-if="SelectedMenu == 'Like' || SelectedMenu == 'Comment'"
      class="grid gcs5 gce7 grs2 gre4 br10 gp10 container-unit dropshadow-none-hover chart"
    >
      <LineChart :labels="chartLabels" :data="chartData" :label="chartLabel" />
    </div>

    <div v-else class="grid gcs3 gce7 grs2 gre4 br10 gp10 container-unit dropshadow-none-hover chart">
      <LineChart :labels="chartLabels" :data="chartData" :label="chartLabel" />
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
.img_List {
  display: flex;
  flex-direction: row;
  align-items: flex-end; /* 이미지 하단 정렬 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  overflow-x: scroll; /* 가로 스크롤 활성화 */
  white-space: nowrap; /* 이미지들이 한 줄에 나란히 배치되도록 설정 */
}
.img_List img {
  max-width: 120px;
  min-width: 100px;
  width: 100%;
  margin: 10px;
  border-radius: 10px;
  object-fit: contain;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 애니메이션 효과 */
}

.img_List img:hover {
  transform: scale(1.1); /* 이미지 확대 */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); /* 그림자 효과 추가 */
}
.post_info {
  display: grid;
  grid-template-rows: 2rem 1fr;
  padding: 1rem;
  gap: 1.5rem;
  overflow: hidden;
}
.post_info > .title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.post_info > .title > h3 {
  font-size: 1.5rem;
  font-weight: 600;
}
.post_info > .title > p {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #626262;
}
.post_info > .caption {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  color: #626262;
}
.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
}
.btm {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.totalbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.totalbox:hover {
  transform: scale(1.05); /* 이미지 확대 */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); /* 그림자 효과 추가 */
}
.totaltitle {
  font-size: 1.2rem;
  font-weight: 600;
}
.totalbox > .totalvalue {
  font-size: 1.5rem;
  font-weight: 600;
}

.btm > .List {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.List_Page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  overflow: hidden;
  overflow-y: scroll;
}
.List_Page > .title {
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 2.5px solid #e0e0e0;
}
.List_Page > .Like_Item {
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 10px;
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
}
.List_Page > .Like_Item:hover {
  background-color: #f0f0f0;
}
.List_Page > .Like_Item > img {
  border-radius: 100%;
  width: 25px;
  height: 25px;

  object-fit: cover; /* 비율을 유지하며 부모 요소에 맞게 조정 */
  object-position: center; /* 이미지의 중앙을 기준으로 배치 */
}
.List_Page > .Comment_Item {
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 10px;
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
}
.List_Page > .Comment_Item:hover {
  background-color: #f0f0f0;
}
.List_Page > .Comment_Item > .Comment_Item_Title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
}
.Like_Item > .Comment_Item .Comment_Item_Title img {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  object-fit: cover; /* 비율을 유지하며 부모 요소에 맞게 조정 */
  object-position: center; /* 이미지의 중앙을 기준으로 배치 */
}
.ProfileImg {
  border-radius: 100%;
  width: 25px;
  height: 25px;
  object-fit: cover; /* 비율을 유지하며 부모 요소에 맞게 조정 */
  object-position: center; /* 이미지의 중앙을 기준으로 배치 */
}
.displaynone {
  display: none;
}
.chart {
  overflow: hidden;
  transition: all 0.5s ease;
}
/* 차트의 작은 크기 */
.small-chart {
  transition: grid-column 0.5s ease, grid-row 0.5s ease;
}

/* 차트의 큰 크기 */
.large-chart {
  transition: grid-column 0.5s ease, grid-row 0.5s ease;
}
</style>
