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
    <div class="articlecontainer">
      <div class="articlebox">
        <div class="closeup">+</div>
      </div>
    </div>
    <!--추가된 사진들이 확대이미지 아래에 갤러리처럼 표시됨-->
    <div class="gallery">
      <div class="pic">축소 이미지</div>
      <div class="pic">축소 이미지</div>
      <div class="pic">. . .</div>
    </div>
    <!--입력된 태그 갯수가 일정 이상 넘어가면 gallery 밀림 수정 예정-->
    <div class="tagbox">
      <input
        class="inputtag"
        type="text"
        v-model="tag"
        @keyup.enter="printAndClear"
        placeholder="Tag"
      />
      <span id="result">{{ results.join(", ") }}</span>
    </div>
    <div class="articlecomment">
      <input class="comment" type="text" placeholder="comment를 입력하세요." />
      <button class="complete">완료</button>
    </div>
  </div>
</template>
<style scoped>
.writecontainer {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  margin: auto;
  margin-top: 30px;
}
.articlecontainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.articlebox {
  display: flex;
  justify-content: center;
  height: 600px;
  width: 600px;
  border: 1px black solid;
}
.closeup {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}
.gallery {
  display: flex;
  flex-direction: row;
  align-items: start;
  margin-top: 10px;
}
.pic {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  margin-right: 3px;
  border: 1px black solid;
}
.tagbox {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  margin-right: 10px;
  height: 30px;
}
.inputtag {
  margin-right: 10px;
}
.articlecomment {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.comment {
  width: 550px;
  text-indent: 10px;
}
.complete {
  background-color: black;
  color: white;
  margin-left: 5px;
  padding: 5px;
  border-radius: 10px;
}

.complete:hover {
  opacity: 0.7;
}
</style>
