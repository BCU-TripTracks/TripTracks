<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { useStore } from "vuex";
import axios from "../axios";
import { useRouter } from "vue-router";
import ProfileImage from "../assets/img/ProfileImage.png";
import planning from "./planning.vue";
import Swal from "sweetalert2";

const router = useRouter();
const store = useStore();

const selectedMenu = ref("saved");
const tag = ref("");
const results = ref([]);
const image = ref(null);
const imagePreview = ref(ProfileImage);
const isMsg = computed(() => store.state.isMsg);
const User_Pwd = ref("");
const Input_Img = ref(null);
const _img = ref(null);
const click_Msg = () => {
  store.commit("Switch_isMsg");
};
const Profile_Info = ref([]);
const Saved_Data = ref([]); // 저장된 게시물 데이터를 위한 변수 추가
const plans = ref([]); // My Plan 데이터를 저장하는 변수
const Planning_ID = computed(() => store.state.planningID);

// My Plan 데이터를 불러오는 함수
const loadMyPlans = () => {
  axios
    .get("/feeds/my_plan", { withCredentials: true })
    .then((res) => {
      if (Array.isArray(res.data.plan)) {
        console.log("plans array received:", res.data.plan);
        // 백엔드에서 받은 데이터는 2차 배열 형태이므로, 이를 적절히 변환
        plans.value = res.data.plan.map((planArray) => ({
          planning_ID: planArray.planning_ID, // 첫 번째 요소: planning_ID
          planning_title: planArray.planning_title, // 두 번째 요소: planning_title
          User_ID: planArray.User_ID, // 세 번째 요소: User_ID
        }));
      } else {
        console.warn("Plans response is not an array:", res.data.plan);
      }
    })
    .catch((err) => {
      console.error("Failed to load plans:", err);
    });
};

const removePlan = async (index) => {
  Swal.fire({
    title: "정말로 계획을 삭제하시겠습니까?",
    text: "삭제된 계획은 되돌릴 수 없습니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "삭제",
    cancelButtonText: "취소",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // 해당 계획을 삭제하는 요청
        await axios.post(
          `/feeds/Plan_delete`,
          { planning_ID: plans.value[index].planning_ID },
          { withCredentials: true }
        );

        // 삭제 성공 후 알림
        Swal.fire("계획이 삭제되었습니다!", "성공!");

        // 페이지 새로고침
        window.location.reload(); // 라우터를 사용하지 않고 전체 페이지 새로고침
      } catch (err) {
        console.log("Failed to delete plan:", err);
        Swal.fire("삭제 실패", "계획 삭제에 실패했습니다.", "error");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        "계획 삭제가 취소되었습니다.",
        "삭제가 취소되었습니다.",
        "error"
      );
    }
  });
};

