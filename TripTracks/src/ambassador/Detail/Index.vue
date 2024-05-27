<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "../../axios";
import moment from "moment";

// 하위 컴포넌트 임포트
import Cmp from "./components/Cmp.vue";
import DeviceID from "./components/DeviceID.vue";
import Fan from "./components/Fan.vue";
import History from "./components/History.vue";
import LineChart from "./components/LineChart.vue";
import LiveTemp from "./components/LiveTemp.vue";
import LiveTime from "./components/LiveTime.vue";
import NameTag from "./components/NameTag.vue";
import SetTemp from "./components/SetTemp.vue";
import Setting from "./components/Setting.vue";
import Status from "./components/Status.vue";

const route = useRoute();
const store = useStore();

const currentPath = computed(() => route.path);
const time = ref();
let intervalId;
const Device_Detail = reactive({
  LiveTime: moment().format("YYYY-MM-DD HH:mm:ss"),
});

onMounted(() => {
  intervalId = setInterval(() => {
    Device_Detail.LiveTime = moment().format("YYYY-MM-DD HH:mm:ss");
  }, 1000); // 매초마다 updateTime 함수를 호출
});

onUnmounted(() => {
  clearInterval(intervalId); // 컴포넌트가 해제될 때 인터벌을 정리
});

watch(
  () => route.params.Device_ID,
  (Device_ID) => {
    // Device_Detail = {};
    axios
      .get("/Detail/Info_Setup", { params: { Device_ID: Device_ID } }, { withCredentials: true })
      .then((req) => {
        const { success, msg, Device } = req.data;
        const { ID, Type, Tcp_Connect, Name_Tag, Cooling_Action, Live_Temp, Set_Temp, Fan, Cmp, Errors } = Device;
        console.log(Device);
        Device_Detail.ID = parseInt(ID);
        Device_Detail.Type = String(Type);
        Device_Detail.Name_Tag = String(Name_Tag);
        Device_Detail.Tcp_Connect = Boolean(Tcp_Connect);
        Device_Detail.Cooling_Action = Cooling_Action;
        Device_Detail.Live_Temp = Live_Temp;
        Device_Detail.Set_Temp = Set_Temp;
        Device_Detail.Fan = Fan;
        Device_Detail.Cmp = Cmp;
      })
      .finally(() => {});
  },
  { immediate: true }
);

console.log(route.params.Device_ID);

axios
  .get("/Detail/Info_Setup", { params: { Device_ID: route.params.Device_ID } }, { withCredentials: true })
  .then((req) => {
    const { Device } = req.data;
    // store.commit("SetupMenu", { Device });
  })
  .finally(() => {});
</script>

<template>
  <div class="detail gp30 p30">
    <div class="container-unit dropshadow p10"><LiveTime :LiveTime="Device_Detail.LiveTime" /></div>
    <div class="container-unit dropshadow p10">
      <DeviceID :Type="Device_Detail.Type" :ID="Device_Detail.ID" />
    </div>
    <div class="container-unit dropshadow p10"><NameTag :Name_Tag="Device_Detail.Name_Tag" /></div>
    <div class="container-unit dropshadow p10"><History /></div>
    <div class="container-unit dropshadow p10"><Setting /></div>
    <div class="container-unit dropshadow p10"><Status :Cooling_Action="Device_Detail.Cooling_Action" /></div>
    <div class="container-unit dropshadow p10"><LiveTemp :Live_Temp="Device_Detail.Live_Temp" /></div>
    <div class="container-unit dropshadow p10"><SetTemp :Set_Temp="Device_Detail.Set_Temp" /></div>
    <div class="container-unit dropshadow p10"><Fan :Fan="Device_Detail.Fan" /></div>
    <div class="container-unit dropshadow p10"><Cmp :Cmp="Device_Detail.Cmp" /></div>
    <div class="container-unit dropshadow p10 gc5 gr4"><LineChart /></div>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
</style>
