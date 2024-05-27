<script setup>
import { defineProps } from "vue";
const props = defineProps({
  Set_Temp: Number,
});
</script>

<template>
  <div class="Unit tcdark" :style="!Set_Temp && Set_Temp !== 0 ? { filter: 'blur(2.5px)' } : {}">
    <div class="Title">Set Temperature</div>
    <div class="Content">{{ Set_Temp }}</div>
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
