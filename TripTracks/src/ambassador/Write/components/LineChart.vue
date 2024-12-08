<template>
  <div class="chart-container">
    <!-- 차트를 그릴 canvas 요소 -->
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { Chart, registerables } from "chart.js"; // Chart.js 및 registerables 임포트

// Chart.js 구성 요소 등록
Chart.register(...registerables);

// 부모 컴포넌트로부터 전달받을 props 정의
const props = defineProps({
  labels: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

// 차트를 그릴 canvas 요소를 참조
const chartCanvas = ref(null);

// Chart.js 인스턴스를 저장할 변수
let chartInstance = null;

// 차트 데이터 및 옵션 설정
const createChart = () => {
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: "line", // 라인 차트
      data: {
        labels: props.labels, // 부모 컴포넌트에서 전달받은 labels
        datasets: [
          {
            label: props.label, // 부모 컴포넌트에서 전달받은 label
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            data: props.data, // 부모 컴포넌트에서 전달받은 data
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            type: "linear",
          },
        },
      },
    });
  }
};

// 차트 업데이트 함수
const updateChart = () => {
  if (chartInstance) {
    chartInstance.data.labels = props.labels;
    chartInstance.data.datasets[0].data = props.data;
    chartInstance.data.datasets[0].label = props.label;
    chartInstance.update();
  }
};

// 컴포넌트가 마운트될 때 차트를 생성
onMounted(() => {
  createChart();
});

// props가 변경될 때 차트 업데이트
watch(
  () => [props.labels, props.data, props.label],
  () => {
    updateChart();
  }
);

// 컴포넌트가 언마운트될 때 차트 메모리 정리
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy(); // 차트 인스턴스를 제거하여 메모리 누수를 방지
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}
</style>
