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
  height: 600px;
  width: 800px;
  flex-direction: column;
  margin: auto;
}
.tagbox {
  margin-bottom: 10px;
}
.articlecontainer {
  display: flex;
}
.articlebox {
  display: grid;
  height: 600px;
  width: 800px;
  border: 1px black solid;
  grid-template-columns: 3fr 1fr; /* 변경된 부분 */
  grid-template-rows: 1fr;
}
.articlebox > .box:first-child {
  grid-column: 600px;
  grid-row: 600px;
  border: 1px black;
  background-color: red;
}
.big-box {
  grid-column: span 2;
  border: 1px black;
  background-color: red;
}
.small-box {
  border: 1px black;
}
.articlecomment {
  margin-top: 10px;
}
</style>
