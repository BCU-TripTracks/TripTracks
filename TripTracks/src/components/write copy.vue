<script setup>
import { ref } from "vue";

const tag = ref("");
const results = ref([]);

const printAndClear = () => {
  results.value.push(tag.value);
  tag.value = "";
};
</script>

<template>
  <div class="writecontainer">
    <div class="tagbox">
      <input
        type="text"
        v-model="tag"
        @keyup.enter="printAndClear"
        placeholder="Tag"
      />
      <span id="result">{{ results.join(", ") }}</span>
    </div>
    <div class="articlecontainer">
      <div class="articlebox">
        <div class="box">1</div>
        <div class="box">1</div>
        <div class="box">1</div>
        <div class="box">1</div>
      </div>
    </div>

    <div class="articlecomment">
      <input type="text" placeholder="comment를 입력하세요." />
    </div>
  </div>
</template>
<style scoped>
.writecontainer {
  display: flex;
  flex-direction: column;
}
.articlecontainer {
  display: flex;
}
.articlebox {
  display: grid;
  height: 675px;
  width: 1000px;
  border: 1px black solid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 2fr 1fr;
}
.articlebox > .box:first-child {
  grid-column: 4/5;
  grid-row: 4/4;
  border: 1px black;
  background-color: red;
}
.articlecomment {
  margin: 10px;
}
</style>
