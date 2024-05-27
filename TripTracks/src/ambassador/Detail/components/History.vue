<script setup>
// import { defineProps } from "vue";
// const props = defineProps({
//   LiveTime: String,
// });
</script>

<template>
  <div class="Unit tcdark">
    <div class="Content">History</div>
  </div>
</template>

<style lang="scss" scoped>
.Unit {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.Title {
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.25rem;
}
.Content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}
</style>
