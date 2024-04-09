<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const tag = ref("");
const results = ref([]);

const printAndClear = () => {
  results.value.push(tag.value);
  tag.value = "";
};
</script>

<template>
  <div class="writepot">
    <div class="writecontainer">
      <div class="articlecontainer">
        <div class="articlebox">
          <div class="closeup">여기를 눌러 사진을 추가하세요.</div>
        </div>
      </div>
      <!--추가된 사진들이 확대이미지 아래에 갤러리처럼 표시됨-->
      <div class="gallery">
        <div class="pic">추가된 이미지</div>
        <div class="pic">추가된 이미지</div>
        <div class="pic">. . .</div>
      </div>
      <!--입력된 태그 갯수가 일정 이상 넘어가면 gallery 밀림 수정 예정-->

      <div class="articlecomment">
        <div class="tagbox">
          <input
            class="inputtag"
            type="text"
            v-model="tag"
            @keyup.enter="printAndClear"
            placeholder="Tag를 추가하세요."
          />
          <span id="result" class="tagresult">{{ results.join(", ") }}</span>
        </div>
      </div>
      <div>
        <input
          class="comment"
          type="text"
          placeholder="comment를 입력하세요."
        /><button class="complete">완료</button>
      </div>
    </div>
    <div class="blur" @click="store.commit('Switch_isWrite')"></div>
  </div>
</template>
<style scoped>
.blur {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
}
.writepot {
  display: flex;
  justify-content: center;
}
.writecontainer {
  position: absolute;
  background-color: white;
  width: 450px;
  height: 685px;
  margin: auto;
  margin-top: 30px;
  z-index: 5;
  border: 1px black;
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
  border: 1px black solid;
}
.closeup {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: 450px;
  width: 450px;
}
.gallery {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  justify-content: center;
}
.pic {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  margin: 1px;
  border: 1px black solid;
}
.tagbox {
  display: flex;
  margin-top: 5px;
  margin-right: 10px;
  height: 30px;
}
.inputtag {
  width: 130px;
  margin-right: auto;
  text-indent: 10px;
}
.tagresult {
  margin-left: 5px;
  padding-top: 3px;
}
.articlecomment {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}
.comment {
  width: 400px;
  height: 30px;
  text-indent: 10px;
  margin-top: 5px;
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