const loadSavedPosts = () => {
  axios
    .post(
      "/Feeds/Ambass_Save_List",
      { User_ID: store.state.User_ID },
      { withCredentials: true }
    )
    .then((res) => {
      console.log("Saved Posts:", res.data);
      Saved_Data.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const openModify = async (planning_ID) => {
  store.commit("SET_PLANNINGID", planning_ID); // Vuex 상태 업데이트
  await nextTick(); // 상태 반영 후 실행
  selectedMenu.value = "planning"; // 메뉴 변경
};

// const openModify = (planning_ID) => {
//   selectedMenu.value = "planning";
//   planningID.value = planning_ID;

//   // router.push({ name: "planmodify", params: { planning_ID } });
// };

// saved 메뉴 클릭 시 저장된 게시물 로드
const selectSaved = () => {
  selectedMenu.value = "saved";
  loadSavedPosts();
};
const selectPlanning = () => {
  store.commit("SET_PLANNINGID", null);
  selectedMenu.value = "planning";
};

// My Plan 메뉴 클릭 시 호출되는 함수
const selectMyPlan = () => {
  selectedMenu.value = "myplan";
  loadMyPlans(); // My Plan 데이터 로드
};

watch(
  () => Planning_ID.value, // computed로 Vuex 상태 접근
  async (newPlanningID) => {
    if (!newPlanningID) {
      return;
    }
    console.log("planning.vue - Received Planning_ID:", newPlanningID);

    try {
      const response = await axios.get(
        `/feeds/my_plan_detail/${newPlanningID}`,
        {
          withCredentials: true,
        }
      );

      console.log("planning.vue - API Response:", response.data);

      const planning = response.data.planning;
      if (!planning) {
        console.error("Planning data is undefined or null");
        return;
      }

      title.value = planning.planning_title || "";
      travelDays.value = planning.travelDays.map((day) => ({
        day: `Day ${day.day}`,
        places: day.places.map((place) => ({
          place_name: place.place_name,
          address: place.address || "주소 정보 없음",
          y: place.y,
          x: place.x,
        })),
      }));

      currentDay.value = 1;
    } catch (error) {
      console.error("Error fetching planning data:", error);
    }
  },
  { immediate: true } // 컴포넌트가 로드될 때 바로 실행
);

// 마운트 됐을 때
onMounted(() => {
  selectedMenu.value = "saved";
  loadSavedPosts(); // 초기 화면에서 저장된 게시물 데이터를 로드
  axios
    .get("/profile/profile_load", { withCredentials: true })
    .then((res) => {
      Profile_Info.value = res.data;
      imagePreview.value = res.data.Profile_Img;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<template>
  <div class="container">
    <div class="submenu">
      <span class="saved" @click="selectSaved">Saved</span>
      <span class="planning" @click="selectPlanning">Planning</span>
      <span class="myplan" @click="selectMyPlan">My Plan</span>
    </div>

    <div v-if="selectedMenu === 'saved'" class="sub">
      <div class="feedSlider">
        <div
          class="grid-article"
          v-for="Post in Saved_Data"
          :key="Post.Post_ID"
        >
          <router-link
            :to="{ name: 'FeedDetail', params: { Post_ID: Post.Post_ID } }"
          >
            <img :src="Post.Image_Src" alt="" class="Eximage" />
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="selectedMenu === 'planning'" class="map">
      <planning />
    </div>

    <div v-if="selectedMenu === 'myplan'" class="sub">
      <!-- My Plan 데이터를 순회하여 처리 -->
      <div v-for="(plan, index) in plans" :key="index" class="plan-card">
        <span class="plan-header">
          <h3 class="plan-title" @click="openModify(plan.planning_ID)">
            {{ plan.planning_title }}
          </h3>
          <button @click="removePlan(index)" class="remove-plan-btn">X</button>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-top: 10px;
  margin-right: auto;
}
.submenu {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 20px 4.5em;
  width: 60em;
  border: 1px solid #eaeaea;
  border-radius: 20px 20px 0 0;
}
.profilecontainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 20px;
}
.commentdetail {
  display: flex;
  flex-direction: row;
}
.profilebox {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.photobox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1em 2em 2em 2em;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.buttonbox {
  display: flex;
  flex-direction: row;
  margin-bottom: 2em;
}
.photochange {
  display: flex;
  background-color: black;
  color: white;
}
.caption {
  display: flex;
  width: 300px;
  height: 200px;
  padding-top: 10px;
  margin-bottom: 5px;
  text-indent: 10px;
  resize: none;
}
.selectphoto {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
label {
  cursor: pointer;
  font-size: 1em;
  padding: 0.5em 1em;
}
.infocontainer {
  display: flex;
  flex-direction: column;
  margin: 2em;
}
.userID {
  margin-left: 1em;
}
.userName {
  margin-left: 1em;
}
.userPassword {
  margin-left: 1em;
  width: 200px;
}
.pwdbox {
  display: flex;
}
.pwdbutton {
  display: flex;
  background-color: black;
  color: white;
  padding: 0.3em 0.5em;
  margin-left: 0.5em;
}
.captionbox {
  margin: 1em;
}
.captionchange {
  display: flex;
  background-color: black;
  color: white;
  padding: 0.5em 0.7em;
  margin: auto;
}
.liketag {
  border: 1px solid #eaeaea;
  border-radius: 20px;
  margin-top: 2em;
  padding: 2em;
}
.inputtag {
  width: 300px;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-right: auto;
  padding: 5px 0px 5px 0px;
  text-indent: 10px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #eaeaea;
}
.tagresult {
  height: 15em;
  max-width: 280px;
  overflow-y: scroll;
}
.deleteTagButton {
  background-color: #eaeaea;
  border: none;
  border-radius: 10px;
  padding: 2px;
  margin-right: 5px;
}
.deleteTagButton:hover {
  cursor: pointer;
}
.saved:hover {
  cursor: pointer;
  font-weight: bold;
  opacity: 0.7;
}
.planning:hover {
  cursor: pointer;
  font-weight: bold;
  opacity: 0.7;
}
.myplan:hover {
  cursor: pointer;
  font-weight: bold;
  opacity: 0.7;
}
.map {
  width: 60em;
  height: auto;
  justify-content: center;
  align-items: center;
  border: 1px solid #eaeaea;
  border-top: 0;
  border-bottom: 0;
}
.planList {
  border-left: 1px solid #eaeaea;
  border-right: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  font-size: 20px;
  padding: 1em 21.62em;
}
.plan-card {
  min-height: 3em;
  width: 60em;
  padding: 2.5em;
  border: 1px solid #eaeaea;
  border-top: none;
}
.plan-title {
  display: flex;
  font-size: 1.5em;
  font-weight: bold;
  justify-content: center;
}
.plan-title:hover {
  cursor: pointer;
  opacity: 0.7;
}
.sub {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
  width: 65.7em;
}
.subdetail {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 1em;
  width: 60em;
  margin-bottom: 2em;
  border-bottom: 1px solid #eaeaea;
}
.likes {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.feedSlider {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  columns: 4;
  column-gap: auto;
  align-items: center;
}
.grid-article {
  display: flex;
  width: calc(20% - 20px);
  text-align: center;
  border: none;
  margin: 1px;
}
.Eximage {
  margin-left: auto;
  margin-right: auto;
  display: block;
  height: 13rem;
  width: 11.9rem;
  border: none;
}

.create {
  width: 30%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.plan-card {
  position: relative; /* For positioning the X button */
  min-height: 3em;
  width: 60em;
  padding: 2.5em;
  border: 1px solid #eaeaea;
  border-top: none;
}

.plan-header {
  display: flex;
  justify-content: center; /* Center the title */
  align-items: center;
  width: 100%;
  position: relative; /* Relative to place the X button */
}

.plan-title {
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  flex-grow: 1; /* Ensure the title takes available space */
}

.remove-plan-btn {
  position: absolute; /* Position the button on top-right */
  top: 10px;
  right: 10px;
  background-color: #dc4939;
  padding: 5px;
  border: none;
  cursor: pointer;
  color: white;
}

.remove-plan-btn:hover {
  opacity: 0.7;
}
</style>
