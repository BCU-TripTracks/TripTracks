<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "../../axios";
import moment from "moment";

const route = useRoute();
const store = useStore();

const User = ref(null);

const currentPath = computed(() => route.path);

axios.get("/ambassador/Setup_TopNav", { withCredentials: true }).then((res) => {
  const { success, User_Info, msg } = res.data;
  if (!success) return alert(msg);
  console.log(User_Info);
  User.value = User_Info;
});
</script>

<template>
  <div class="nav-panner container-unit p30 dropshadow-none-hover">
    <img alt="" v-if="User" :src="User.Profile_Img" />
    <div class="">
      <p class="tcdark">TripTracks 공식 앰버서더님 환영합니다</p>
      <h1 class="tcdark" v-if="User">{{ `@${User.User_ID} ${User.User_Name}` }}</h1>
    </div>
    <div class="rightTop">{{ moment().format("YYYY년 MM월") }} 기준 인사이트</div>
    <!-- <div v-show="currentPath === '/message'" class="flex aic">
      <h1 class="tcdark">확인하지 않은 메세지 {{ UnreadCount }}개</h1>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
p {
  font-weight: bold;
}
span {
  font-weight: normal;
}
img {
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 10rem;
}
.container-unit {
  display: flex;
  flex-direction: row;
  justify-content: space-start;
  gap: 1.5rem;
  align-content: center;
}
.rightTop {
  margin-left: auto;
}
</style>
