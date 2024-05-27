<template>
  <div class="unit">
    <div class="title">앰버서더 점수</div>
    <div class="content">
      <div class="score">
        <span class="value">{{ Now_Score }}</span>
      </div>
      <div class="diff">
        <span :class="{ positive: diffScore >= 0, negative: diffScore < 0 }" class="value">{{
          diffScore >= 0 ? `+ ${diffScore}▲` : `${diffScore}▼`
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "../../../axios";

const Now_Score = ref(0);
const Last_Score = ref(0);

const diffScore = computed(() => Now_Score.value - Last_Score.value);

onMounted(async () => {
  axios
    .get("/ambassador/Setup_Score", { withCredentials: true })
    .then((res) => {
      const { Score_Info } = res.data;
      Now_Score.value = Score_Info.Now_Score;
      Last_Score.value = Score_Info.Last_Score;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<style scoped>
.unit {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.unit > .title {
  font-weight: 600;
  font-size: 1.2rem;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.unit > .content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.score,
.diff {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-weight: 500;
  color: #333;
}

.score > .value {
  font-size: 2rem;
  font-weight: 600;
}
.diff > .value {
  font-size: 1rem;
  font-weight: 500;
}

.value.positive {
  color: green;
}

.value.negative {
  color: red;
}
</style>
