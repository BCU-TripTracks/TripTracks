<script setup>
import { defineProps } from "vue";
const props = defineProps({
  Type: String,
  ID: String,
});
</script>

<template>
  <div class="Unit tcdark" :style="!Type || !ID ? { filter: 'blur(2.5px)' } : {}">
    <div class="Title">호기 ID</div>
    <div class="Content">{{ Type }}-{{ ID }}</div>
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
