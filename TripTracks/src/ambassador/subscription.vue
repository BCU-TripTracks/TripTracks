<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "../axios";

const router = useRouter();
const checked = ref(false);

onMounted(() => {});

const send = () => {
  if (!checked.value) {
    alert("약관에 동의해주세요.");
    return;
  }
  axios.get("/users/sub_ambass", { withCredentials: true }).then((res) => {
    if (res.data.success) {
      alert("앰버서더 신청이 완료되었습니다.");
      router.push({ name: "HomeFeed" });
    } else {
      alert("앰버서더 신청에 실패했습니다.");
    }
  });
};
</script>

<template>
  <div class="main-container">
    <div class="header">TripTracks</div>
    <div class="content">
      <div class="step1-container">
        <div class="main-content">
          <h1 class="title">앰버서더 신청 안내</h1>
          <textarea class="textZone" readonly>
            앰버서더가 되기 위해서는 다음의 조건을 충족해야 합니다:
            (현재는 테스트를 위해 임시로 설정된 조건입니다. 추후 변경될 수 있습니다.)
            (테스트를 위해 임시적으로 설정되었으며 지금은 누구나 앰버서더가 될 수 있습니다.)
    
            - 한 주에 1회 이상의 여행지 정보를 담은 피드를 작성해야 합니다.
            - 여행지 정보를 담은 피드를 작성할 때마다 10포인트가 적립됩니다.
            - 다른 사용자들이 여행지 정보를 담은 피드를 좋아요 또는 댓글을 달면 1포인트가 적립됩니다.
            - 다른 사용자가 여행지 정보를 담은 피드를 스크랩하면 5포인트가 적립됩니다.
            - 앰버서더 포인트는 매달 초기화됩니다.
            - 앰버서더는 매달 100포인트 이상을 적립해야 유지됩니다. 
          </textarea>
          <div class="checkZone">
            <input type="checkbox" id="agreement" v-model="checked" />
            <label for="agreement"> 위 정보를 확인하였습니다.</label>
          </div>
        </div>
        <div class="btnZone">
          <router-link :to="{ name: 'HomeFeed' }" class="prevBtn">이전</router-link>
          <div class="nextBtn" @click="send()">신청하기</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  user-select: none;
}
.step1-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: auto;
  background-color: #ffffff;
}
.main-content {
  padding: 20px;
  border: 1px solid #e0e0e0;
}
.title {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}
.textZone {
  width: 100%;
  height: 300px; /* 적절한 높이 설정 */
  border: none;
  resize: none; /* 사용자가 크기 조절 못하게 설정 */
  overflow: auto;
}
.checkZone {
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 0.5rem;
}
.btnZone {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}
.prevBtn,
.nextBtn {
  padding: 10px 20px;
  text-decoration: none;
  color: white;
  border-radius: 5px;
}
.prevBtn {
  background-color: #6c757d;
}
.nextBtn {
  background-color: #007bff;
}
.main-container {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
.header {
  padding: 2rem 0;
  font-size: 2rem;
  font-weight: bold;
}
.content {
  flex-grow: 1;
  width: 100%;
  height: 100%;

  display: flex;
}
</style>
