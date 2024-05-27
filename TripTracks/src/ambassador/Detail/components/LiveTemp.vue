<script setup>
import { ref, defineProps, onMounted } from "vue";

const props = defineProps({
  Live_Temp: Array,
});
onMounted(() => {});
</script>

<template>
  <div class="Unit tcdark" :style="!Live_Temp ? { filter: 'blur(2.5px)' } : {}">
    <div class="Title">Live Temperature</div>
    <div class="Content">
      <span v-show="Live_Temp[0] && Live_Temp !== 99.9">
        {{ Live_Temp[0] }}
      </span>
      <span v-show="Live_Temp[1] && Live_Temp[1] !== 99.9"> / {{ Live_Temp[1] }} </span>
    </div>
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
