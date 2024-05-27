<template>
  <div class="unit">
    <div class="title">댓글수</div>
    <div class="content">
      <div class="score">
        <span class="value">{{ Now_Comment }}</span>
      </div>
      <div class="diff">
        <span :class="{ positive: diff_Comment >= 0, negative: diff_Comment < 0 }" class="value">{{
          diff_Comment >= 0 ? `+ ${diff_Comment}▲` : `${diff_Comment}▼`
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "../../../axios";

const Now_Comment = ref(0);
const Last_Comment = ref(0);

const diff_Comment = computed(() => Now_Comment.value - Last_Comment.value);

onMounted(async () => {
  axios
    .get("/ambassador/Setup_Comment", { withCredentials: true })
    .then((res) => {
      const { Comment_Info } = res.data;
      Now_Comment.value = Comment_Info.Now_Comment;
      Last_Comment.value = Comment_Info.Last_Comment;
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
