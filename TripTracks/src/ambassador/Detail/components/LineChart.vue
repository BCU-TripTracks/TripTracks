<script setup>
import { defineProps } from "vue";
const props = defineProps({
  LiveTime: String,
});
</script>

<template>
  <div class="Unit tcdark">
    <div class="Title">현재시간</div>
    <div class="Content">{{ LiveTime }}</div>
  </div>
</template>

<style lang="scss" scoped>
.Unit {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.Title {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.25rem;
}
.Content {
  font-weight: 600;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}
</style>
