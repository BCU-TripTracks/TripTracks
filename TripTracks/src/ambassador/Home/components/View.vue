<template>
  <div class="unit">
    <div class="title">노출수</div>
    <div class="content">
      <div class="score">
        <span class="value">{{ Now_View }}</span>
      </div>
      <div class="diff">
        <span :class="{ positive: diff_View >= 0, negative: diff_View < 0 }" class="value">{{
          diff_View >= 0 ? `+ ${diff_View}▲` : `${diff_View}▼`
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "../../../axios";

const Now_View = ref(0);
const Last_View = ref(0);

const diff_View = computed(() => Now_View.value - Last_View.value);

onMounted(async () => {
  axios
    .get("/ambassador/Setup_View", { withCredentials: true })
    .then((res) => {
      const { View_Info } = res.data;
      Now_View.value = View_Info.Now_View;
      Last_View.value = View_Info.Last_View;
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
